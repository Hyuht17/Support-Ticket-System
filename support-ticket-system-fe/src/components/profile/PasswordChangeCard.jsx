import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUsers } from '../../contexts/UserContext';
import { LockIcon, SpinnerIcon } from '../../assets/icons';

const PasswordChangeCard = ({ logout }) => {
    const { updatePassword, loading: contextLoading } = useUsers();
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const passwordFields = [
        {
            name: 'current_password',
            label: 'Current Password',
            minLength: null
        },
        {
            name: 'password',
            label: 'New Password',
            minLength: 8
        },
        {
            name: 'password_confirmation',
            label: 'Confirm New Password',
            minLength: 8
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.password !== passwordData.password_confirmation) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await updatePassword(passwordData);
            toast.success('Password updated successfully. Please login again.');
            setPasswordData({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
            setIsChangingPassword(false);
            setTimeout(() => {
                logout();
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsChangingPassword(false);
        setPasswordData({
            current_password: '',
            password: '',
            password_confirmation: '',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Change Password</h2>
                {!isChangingPassword && (
                    <button
                        onClick={() => setIsChangingPassword(true)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                        Change Password
                    </button>
                )}
            </div>

            {isChangingPassword ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {passwordFields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.label}
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name={field.name}
                                    value={passwordData[field.name]}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    minLength={field.minLength || undefined}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && <SpinnerIcon className="w-4 h-4 animate-spin" />}
                            {loading ? 'Updating...' : 'Update Password'}
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
                <p className="text-gray-500">
                    Click "Change Password" to update your password
                </p>
            )}
        </div>
    );
};

export default PasswordChangeCard;
