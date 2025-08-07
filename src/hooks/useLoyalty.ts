import { useState, useEffect } from 'react';
import { supabase, LoyaltyPoints, LoyaltyTransaction } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useLoyalty = () => {
  const { user } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyPoints | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get loyalty points for current user
  const fetchLoyaltyData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setLoyaltyData(data);
    } catch (err: any) {
      console.error('Error fetching loyalty data:', err);
      setError('Failed to load loyalty information');
    } finally {
      setLoading(false);
    }
  };

  // Get loyalty transactions for current user
  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTransactions(data || []);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
    }
  };

  // Award points for a completed appointment
  const awardPoints = async (appointmentId: string, servicePrice: number): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    setError(null);

    try {
      // Calculate points (10 points per $10 spent)
      const pointsToAward = Math.floor(servicePrice / 10) * 10;
      
      if (pointsToAward <= 0) return true;

      // Call the database function to calculate points
      const { data: calculatedPoints, error: calcError } = await supabase
        .rpc('calculate_loyalty_points', { p_service_price: servicePrice });

      if (calcError) throw calcError;

      // Get current loyalty data or create if doesn't exist
      let { data: currentLoyalty, error: loyaltyError } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (loyaltyError && loyaltyError.code === 'PGRST116') {
        // Create loyalty account if it doesn't exist
        const { data: newLoyalty, error: createError } = await supabase
          .from('loyalty_points')
          .insert({
            user_id: user.id,
            points_balance: calculatedPoints,
            lifetime_points: calculatedPoints,
            tier: calculatedPoints >= 1000 ? 'gold' : calculatedPoints >= 500 ? 'silver' : 'bronze'
          })
          .select()
          .single();

        if (createError) throw createError;
        currentLoyalty = newLoyalty;
      } else if (loyaltyError) {
        throw loyaltyError;
      }

      if (currentLoyalty) {
        // Update loyalty points
        const newBalance = currentLoyalty.points_balance + calculatedPoints;
        const newLifetime = currentLoyalty.lifetime_points + calculatedPoints;
        const newTier = newLifetime >= 1000 ? 'gold' : newLifetime >= 500 ? 'silver' : 'bronze';

        const { error: updateError } = await supabase
          .from('loyalty_points')
          .update({
            points_balance: newBalance,
            lifetime_points: newLifetime,
            tier: newTier,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;

        // Record transaction
        const { error: transactionError } = await supabase
          .from('loyalty_transactions')
          .insert({
            user_id: user.id,
            appointment_id: appointmentId,
            points: calculatedPoints,
            transaction_type: 'earned',
            description: `Points earned from appointment ($${servicePrice})`
          });

        if (transactionError) throw transactionError;

        // Refresh local data
        await fetchLoyaltyData();
        await fetchTransactions();
      }

      return true;
    } catch (err: any) {
      console.error('Error awarding points:', err);
      setError('Failed to award loyalty points');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Redeem points (for future use)
  const redeemPoints = async (pointsToRedeem: number, description: string): Promise<boolean> => {
    if (!user || !loyaltyData) return false;

    if (pointsToRedeem > loyaltyData.points_balance) {
      setError('Insufficient points');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const newBalance = loyaltyData.points_balance - pointsToRedeem;

      // Update loyalty points
      const { error: updateError } = await supabase
        .from('loyalty_points')
        .update({
          points_balance: newBalance,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Record transaction
      const { error: transactionError } = await supabase
        .from('loyalty_transactions')
        .insert({
          user_id: user.id,
          points: -pointsToRedeem,
          transaction_type: 'redeemed',
          description
        });

      if (transactionError) throw transactionError;

      // Refresh local data
      await fetchLoyaltyData();
      await fetchTransactions();

      return true;
    } catch (err: any) {
      console.error('Error redeeming points:', err);
      setError('Failed to redeem points');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get tier benefits
  const getTierBenefits = (tier: 'bronze' | 'silver' | 'gold') => {
    switch (tier) {
      case 'bronze':
        return {
          name: 'Bronze',
          discount: 0,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          benefits: ['Earn points on every visit', 'Birthday month special']
        };
      case 'silver':
        return {
          name: 'Silver',
          discount: 5,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          benefits: ['5% discount on all services', 'Priority booking', 'Monthly special offers']
        };
      case 'gold':
        return {
          name: 'Gold',
          discount: 10,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          benefits: ['10% discount on all services', 'VIP priority booking', 'Exclusive events', 'Free upgrades']
        };
      default:
        return getTierBenefits('bronze');
    }
  };

  // Calculate points needed for next tier
  const getPointsToNextTier = () => {
    if (!loyaltyData) return 0;

    switch (loyaltyData.tier) {
      case 'bronze':
        return 500 - loyaltyData.lifetime_points;
      case 'silver':
        return 1000 - loyaltyData.lifetime_points;
      case 'gold':
        return 0; // Already at highest tier
      default:
        return 0;
    }
  };

  // Initialize data when user changes
  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
      fetchTransactions();
    } else {
      setLoyaltyData(null);
      setTransactions([]);
    }
  }, [user]);

  return {
    loyaltyData,
    transactions,
    loading,
    error,
    fetchLoyaltyData,
    fetchTransactions,
    awardPoints,
    redeemPoints,
    getTierBenefits,
    getPointsToNextTier,
  };
};