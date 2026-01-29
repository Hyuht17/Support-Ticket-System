import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLabels } from '../contexts/LabelContext';
import GenericTable from '../components/common/GenericTable';
import GenericModal from '../components/common/GenericModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { SpinnerIcon } from '../assets/icons';

const Labels = () => {
  const { labels, loading, createLabel, updateLabel, deleteLabel } = useLabels();
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  const handleCreate = () => {
    setEditingLabel(null);
    setIsModalOpen(true);
  };

  const handleEdit = (label) => {
    setEditingLabel(label);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setModalLoading(true);
    try {
      if (editingLabel) {
        await updateLabel(editingLabel.id, formData);
        toast.success('Label updated successfully');
      } else {
        await createLabel(formData);
        toast.success('Label created successfully');
      }
      setIsModalOpen(false);
      setEditingLabel(null);
    } catch (error) {
      console.error('Failed to save label:', error);
      toast.error(error.response?.data?.errors?.name?.[0] || 'Failed to save label');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setModalLoading(true);
    try {
      await deleteLabel(deleteConfirm.id);
      toast.success('Label deleted successfully');
      setDeleteConfirm({ isOpen: false, id: null });
    } catch (error) {
      console.error('Failed to delete label:', error);
      toast.error(error.response?.data?.message || 'Failed to delete label');
    } finally {
      setModalLoading(false);
    }
  };

  if (loading && labels.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnerIcon className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Labels</h1>
          <p className="text-gray-600 mt-2">
            Manage ticket labels
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
        >
          + Add Label
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerIcon className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <GenericTable
          items={labels}
          itemName="label"
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          showBadge={true}
        />
      )}

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLabel(null);
        }}
        onSubmit={handleSubmit}
        item={editingLabel}
        itemName="label"
        loading={modalLoading}
      />

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Label"
        message="Are you sure you want to delete this label? This action cannot be undone."
        loading={modalLoading}
      />
    </div>
  );
};

export default Labels;
