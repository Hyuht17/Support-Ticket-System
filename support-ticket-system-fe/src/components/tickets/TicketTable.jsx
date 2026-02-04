import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { usePermissions } from '../../hooks/usePermissions';

const TicketTable = ({ tickets, onDelete }) => {
  const { canDeleteTicket } = usePermissions();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Labels
            </th>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categories
            </th>
            <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            {canDeleteTicket() && (
              <th className="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50">
              <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{ticket.id}
              </td>
              <td className="px-2 py-4 text-sm text-gray-900">
                <Link
                  to={`/tickets/${ticket.id}`}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {ticket.title}
                </Link>
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700">
                {ticket.user?.name || 'N/A'}
              </td>
              <td className="px-2 py-4 whitespace-nowrap">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="px-2 py-4 whitespace-nowrap">
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className="py-4 whitespace-nowrap text-sm text-gray-700">
                {ticket.labels && ticket.labels.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {ticket.labels.map((label) => (
                      <span
                        key={label.id}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="py-4 whitespace-nowrap text-sm text-gray-700">
                {ticket.categories && ticket.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {ticket.categories.map((category) => (
                      <span
                        key={category.id}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(ticket.created_at)}
              </td>
              {canDeleteTicket() && (
                <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onDelete(ticket.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
