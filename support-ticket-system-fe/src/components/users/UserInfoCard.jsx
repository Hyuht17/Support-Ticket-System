import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUsers } from '../../contexts/UserContext';
import { UserIcon, EmailIcon, SpinnerIcon } from '../../assets/icons';

const UserInfoCard = ({ user, onUpdate, onResetPassword, isResetting }) => {
    const { updateUser, loading: contextLoading } = useUsers();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        role_id: user?.role_id || '',
    });

    const roleOptions = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Agent' },
        { value: 3, label: 'User' }
    ];

    const displayFields = [
        { label: 'ID', value: `#${user?.id}` },
        { label: 'Name', value: user?.name },
        { label: 'Email', value: user?.email },
        { 
            label: 'Role', 
            value: user?.role_id, 
            isRole: true 
        },
        { 
            label: 'Joined Date', 
            value: user?.created_at ? new Date(user.created_at).toLocaleString() : 'N/A' 
        },
        { 
            label: 'Last Updated', 
            value: user?.updated_at ? new Date(user.updated_at).toLocaleString() : 'N/A' 
        }
    ];

    const getRoleName = (roleId) => {
        const roles = { 1: 'Admin', 2: 'Agent', 3: 'User' };
        return roles[roleId] || 'Unknown';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'role_id' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUser(user.id, formData);
            toast.success('User updated successfully');
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            role_id: user?.role_id || '',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">User Information</h2>
                <div className="flex gap-3">
                    {!isEditing && (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Edit User
                            </button>
                            <button
                                onClick={onResetPassword}
                                disabled={isResetting}
                                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isResetting && <SpinnerIcon className="w-4 h-4 animate-spin" />}
                                {isResetting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <select
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            {roleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && <SpinnerIcon className="w-4 h-4 animate-spin" />}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    {displayFields.map((field) => (
                        <div key={field.label}>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                {field.label}
                            </label>
                            {field.isRole ? (
                                <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                    {getRoleName(field.value)}
                                </span>
                            ) : (
                                <p className="text-lg text-gray-900">{field.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserInfoCard;
