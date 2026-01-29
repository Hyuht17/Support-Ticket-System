import { createContext, useContext, useState, useEffect } from 'react';
import { labelService } from '../services/labelService';

const LabelContext = createContext();

export const useLabels = () => {
  const context = useContext(LabelContext);
  if (!context) {
    throw new Error('useLabels must be used within LabelProvider');
  }
  return context;
};

export const LabelProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLabels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await labelService.getLabels();
      setLabels(response.data || []);
    } catch (err) {
      console.error('Failed to fetch labels:', err);
      setError(err.message);
      setLabels([]);
    } finally {
      setLoading(false);
    }
  };

  const createLabel = async (data) => {
    const response = await labelService.createLabel(data);
    await fetchLabels();
    return response;
  };

  const updateLabel = async (id, data) => {
    const response = await labelService.updateLabel(id, data);
    await fetchLabels();
    return response;
  };

  const deleteLabel = async (id) => {
    const response = await labelService.deleteLabel(id);
    await fetchLabels();
    return response;
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  const value = {
    labels,
    loading,
    error,
    fetchLabels,
    createLabel,
    updateLabel,
    deleteLabel,
  };

  return (
    <LabelContext.Provider value={value}>
      {children}
    </LabelContext.Provider>
  );
};
