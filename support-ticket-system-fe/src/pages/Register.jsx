import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { UserAddIcon, UserIcon, EmailIcon, LockIcon, ShieldIcon } from '../assets/icons';
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

const registerFeatures = [
  { 
    text: 'Quick and easy setup', 
    bgColor: 'bg-green-100',
    iconColor: '#059669'
  },
  { 
    text: 'Secure and encrypted', 
    bgColor: 'bg-blue-100',
    iconColor: '#2563eb'
  },
  { 
    text: '24/7 support access', 
    bgColor: 'bg-purple-100',
    iconColor: '#9333ea'
  }
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthSidebar
        icon={UserAddIcon}
        title={
          <>
            Join Our<br />Support Team
          </>
        }
        subtitle="Create an account and start managing support tickets with our intuitive platform"
        features={<AuthFeatures features={registerFeatures} />}
      />

      <AuthFormCard
        icon={UserAddIcon}
        title="Create account"
        subtitle="Sign up to get started with our platform"
        footer={
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthInput
            label="Full name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            icon={UserIcon}
          />

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
            placeholder="Create a strong password"
            icon={LockIcon}
            rightElement={
              <PasswordToggle 
                show={showPassword} 
                onToggle={() => setShowPassword(!showPassword)} 
              />
            }
          />

          <AuthInput
            label="Confirm password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.password_confirmation}
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
            placeholder="Confirm your password"
            icon={ShieldIcon}
            rightElement={
              <PasswordToggle 
                show={showConfirmPassword} 
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)} 
              />
            }
          />

          <AuthButton loading={loading} loadingText="Creating account...">
            Create your account
          </AuthButton>
        </form>
      </AuthFormCard>

      <AuthFooter />
    </AuthLayout>
  );
};

export default Register;
