import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCategories } from '../contexts/CategoryContext';
import GenericTable from '../components/common/GenericTable';
import GenericModal from '../components/common/GenericModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { SpinnerIcon } from '../assets/icons';

const Categories = () => {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setModalLoading(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
        toast.success('Category updated successfully');
      } else {
        await createCategory(formData);
        toast.success('Category created successfully');
      }
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error(error.response?.data?.errors?.name?.[0] || 'Failed to save category');
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
      await deleteCategory(deleteConfirm.id);
      toast.success('Category deleted successfully');
      setDeleteConfirm({ isOpen: false, id: null });
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setModalLoading(false);
    }
  };

  if (loading && categories.length === 0) {
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
          <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">
            Manage ticket categories
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerIcon className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <GenericTable
          items={categories}
          itemName="category"
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          showBadge={false}
        />
      )}

      <GenericModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSubmit}
        item={editingCategory}
        itemName="category"
        loading={modalLoading}
      />

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        loading={modalLoading}
      />
    </div>
  );
};

export default Categories;
