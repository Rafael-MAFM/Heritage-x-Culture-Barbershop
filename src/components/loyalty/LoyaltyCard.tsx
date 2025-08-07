import React from 'react';
import { motion } from 'framer-motion';
import { Star, Gift, TrendingUp } from 'lucide-react';
import { useLoyalty } from '../../hooks/useLoyalty';
import { useAuth } from '../../contexts/AuthContext';

const LoyaltyCard: React.FC = () => {
  const { user } = useAuth();
  const { loyaltyData, loading, getTierBenefits, getPointsToNextTier } = useLoyalty();

  if (!user || loading) return null;
  if (!loyaltyData) return null;

  const tierInfo = getTierBenefits(loyaltyData.tier);
  const pointsToNext = getPointsToNextTier();
  const progressPercentage = loyaltyData.tier === 'gold' ? 100 : 
    ((loyaltyData.lifetime_points - (loyaltyData.tier === 'silver' ? 500 : 0)) / 
     (loyaltyData.tier === 'bronze' ? 500 : 500)) * 100;

  return (
    <motion.div
      className={`${tierInfo.bgColor} border border-gray-200 rounded-xl p-6 shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${tierInfo.color === 'text-yellow-600' ? 'bg-yellow-100' : 
            tierInfo.color === 'text-gray-600' ? 'bg-gray-100' : 'bg-amber-100'}`}>
            <Star className={`w-6 h-6 ${tierInfo.color}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{tierInfo.name} Member</h3>
            <p className="text-sm text-gray-600">Heritage x Culture Loyalty</p>
          </div>
        </div>
        {tierInfo.discount > 0 && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
            {tierInfo.discount}% OFF
          </div>
        )}
      </div>

      {/* Points Balance */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{loyaltyData.points_balance}</div>
          <div className="text-sm text-gray-600">Available Points</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{loyaltyData.lifetime_points}</div>
          <div className="text-sm text-gray-600">Lifetime Points</div>
        </div>
      </div>

      {/* Progress to Next Tier */}
      {pointsToNext > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress to {loyaltyData.tier === 'bronze' ? 'Silver' : 'Gold'}
            </span>
            <span className="text-sm text-gray-600">{pointsToNext} points to go</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                loyaltyData.tier === 'bronze' ? 'bg-gray-400' : 'bg-yellow-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Tier Benefits */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-900 flex items-center space-x-1">
          <Gift className="w-4 h-4" />
          <span>Your Benefits</span>
        </h4>
        <div className="space-y-1">
          {tierInfo.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      {loyaltyData.points_balance >= 100 && (
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button className="w-full bg-black text-yellow-400 py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
            Redeem Points (Coming Soon)
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoyaltyCard;