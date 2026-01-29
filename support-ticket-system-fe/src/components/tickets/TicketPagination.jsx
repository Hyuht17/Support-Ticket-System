const TicketPagination = ({ pagination, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    for (let i = 1; i <= pagination.last_page; i++) {
      // Show first, last, current, and nearby pages
      if (
        i === 1 ||
        i === pagination.last_page ||
        (i >= pagination.current_page - 1 && i <= pagination.current_page + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 border rounded-lg transition-colors ${
              pagination.current_page === i
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {i}
          </button>
        );
      } else if (
        i === pagination.current_page - 2 ||
        i === pagination.current_page + 2
      ) {
        pages.push(
          <span key={i} className="px-2 py-2">
            ...
          </span>
        );
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">
            {((pagination.current_page - 1) * pagination.per_page) + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(pagination.current_page * pagination.per_page, pagination.total)}
          </span>{' '}
          of <span className="font-medium">{pagination.total}</span> results
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {renderPageNumbers()}
          </div>

          <button
            onClick={() => onPageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPagination;
