import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import {
  LogoIcon,
  DashboardIcon,
  TicketIcon,
  UsersIcon,
  FileTextIcon,
  ArchiveIcon,
  TagIcon,
  ProfileIcon,
  LogoutIcon
} from '../../assets/icons';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { canViewDashboard, canViewUsers, canViewCategories, canViewLabels, canViewAllLogs } = usePermissions();

  const isActive = (path) => location.pathname === path;

  const allNavItems = [
    { path: '/dashboard', label: 'Dashboard', Icon: DashboardIcon, show: canViewDashboard() },
    { path: '/tickets', label: 'Tickets', Icon: TicketIcon, show: true },
    { path: '/users', label: 'Users', Icon: UsersIcon, show: canViewUsers() },
    { path: '/ticket-logs', label: 'Ticket Logs', Icon: FileTextIcon, show: canViewAllLogs() },
    { path: '/categories', label: 'Categories', Icon: ArchiveIcon, show: canViewCategories() },
    { path: '/labels', label: 'Labels', Icon: TagIcon, show: canViewLabels() },
  ];

  const navItems = allNavItems.filter(item => item.show);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="fixed w-72 bg-white shadow-lg top-0 left-0 h-screen overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8 text-gray-800" />
          <span className="text-xl font-bold text-gray-800">Support Ticket</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navItems.map(({ path, label, Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${isActive(path)
                    ? 'bg-gray-100 font-semibold text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-lg">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-semibold text-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-800 truncate">{user?.name || 'User'}</div>
            <div className="text-xs text-gray-500 truncate">{user?.email || ''}</div>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ProfileIcon className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
          >
            <LogoutIcon className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
