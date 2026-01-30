import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePermissions } from '../../hooks/usePermissions';
import CommentForm from './CommentForm';

const CommentList = ({
    comments,
    onAddComment,
    onEditComment,
    onDeleteComment,
    formatDate,
    isSubmitting
}) => {
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState('');
    const { user } = useAuth();
    const { canEditComment, canDeleteComment } = usePermissions();

    const handleStartEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditText(comment.content);
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditText('');
    };

    const handleSaveEdit = async (commentId) => {
        if (!editText.trim()) return;

        try {
            await onEditComment(commentId, editText);
            setEditingCommentId(null);
            setEditText('');
        } catch (error) {
            console.error('Failed to update comment:', error);
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        try {
            await onDeleteComment(commentId);
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    return (
        <>
            <CommentForm onSubmit={onAddComment} isSubmitting={isSubmitting} />

            {comments && comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 font-semibold text-sm">
                                    {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="font-medium text-gray-900">{comment.user?.name || 'Unknown'}</span>
                                    </div>
                                    {/* Show edit/delete buttons based on permissions */}
                                    {(canEditComment(comment) || canDeleteComment(comment)) && (
                                        <div className="flex gap-2">
                                            {canEditComment(comment) && (
                                                <button
                                                    onClick={() => handleStartEdit(comment)}
                                                    className="text-xs text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            {canDeleteComment(comment) && (
                                                <button
                                                    onClick={() => handleDelete(comment.id)}
                                                    className="text-xs text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {editingCommentId === comment.id ? (
                                    <div className="mt-2">
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                            rows="3"
                                        />
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => handleSaveEdit(comment.id)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                                )}

                                <p className="text-xs text-gray-500 mt-1">{formatDate(comment.created_at)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
            )}
        </>
    );
};

export default CommentList;
