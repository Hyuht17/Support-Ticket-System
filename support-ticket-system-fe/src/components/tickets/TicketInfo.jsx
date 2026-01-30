import { StatusBadge, PriorityBadge } from './index';
import { FormInput, FormTextarea } from '../form';

const TicketInfo = ({
    ticket,
    isEditing,
    submitting,
    formData,
    onSubmit,
    onChange,
    onCancel
}) => {
    const detailItems = [
        {
            label: 'Type',
            value: 'Task',
            render: (value) => <span className="text-gray-900">{value}</span>
        },
        {
            label: 'Priority',
            value: ticket?.priority,
            render: (value) => <PriorityBadge priority={value} />
        },
        {
            label: 'Status',
            value: ticket?.status,
            render: (value) => <StatusBadge status={value} />
        },
        {
            label: 'Labels',
            value: ticket?.labels,
            render: (labels) => labels && labels.length > 0 ? (
                <div className="inline-flex flex-wrap gap-1">
                    {labels.map((label) => (
                        <span
                            key={label.id}
                            className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                        >
                            {label.name}
                        </span>
                    ))}
                </div>
            ) : null,
            hide: !ticket?.labels || ticket.labels.length === 0
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {isEditing ? (
                <form onSubmit={onSubmit} className="space-y-4">
                    <FormInput
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        required
                    />
                    <FormTextarea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                        required
                    />
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {submitting && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={submitting}
                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{ticket.title}</h2>

                    {/* Details Section */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {detailItems.filter(item => !item.hide).map((item, index) => (
                                <div key={index}>
                                    <span className="text-gray-500">{item.label}:</span>
                                    <span className="ml-2">{item.render(item.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Description</h3>
                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {ticket.description}
                        </div>
                    </div>

                    {/* Attachments Section */}
                    {ticket.attachments && ticket.attachments.length > 0 && (
                        <div className="mb-6 pb-6 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Attachments</h3>
                            <div className="space-y-2">
                                {ticket.attachments.map((attachment, index) => (
                                    <a
                                        key={index}
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        📎 {attachment.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TicketInfo;
