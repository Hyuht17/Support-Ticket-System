import { useState, useEffect } from 'react';
import Modal from './Modal';
import { SpinnerIcon } from '../../assets/icons';

const GenericModal = ({ isOpen, onClose, onSubmit, item = null, itemName = 'item', loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
  }, [item, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const capitalizedItemName = itemName.charAt(0).toUpperCase() + itemName.slice(1);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? `Edit ${capitalizedItemName}` : `Add ${capitalizedItemName}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${itemName} name`}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <SpinnerIcon className="w-4 h-4 animate-spin" />}
            {item ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GenericModal;
