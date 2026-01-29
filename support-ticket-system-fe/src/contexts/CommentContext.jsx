import { createContext, useContext, useState } from 'react';
import { commentService } from '../services/commentService';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async (ticketId) => {
    setLoading(true);
    try {
      const response = await commentService.getComments(ticketId);
      setComments(response.data || []);
      return response;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (ticketId, data) => {
    setLoading(true);
    try {
      const response = await commentService.createComment(ticketId, data);
      setComments((prev) => [...prev, response.data]);
      return response;
    } catch (error) {
      console.error('Failed to create comment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (ticketId, commentId, data) => {
    setLoading(true);
    try {
      const response = await commentService.updateComment(ticketId, commentId, data);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? response.data : comment
        )
      );
      return response;
    } catch (error) {
      console.error('Failed to update comment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (ticketId, commentId) => {
    setLoading(true);
    try {
      await commentService.deleteComment(ticketId, commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        fetchComments,
        createComment,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};
