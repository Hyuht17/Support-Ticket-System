import { createContext, useContext, useState, useCallback } from 'react';
import { ticketService } from '../services/ticketService';

const TicketContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
};

export const useTicket = useTickets;

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const fetchTickets = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await ticketService.getTickets(params);
      if (response.data && Array.isArray(response.data)) {
        setTickets(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setTickets(response.data.data);
      } else {
        setTickets([]);
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
      console.error('Error fetching tickets:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTicket = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await ticketService.getTicket(id);
      const ticketData = response.data?.ticket || response.data;
      setCurrentTicket(ticketData);
      return response;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTicket = useCallback(async (ticketData) => {
    setLoading(true);
    try {
      const data = await ticketService.createTicket(ticketData);
      await fetchTickets(); 
      return data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchTickets]);

  const updateTicket = useCallback(async (id, ticketData) => {
    setLoading(true);
    try {
      const data = await ticketService.updateTicket(id, ticketData);
      setCurrentTicket(data.data);
      await fetchTickets(); 
      return data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchTickets]);

  const deleteTicket = useCallback(async (id) => {
    setLoading(true);
    try {
      await ticketService.deleteTicket(id);
      await fetchTickets(); 
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchTickets]);


  const value = {
    tickets,
    currentTicket,
    loading,
    pagination,
    fetchTickets,
    fetchTicket,
    createTicket,
    updateTicket,
    deleteTicket,
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};
