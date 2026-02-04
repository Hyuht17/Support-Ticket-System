import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ticketLogService } from '../services/ticketLogService';
import { userService } from '../services/userService';
import TicketLogFilters from '../components/ticket-logs/TicketLogFilters';
import TicketLogTable from '../components/ticket-logs/TicketLogTable';
import { TicketPagination } from '../components/tickets';
import { SpinnerIcon } from '../assets/icons';

const TicketLogs = () => {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });

    const [filters, setFilters] = useState({
        user_id: '',
        action: '',
        per_page: 10,
        page: 1,
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [filters]);

    const fetchUsers = async () => {
        try {
            const response = await userService.getUsers();
            setUsers(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await ticketLogService.getAllLogs(filters);

            if (response.data && response.data.data) {
                setLogs(response.data.data);
                setPagination({
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    per_page: response.data.per_page,
                    total: response.data.total,
                });
            } else if (Array.isArray(response.data)) {
                setLogs(response.data);
            } else {
                setLogs([]);
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error);
            toast.error('Failed to load ticket logs');
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

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
            user_id: '',
            action: '',
            per_page: 10,
            page: 1,
        });
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage,
        }));
    };

    if (loading && logs.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <SpinnerIcon className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Ticket Logs</h1>
                <p className="text-gray-600 mt-2">
                    View all ticket changes and activity history
                </p>
            </div>

            <TicketLogFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                users={users}
            />

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <SpinnerIcon className="w-12 h-12 animate-spin text-blue-600" />
                </div>
            ) : (
                <>
                    <TicketLogTable logs={logs} />

                    {logs.length > 0 && (
                        <TicketPagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default TicketLogs;
