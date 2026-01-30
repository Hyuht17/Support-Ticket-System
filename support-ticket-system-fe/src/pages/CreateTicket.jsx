import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTicket } from '../contexts/TicketContext';
import { useAuth } from '../contexts/AuthContext';
import { useCategories } from '../contexts/CategoryContext';
import { useLabels } from '../contexts/LabelContext';
import { ArrowLeftIcon, SpinnerIcon } from '../assets/icons';
import { FormInput, FormTextarea, FormSelect, FormCheckboxGroup, FileUpload } from '../components/form';
import { toast } from 'react-toastify';

const CreateTicket = () => {
  const navigate = useNavigate();
  const { createTicket, loading } = useTicket();
  const { user } = useAuth();
  const { categories } = useCategories();
  const { labels } = useLabels();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    labels: [],
    categories: [],
  });

  const [files, setFiles] = useState([]);

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], parseInt(value)]
        : prev[field].filter((id) => id !== parseInt(value)),
    }));
  };

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('priority', formData.priority);

      formData.labels.forEach((id) => submitData.append('labels[]', id));
      formData.categories.forEach((id) => submitData.append('categories[]', id));

      if (files.length > 0) {
        files.forEach((file) => submitData.append('attachments[]', file));
      }

      await createTicket(submitData);
      toast.success('Ticket created successfully!');
      navigate('/tickets');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create ticket');
    }
  };

  return (
    <div className="p-12 max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Create ticket</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <FormTextarea
          label="Message"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {labels.length > 0 && (
          <FormCheckboxGroup
            label="Labels"
            options={labels}
            selectedValues={formData.labels}
            onChange={handleCheckboxChange}
            fieldName="labels"
          />
        )}

        {categories.length > 0 && (
          <FormCheckboxGroup
            label="Categories"
            options={categories}
            selectedValues={formData.categories}
            onChange={handleCheckboxChange}
            fieldName="categories"
          />
        )}

        <FormSelect
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={priorityOptions}
          required
          placeholder="Select priority"
        />

        <FileUpload
          files={files}
          onChange={handleFilesChange}
          onRemove={handleRemoveFile}
        />

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <SpinnerIcon className="w-5 h-5 animate-spin" />}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
