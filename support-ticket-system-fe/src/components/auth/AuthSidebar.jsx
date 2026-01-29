const AuthSidebar = ({ icon: Icon, title, subtitle, features }) => (
  <div className="hidden lg:flex flex-col justify-center space-y-8 px-8 py-12">
    <div className="space-y-6">
      <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
        <Icon className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-5xl font-bold text-gray-900 leading-tight">
        {title}
      </h1>
      <p className="text-xl text-gray-600 leading-relaxed">
        {subtitle}
      </p>
    </div>
    {features}
  </div>
);

export default AuthSidebar;
