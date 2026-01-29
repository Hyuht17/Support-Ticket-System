import { createContext, useContext, useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

const CategoryContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoryService.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError(err.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data) => {
    const response = await categoryService.createCategory(data);
    await fetchCategories();
    return response;
  };

  const updateCategory = async (id, data) => {
    const response = await categoryService.updateCategory(id, data);
    await fetchCategories();
    return response;
  };

  const deleteCategory = async (id) => {
    const response = await categoryService.deleteCategory(id);
    await fetchCategories();
    return response;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value = {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
