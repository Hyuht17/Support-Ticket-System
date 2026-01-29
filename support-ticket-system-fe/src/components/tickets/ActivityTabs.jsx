import { useState } from 'react';
import CommentList from './CommentList';
import HistoryList from './HistoryList';

const ActivityTabs = ({
    logs,
    comments,
    onAddComment,
    onEditComment,
    onDeleteComment,
    onTabChange,
    formatDate
}) => {
    const [activeTab, setActiveTab] = useState('comments');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddComment = async (commentText) => {
        setIsSubmitting(true);
        try {
            await onAddComment(commentText);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (onTabChange) {
            onTabChange(tab);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-6">
                    <button
                        onClick={() => handleTabClick('comments')}
                        className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'comments'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Comments
                        {activeTab === 'comments' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>
                    <button
                        onClick={() => handleTabClick('history')}
                        className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'history'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        History
                        {activeTab === 'history' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>
                </div>
            </div>

            <div>
                {activeTab === 'comments' && (
                    <CommentList
                        comments={comments}
                        onAddComment={handleAddComment}
                        onEditComment={onEditComment}
                        onDeleteComment={onDeleteComment}
                        formatDate={formatDate}
                        isSubmitting={isSubmitting}
                    />
                )}

                {activeTab === 'history' && (
                    <HistoryList
                        logs={logs}
                        formatDate={formatDate}
                    />
                )}
            </div>
        </div>
    );
};

export default ActivityTabs;
