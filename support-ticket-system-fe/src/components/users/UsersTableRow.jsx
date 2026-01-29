import { Link } from 'react-router-dom';
import { SpinnerIcon } from '../../assets/icons';

const UsersTableRow = ({ user, resetPasswordId, onResetPassword, onClick }) => {
    const getRoleName = (roleId) => {
        const roles = { 1: 'Admin', 2: 'Agent', 3: 'User' };
        return roles[roleId] || 'Unknown';
    };

    const getRoleBadgeClass = (roleId) => {
        const classes = {
            1: 'bg-purple-100 text-purple-800',
            2: 'bg-blue-100 text-blue-800',
            3: 'bg-gray-100 text-gray-800'
        };
        return classes[roleId] || 'bg-gray-100 text-gray-800';
    };

    const isResetting = resetPasswordId === user.id;

    const handleRowClick = (e) => {
        if (e.target.closest('button')) {
            return;
        }
        onClick?.();
    };

    return (
        <tr 
            className="hover:bg-gray-50 cursor-pointer"
            onClick={handleRowClick}
        >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                #{user.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getRoleBadgeClass(user.role_id)}`}>
                    {getRoleName(user.role_id)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onResetPassword(user.id, user.name)}
                        disabled={isResetting}
                        className="text-orange-600 hover:text-orange-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                        {isResetting ? (
                            <>
                                <SpinnerIcon className="w-4 h-4 animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UsersTableRow;
