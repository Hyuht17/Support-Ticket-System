const AuthFormCard = ({ icon: Icon, title, subtitle, children, footer }) => (
  <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-14">
      {/* Mobile Logo */}
      <div className="flex lg:hidden justify-center mb-10">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Icon className="w-10 h-10 text-white" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>

      {children}

      {/* Footer */}
      {footer && (
        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          {footer}
        </div>
      )}
    </div>
  </div>
);

export default AuthFormCard;
