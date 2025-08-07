import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Gift } from 'lucide-react';
import { format } from 'date-fns';
import { useLoyalty } from '../../hooks/useLoyalty';
import { useAuth } from '../../contexts/AuthContext';

const PointsHistory: React.FC = () => {
  const { user } = useAuth();
  const { transactions, loading } = useLoyalty();

  if (!user || loading) return null;
  if (!transactions.length) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Points History</h3>
        <div className="text-center py-8">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No point transactions yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Complete your first appointment to start earning points!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <Calendar className="w-5 h-5" />
        <span>Points History</span>
      </h3>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                transaction.transaction_type === 'earned' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.transaction_type === 'earned' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {transaction.transaction_type === 'earned' ? 'Points Earned' : 'Points Redeemed'}
                </p>
                <p className="text-sm text-gray-600">{transaction.description}</p>
                <p className="text-xs text-gray-400">
                  {format(new Date(transaction.created_at), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
            </div>
            
            <div className={`font-bold ${
              transaction.transaction_type === 'earned' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {transaction.transaction_type === 'earned' ? '+' : ''}{transaction.points}
            </div>
          </motion.div>
        ))}
      </div>

      {transactions.length >= 20 && (
        <div className="text-center mt-4">
          <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default PointsHistory;