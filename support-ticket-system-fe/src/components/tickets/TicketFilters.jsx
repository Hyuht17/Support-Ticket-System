const TicketFilters = ({ filters, onFilterChange, onClearFilters, categories = [] }) => {
  const filterOptions = {
    status: {
      label: 'Status',
      placeholder: 'All Status',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'closed', label: 'Closed' }
      ]
    },
    priority: {
      label: 'Priority',
      placeholder: 'All Priorities',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    category_id: {
      label: 'Category',
      placeholder: 'All Categories',
      options: categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))
    },
    per_page: {
      label: 'Per Page',
      placeholder: null,
      options: [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' }
      ]
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(filterOptions).map(([name, config]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {config.label}
            </label>
            <select
              name={name}
              value={filters[name]}
              onChange={onFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {config.placeholder && (
                <option value="">{config.placeholder}</option>
              )}
              {config.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;
