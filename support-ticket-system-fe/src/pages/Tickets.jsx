import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTickets } from '../contexts/TicketContext';
import { TicketTable, TicketFilters, TicketPagination } from '../components/tickets';
import { SpinnerIcon } from '../assets/icons';
import { useCategories } from '../contexts/CategoryContext';

const Tickets = () => {
  const navigate = useNavigate();
  const { tickets, loading, pagination, fetchTickets, deleteTicket } = useTickets();
  const { categories, fetchCategories } = useCategories();
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category_id: '',
    page: 1,
    per_page: 10,
  });

  useEffect(() => {
    fetchCategories(); 
    fetchTickets(filters);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1, 
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category_id: '',
      page: 1,
      per_page: 10,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicket(id);
        toast.success('Ticket deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete ticket');
      }
    }
  };

  const handleCreateTicket = () => {
    navigate('/tickets/create');
  };

  if (loading && tickets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <SpinnerIcon className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Tickets</h1>
        <button
          onClick={handleCreateTicket}
          className="bg-gray-100 hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
        >
          + Create Ticket
        </button>
      </div>

      <TicketFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        categories={categories}
      />

      {tickets.length > 0 ? (
        <>
          <TicketTable tickets={tickets} onDelete={handleDelete} />
          
          <TicketPagination 
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">No tickets found</p>
          <button
            onClick={handleCreateTicket}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Create your first ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default Tickets;
