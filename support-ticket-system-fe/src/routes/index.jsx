import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleProtectedRoute from '../components/RoleProtectedRoute';
import { MainLayout } from '../components/layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Tickets from '../pages/Tickets';
import TicketDetail from '../pages/TicketDetail';
import CreateTicket from '../pages/CreateTicket';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import UserDetail from '../pages/UserDetail';
import TicketLogs from '../pages/TicketLogs';
import Categories from '../pages/Categories';
import Labels from '../pages/Labels';

// Public routes
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
];

// Protected routes
export const protectedRoutes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/tickets" replace />
      },
      {
        path: 'dashboard',
        element: (
          <RoleProtectedRoute requirePermission={(p) => p.canViewDashboard()}>
            <Dashboard />
          </RoleProtectedRoute>
        )
      },
      {
        path: 'tickets',
        element: <Tickets />
      },
      {
        path: 'tickets/create',
        element: <CreateTicket />
      },
      {
        path: 'tickets/:id',
        element: <TicketDetail />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'users',
        element: (
          <RoleProtectedRoute requirePermission={(p) => p.canViewUsers()}>
            <Users />
          </RoleProtectedRoute>
        )
      },
      {
        path: 'users/:id',
        element: (
          <RoleProtectedRoute requirePermission={(p) => p.canViewUsers()}>
            <UserDetail />
          </RoleProtectedRoute>
        )
      },
      {
        path: 'ticket-logs',
        element: (
          <RoleProtectedRoute requirePermission={(p) => p.canViewAllLogs()}>
            <TicketLogs />
          </RoleProtectedRoute>
        )
      },
      {
        path: 'categories',
        element: (
          <RoleProtectedRoute requirePermission={(p) => p.canViewCategories()}>
            <Categories />
          </RoleProtectedRoute>
        )
      },
      {
        path: 'labels',
        element: (
          <RoleProtectedRoute requirePermission={(p) => p.canViewLabels()}>
            <Labels />
          </RoleProtectedRoute>
        )
      }
    ]
  }
];
