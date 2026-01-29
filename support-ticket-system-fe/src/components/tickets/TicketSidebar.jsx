import { FormSelect, FormCheckboxGroup } from '../form';
import AgentSearchSelect from '../form/AgentSearchSelect';
import { usePermissions } from '../../hooks/usePermissions';

const TicketSidebar = ({
    ticket,
    isEditing,
    formData,
    onChange,
    onCheckboxChange,
    statusOptions,
    priorityOptions,
    availableLabels,
    availableCategories,
    formatDate
}) => {
    const { canAssignTicket } = usePermissions();
    const peopleItems = [
        {
            label: 'Assignee',
            user: ticket?.assigned_to,
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-600',
            fallback: 'Unassigned'
        },
        {
            label: 'Reporter',
            user: ticket?.user,
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600',
            fallback: 'Unknown'
        }
    ];

    const dateItems = [
        {
            label: 'Due Date',
            value: ticket?.due_date,
            hide: !ticket?.due_date
        },
        {
            label: 'Created',
            value: ticket?.created_at
        },
        {
            label: 'Updated',
            value: ticket?.updated_at
        },
        {
            label: 'Start Date',
            value: ticket?.start_date,
            hide: !ticket?.start_date
        }
    ].filter(item => !item.hide);

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                {isEditing ? (
                    <>
                        {canAssignTicket() && (
                            <AgentSearchSelect
                                value={formData.assigned_to_user_id}
                                onChange={onChange}
                                label="Assignee"
                            />
                        )}
                        <FormSelect
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={onChange}
                            options={statusOptions}
                            required
                        />
                        <FormSelect
                            label="Priority"
                            name="priority"
                            value={formData.priority}
                            onChange={onChange}
                            options={priorityOptions}
                            required
                        />
                        <FormCheckboxGroup
                            label="Labels"
                            options={availableLabels}
                            selectedValues={formData.labels}
                            onChange={onCheckboxChange}
                            fieldName="labels"
                        />
                        <FormCheckboxGroup
                            label="Categories"
                            options={availableCategories}
                            selectedValues={formData.categories}
                            onChange={onCheckboxChange}
                            fieldName="categories"
                        />
                    </>
                ) : (
                    <>
                        {/* People Section */}
                        <div className="pb-6 border-b border-gray-200">
                            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                                People
                            </h3>

                            {peopleItems.map((person, index) => (
                                <div key={index} className={index < peopleItems.length - 1 ? 'mb-4' : ''}>
                                    <label className="text-xs font-medium text-gray-500 block mb-2">
                                        {person.label}
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded-full ${person.bgColor} flex items-center justify-center`}>
                                            <span className={`${person.textColor} font-semibold text-xs`}>
                                                {person.user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-900">
                                            {person.user?.name || person.fallback}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dates Section */}
                        <div className="pb-6 border-b border-gray-200">
                            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                                Dates
                            </h3>

                            <div className="space-y-3 text-sm">
                                {dateItems.map((dateItem, index) => (
                                    <div key={index}>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">
                                            {dateItem.label}
                                        </label>
                                        <span className="text-gray-900">{formatDate(dateItem.value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Labels Section */}
                        {ticket.labels && ticket.labels.length > 0 && (
                            <div className="pb-6 border-b border-gray-200">
                                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                                    Labels
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {ticket.labels.map((label) => (
                                        <span
                                            key={label.id}
                                            className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                                        >
                                            {label.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories Section */}
                        {ticket.categories && ticket.categories.length > 0 && (
                            <div className="pb-6 border-b border-gray-200">
                                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {ticket.categories.map((category) => (
                                        <span
                                            key={category.id}
                                            className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded"
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TicketSidebar;
