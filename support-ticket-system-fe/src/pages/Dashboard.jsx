import { useDashboard } from '../contexts/DashboardContext';
import { TicketIcon, SpinnerIcon } from '../assets/icons';

const Dashboard = () => {
  const { stats, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <SpinnerIcon className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  const statusCards = [
    {
      label: 'Total Tickets',
      value: stats.total,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Open',
      value: stats.open,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-500',
    },
    {
      label: 'In Progress',
      value: stats.in_progress,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-500',
    },
    {
      label: 'Closed',
      value: stats.closed,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-500',
    },
  ];

  return (
    <div className="p-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of ticket statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-6">
              <div className={`${card.bgColor} rounded-full p-5`}>
                <TicketIcon className={`w-10 h-10 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-gray-600 text-lg mb-2">{card.label}</p>
                <p className="text-5xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Dashboard;
