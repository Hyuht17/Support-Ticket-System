import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { TicketIcon, EmailIcon, LockIcon } from '../assets/icons';
import {
  AuthLayout,
  AuthSidebar,
  AuthFeatures,
  AuthFormCard,
  AuthInput,
  AuthButton,
  AuthFooter,
  PasswordToggle
} from '../components/auth';

const loginFeatures = [
  {
    text: 'Real-time ticket tracking',
    bgColor: 'bg-green-100',
    iconColor: '#059669'
  },
  {
    text: 'Team collaboration tools',
    bgColor: 'bg-blue-100',
    iconColor: '#2563eb'
  },
  {
    text: 'Advanced reporting',
    bgColor: 'bg-purple-100',
    iconColor: '#9333ea'
  }
];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthSidebar
        icon={TicketIcon}
        title={
          <>
            Support Ticket<br />Management
          </>
        }
        subtitle="Manage your customer support tickets efficiently with our modern platform"
        features={<AuthFeatures features={loginFeatures} />}
      />

      <AuthFormCard
        icon={TicketIcon}
        title="Welcome back"
        subtitle="Please enter your credentials to continue"
        footer={
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create account
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-7">
          <AuthInput
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@company.com"
            icon={EmailIcon}
          />

          <AuthInput
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter your password"
            icon={LockIcon}
            rightElement={
              <PasswordToggle
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
            }
          />

          <AuthButton loading={loading} loadingText="Signing in...">
            Sign in
          </AuthButton>
        </form>
      </AuthFormCard>

      <AuthFooter />
    </AuthLayout>
  );
};

export default Login;
