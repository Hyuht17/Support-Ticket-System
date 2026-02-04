const UserStatistics = ({ user }) => {
    const statistics = [
        {
            label: 'Total Tickets',
            value: user?.tickets_count || 0,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            label: 'Resolved Tickets',
            value: user?.resolved_tickets_count || 0,
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            label: 'Pending Tickets',
            value: user?.pending_tickets_count || 0,
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600'
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statistics.map((stat) => (
                    <div key={stat.label} className={`p-4 ${stat.bgColor} rounded-lg`}>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.textColor}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserStatistics;
