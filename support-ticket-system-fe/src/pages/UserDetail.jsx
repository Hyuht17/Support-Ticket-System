import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUsers } from '../contexts/UserContext';
import { SpinnerIcon, ArrowLeftIcon } from '../assets/icons';
import UserInfoCard from '../components/users/UserInfoCard';
import ConfirmModal from '../components/common/ConfirmModal';
import InfoModal from '../components/common/InfoModal';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser, loading, fetchUser, resetPassword } = useUsers();
    const [isResetting, setIsResetting] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false });
    const [passwordModal, setPasswordModal] = useState({ isOpen: false, password: '' });

    useEffect(() => {
        fetchUser(id).catch((error) => {
            toast.error('Failed to load user details');
            navigate('/users');
        });
    }, [id, fetchUser, navigate]);

    const handleResetPassword = async () => {
        setConfirmModal({ isOpen: true });
    };

    const confirmResetPassword = async () => {
        setIsResetting(true);
        setConfirmModal({ isOpen: false });
        
        try {
            const response = await resetPassword(id);
            const newPassword = response.new_password;

            setPasswordModal({ isOpen: true, password: newPassword });
            toast.success('Password reset successfully');
        } catch (error) {
            toast.error(error.response?.message || 'Failed to reset password');
        } finally {
            setIsResetting(false);  
        }
    };

    if (loading && !currentUser) {
        return (
            <div className="flex items-center justify-center h-64">
                <SpinnerIcon className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-12 max-w-4xl">
            <div className="mb-8">
                <Link to="/users" className="hover:text-blue-800 font-medium mb-4 inline-block">
                    <ArrowLeftIcon className="w-5 h-5" />
                </Link>
                <h1 className="text-4xl font-bold text-gray-900">User Details</h1>
            </div>

            <UserInfoCard
                user={currentUser}
                onUpdate={() => fetchUser(id)}
                onResetPassword={handleResetPassword}
                isResetting={isResetting}
            />

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false })}
                onConfirm={confirmResetPassword}
                title="Reset Password"
                message={`Are you sure you want to reset password for ${currentUser?.name}?`}
                confirmText="Reset Password"
                cancelText="Cancel"
                isLoading={isResetting}
            />

            <InfoModal
                isOpen={passwordModal.isOpen}
                onClose={() => setPasswordModal({ isOpen: false, password: '' })}
                title="Password Reset Successfully"
            >
                <div className="space-y-3">
                    <p className="text-sm text-gray-500">
                        New password for <span className="font-semibold text-gray-900">{currentUser?.name}</span>:
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

export default UserDetail;
