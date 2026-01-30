import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUsers } from '../contexts/UserContext';
import { SpinnerIcon } from '../assets/icons';
import UsersTable from '../components/users/UsersTable';
import ConfirmModal from '../components/common/ConfirmModal';
import InfoModal from '../components/common/InfoModal';

const Users = () => {
    const { users, loading, fetchUsers, resetPassword } = useUsers();
    const [resetPasswordId, setResetPasswordId] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null, userName: '' });
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, userName: '', password: '' });

    useEffect(() => {
        fetchUsers().catch((error) => {
            toast.error(error.response?.data?.message || 'Failed to fetch users');
        });
    }, [fetchUsers]);

    const handleResetPassword = async (userId, userName) => {
        setConfirmModal({ isOpen: true, userId, userName });
    };

    const confirmResetPassword = async () => {
        const { userId, userName } = confirmModal;
        setResetPasswordId(userId);
        
        try {
            const response = await resetPassword(userId);
            const newPassword = response.new_password;

            setConfirmModal({ isOpen: false, userId: null, userName: '' });
            setPasswordModal({ isOpen: true, userName, password: newPassword });
            
            toast.success('Password reset successfully');
        } catch (error) {
            toast.error(error.response?.message || 'Failed to reset password');
        } finally {
            setResetPasswordId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <SpinnerIcon className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600 mt-2">Manage all users in the system</p>
            </div>

            <UsersTable
                users={users}
                resetPasswordId={resetPasswordId}
                onResetPassword={handleResetPassword}
            />

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, userId: null, userName: '' })}
                onConfirm={confirmResetPassword}
                title="Reset Password"
                message={`Are you sure you want to reset password for ${confirmModal.userName}?`}
                confirmText="Reset Password"
                cancelText="Cancel"
                isLoading={resetPasswordId === confirmModal.userId}
            />

            <InfoModal
                isOpen={passwordModal.isOpen}
                onClose={() => setPasswordModal({ isOpen: false, userName: '', password: '' })}
                title="Password Reset Successfully"
            >
                <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                        New password for <span className="font-semibold text-gray-900">{passwordModal.userName}</span>:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-lg font-mono font-bold text-gray-900 break-all">
                            {passwordModal.password}
                        </p>
                    </div>
                    <p className="text-sm text-amber-600 font-medium">
                        Please save this password and share it with the user securely.
                    </p>
                </div>
            </InfoModal>
        </div>
    );
};

export default Users;
