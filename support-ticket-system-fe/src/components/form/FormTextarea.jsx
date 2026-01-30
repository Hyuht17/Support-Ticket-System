const FormTextarea = ({ label, name, value, onChange, rows = 6, required = false, placeholder = '' }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        required={required}
      />
    </div>
  );
};

export default FormTextarea;
