const FormCheckboxGroup = ({ label, options, selectedValues, onChange, fieldName }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-3">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.id} className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={option.id}
              checked={selectedValues.includes(option.id)}
              onChange={(e) => onChange(e, fieldName)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FormCheckboxGroup;
