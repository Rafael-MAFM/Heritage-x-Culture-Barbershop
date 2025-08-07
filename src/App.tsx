import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider, useApp } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Barbers from './components/Barbers';
import Booking from './components/Booking';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentPage } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'customer-dashboard':
        return (
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        );
      case 'barber-dashboard':
        return (
          <ProtectedRoute allowedRoles={['barber']}>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Barber Dashboard</h2>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            </div>
          </ProtectedRoute>
        );
      case 'admin-dashboard':
        return (
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            </div>
          </ProtectedRoute>
        );
      default:
        return (
          <>
            <Navbar />
            <Hero />
            <Services />
            <Barbers />
            <Booking />
            <Gallery />
            <Contact />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderPage()}
        </motion.div>
      )}
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;