import { useAuth } from '../contexts/AuthContext';
import ProfileInfoCard from '../components/profile/ProfileInfoCard';
import PasswordChangeCard from '../components/profile/PasswordChangeCard';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Profile</h1>
            <ProfileInfoCard user={user} />
            <PasswordChangeCard logout={logout} />
        </div>
    );
};

export default Profile;
