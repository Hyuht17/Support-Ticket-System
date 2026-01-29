import UsersTableHeader from './UsersTableHeader';
import UsersTableRow from './UsersTableRow';
import { useNavigate } from 'react-router-dom';

const UsersTable = ({ users, resetPasswordId, onResetPassword }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <UsersTableHeader />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <UsersTableRow
                                key={user.id}
                                user={user}
                                resetPasswordId={resetPasswordId}
                                onResetPassword={onResetPassword}
                                onClick={() => navigate(`/users/${user.id}`)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No users found</p>
                </div>
            )}
        </div>
    );
};

export default UsersTable;
