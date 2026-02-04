import { createContext, useContext, useState, useCallback } from 'react';
import { userService } from '../services/userService';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
};

export const useUser = useUsers;

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const fetchUsers = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await userService.getUsers(params);
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        setUsers([]);
      }

      if (response.meta) {
        setPagination(response.meta);
      } else if (response.data && response.data.current_page) {
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total,
        });
      }

      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUser = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await userService.getUser(id);
      const userData = response.data?.user || response.data;
      setCurrentUser(userData);
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  
  const updateUser = useCallback(async (id, userData) => {
    setLoading(true);
    try {
      const data = await userService.updateUser(id, userData);
      setCurrentUser(data);
      
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const resetPassword = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await userService.resetPassword(id);
      return response;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (passwordData) => {
    setLoading(true);
    try {
      const response = await userService.updatePassword(passwordData);
      return response;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAgents = useCallback(async (keyword) => {
    try {
      const response = await userService.searchAgents(keyword);
      return response.data || [];
    } catch (error) {
      console.error('Error searching agents:', error);
      return [];
    }
  }, []);

  const value = {
    users,
    currentUser,
    loading,
    pagination,
    fetchUsers,
    fetchUser,
    updateUser,
    resetPassword,
    updatePassword,
    searchAgents,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
