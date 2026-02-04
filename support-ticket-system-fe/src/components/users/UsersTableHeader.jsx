const tableHeaders = [
    { key: 'id', label: 'ID', align: 'left' },
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'email', label: 'Email', align: 'left' },
    { key: 'role', label: 'Role', align: 'left' },
    { key: 'joined', label: 'Joined Date', align: 'left' },
    { key: 'actions', label: 'Actions', align: 'right' }
];

const UsersTableHeader = () => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {tableHeaders.map((header) => (
                    <th
                        key={header.key}
                        className={`px-6 py-3 text-${header.align} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                    >
                        {header.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default UsersTableHeader;
