import { useState } from 'react';
import { PaperClipIcon, TrashIcon, DownloadIcon } from '../../assets/icons';

const AttachmentList = ({
    attachments = [],
    onDelete,
    onUpload,
    canEdit = false,
    ticketId
}) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            await onUpload(files);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return 'Unknown size';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const getFileIcon = (filename) => {
        const ext = filename?.split('.').pop().toLowerCase();
        const iconColors = {
            pdf: 'text-red-600',
            doc: 'text-blue-600',
            docx: 'text-blue-600',
            jpg: 'text-green-600',
            jpeg: 'text-green-600',
            png: 'text-green-600',
        };
        return iconColors[ext] || 'text-gray-600';
    };

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <PaperClipIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">
                        Attachments ({attachments.length})
                    </h3>
                </div>

                {canEdit && (
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={uploading}
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        />
                        <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            {uploading ? 'Uploading...' : '+ Add files'}
                        </span>
                    </label>
                )}
            </div>

            {/* Attachment List */}
            {attachments.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <PaperClipIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No attachments yet</p>
                    {canEdit && (
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={uploading}
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            />
                            <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Drop files here or click to upload
                            </span>
                        </label>
                    )}
                </div>
            ) : (
                <div className="space-y-2">
                    {attachments.map((attachment, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <PaperClipIcon className={`w-5 h-5 flex-shrink-0 ${getFileIcon(attachment.name)}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {attachment.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(attachment.size)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <a
                                    href={attachment.url}
                                    download={attachment.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    title="Download"
                                >
                                    <DownloadIcon className="w-4 h-4" />
                                </a>

                                {canEdit && onDelete && (
                                    <button
                                        onClick={() => onDelete(index)}
                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AttachmentList;
