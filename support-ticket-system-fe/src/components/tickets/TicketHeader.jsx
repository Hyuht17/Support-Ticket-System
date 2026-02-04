import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '../../assets/icons';
import { StatusBadge, PriorityBadge } from './index';
import { usePermissions } from '../../hooks/usePermissions';

const TicketHeader = ({ ticket, isEditing, onEditToggle }) => {
    const { canEditTicket } = usePermissions();
    
    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link
                    to="/tickets"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">#{ticket.id}</h1>
                        <StatusBadge status={ticket.status} />
                        <PriorityBadge priority={ticket.priority} />
                    </div>
                </div>
            </div>
            {canEditTicket(ticket) && (
                <button
                    onClick={onEditToggle}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            )}
        </div>
    );
};

export default TicketHeader;
