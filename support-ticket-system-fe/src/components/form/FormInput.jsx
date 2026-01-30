const FormInput = ({ label, name, value, onChange, type = 'text', required = false, placeholder = '', className = '' }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${className}`}
        required={required}
      />
    </div>
  );
};

export default FormInput;

