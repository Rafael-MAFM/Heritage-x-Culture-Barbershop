import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const AuthButton: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (user && profile) {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <User className="w-4 h-4" />
          <span>{profile.full_name.split(' ')[0]}</span>
          {profile.role === 'barber' && (
            <span className="bg-black text-yellow-400 px-2 py-1 rounded text-xs">
              BARBER
            </span>
          )}
        </motion.button>

        {/* User Dropdown Menu */}
        {showUserMenu && (
          <motion.div
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="p-3 border-b border-gray-100">
              <p className="font-semibold text-gray-900">{profile.full_name}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  profile.role === 'customer' ? 'bg-blue-100 text-blue-800' :
                  profile.role === 'barber' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  const dashboardPage = profile.role === 'customer' ? 'customer-dashboard' : 
                                       profile.role === 'barber' ? 'barber-dashboard' : 
                                       'admin-dashboard';
                  window.location.hash = dashboardPage;
                }}
                className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Dashboard
              </button>
              
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Click outside to close menu */}
        {showUserMenu && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        <motion.button
          onClick={() => setShowLogin(true)}
          className="text-white hover:text-yellow-400 font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Sign In
        </motion.button>
        
        <motion.button
          onClick={() => setShowSignup(true)}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign Up
        </motion.button>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};

export default AuthButton;