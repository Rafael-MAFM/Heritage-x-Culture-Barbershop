import React, { createContext, useContext, useState } from 'react';

type Page = 'home' | 'customer-dashboard' | 'barber-dashboard' | 'admin-dashboard';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  navigateTo: (page: Page) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    // Update URL hash for better UX
    window.history.pushState(null, '', page === 'home' ? '#' : `#${page}`);
  };

  // Listen for hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (['home', 'customer-dashboard', 'barber-dashboard', 'admin-dashboard'].includes(hash)) {
        setCurrentPage(hash || 'home');
      }
    };

    // Set initial page from URL
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const value = {
    currentPage,
    setCurrentPage,
    navigateTo,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};