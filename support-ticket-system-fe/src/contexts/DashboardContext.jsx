import { createContext, useContext, useState, useEffect } from 'react';
import { ticketService } from '../services/ticketService';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchDashboardStats = async (force = false) => {
    if (isInitialized && !force) {
      return;
    }

    setLoading(true);
    try {
      const response = await ticketService.getTicketStats();
      setStats(response.data);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };



  const value = {
    stats,
    loading,
    isInitialized,
    refreshStats: fetchDashboardStats,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
