import AuthFooter from './AuthFooter';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6 lg:p-8">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
