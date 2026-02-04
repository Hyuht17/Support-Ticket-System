import { Link } from 'react-router-dom';

const TicketLogTable = ({ logs = [] }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatChangedFields = (changedFields) => {
    if (!changedFields || Object.keys(changedFields).length === 0) {
      return <span className="text-gray-400">No changes</span>;
    }

    return (
      <div className="space-y-1">
        {Object.entries(changedFields).map(([field, value]) => (
          <div key={field} className="text-sm">
            <span className="font-medium text-gray-700">{field}:</span>{' '}
            <span className="text-green-600">{value || 'null'}</span>
          </div>
        ))}
      </div>
    );
  };

  const getActionBadgeColor = (action) => {
    const colors = {
      created: 'bg-green-100 text-green-800',
      updated: 'bg-blue-100 text-blue-800',
      status_changed: 'bg-yellow-100 text-yellow-800',
      priority_changed: 'bg-orange-100 text-orange-800',
      assigned: 'bg-purple-100 text-purple-800',
      commented: 'bg-gray-100 text-gray-800',
    };
    return colors[action] || 'bg-gray-100 text-gray-800';
  };

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-gray-500 text-lg">No logs found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Changes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/tickets/${log.ticket_id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    #{log.ticket_id}
                  </Link>
                  {log.ticket?.title && (
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {log.ticket.title}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {log.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {log.user?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionBadgeColor(
                      log.action
                    )}`}
                  >
                    {log.action.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {formatChangedFields(log.changed_fields)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(log.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketLogTable;
