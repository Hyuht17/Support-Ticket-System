import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTickets } from '../contexts/TicketContext';
import { useComments } from '../contexts/CommentContext';
import { useCategories } from '../contexts/CategoryContext';
import { useLabels } from '../contexts/LabelContext';
import { ticketService } from '../services/ticketService';
import { TicketHeader, TicketInfo, ActivityTabs, TicketSidebar, AttachmentList } from '../components/tickets';
import { SpinnerIcon, ArrowLeftIcon } from '../assets/icons';

const TicketDetail = () => {
  const { id } = useParams();
  const { currentTicket, loading, fetchTicket, updateTicket } = useTickets();
  const { comments, fetchComments, createComment, updateComment, deleteComment } = useComments();
  const { categories } = useCategories();
  const { labels } = useLabels();

  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ticketLogs, setTicketLogs] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'low',
    labels: [],
    categories: [],
    assigned_to_user_id: '',
  });


  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  useEffect(() => {
    fetchTicket(id);

    const loadComments = async () => {
      try {
        await fetchComments(id);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    loadComments();
  }, [id]);

  const handleTabChange = async (tab) => {
    if (tab === 'history' && ticketLogs.length === 0) {
      try {
        const response = await ticketService.getTicketLogs(id);
        if (response.data && Array.isArray(response.data)) {
          setTicketLogs(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch logs:', error);
        setTicketLogs([]);
      }
    }
  };

  useEffect(() => {
    if (currentTicket) {
      setFormData({
        title: currentTicket.title || '',
        description: currentTicket.description || '',
        status: currentTicket.status || 'open',
        priority: currentTicket.priority || 'low',
        labels: currentTicket.labels?.map(l => l.id) || [],
        categories: currentTicket.categories?.map(c => c.id) || [],
        assigned_to_user_id: currentTicket.assigned_to_user_id || '',
      });

      if (currentTicket.attachment_urls && Array.isArray(currentTicket.attachment_urls)) {
        const parsedAttachments = currentTicket.attachment_urls.map((file, index) => ({
          name: file.name,
          url: file.url,
          size: file.size,
          path: file.path,
          index
        }));
        setAttachments(parsedAttachments);
      } else {
        setAttachments([]);
      }
    }
  }, [currentTicket]);

  const handleUploadFiles = async (files) => {
    setNewFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} file(s) added. Save to upload.`);
  };

  const handleDeleteAttachment = (index) => {
    if (window.confirm('Are you sure you want to delete this attachment?')) {
      setAttachments(prev => prev.filter((_, i) => i !== index));
      toast.success('Attachment removed. Save to apply changes.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('_method', 'PATCH'); // Laravel method spoofing
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('status', formData.status);
      submitData.append('priority', formData.priority);

      if (formData.assigned_to_user_id) {
        submitData.append('assigned_to_user_id', formData.assigned_to_user_id);
      }

      formData.labels.forEach((id) => submitData.append('labels[]', id));
      formData.categories.forEach((id) => submitData.append('categories[]', id));

      if (newFiles.length > 0) {
        newFiles.forEach((file) => submitData.append('attachments[]', file));
      }

      const keepFiles = attachments.map(a => ({
        path: a.path,
        original_name: a.name,
        size: a.size
      }));
      submitData.append('keep_attachments', JSON.stringify(keepFiles));

      // Use POST with _method=PATCH for FormData
      await ticketService.updateTicketWithFiles(id, submitData);
      toast.success('Ticket updated successfully');
      setIsEditing(false);
      setNewFiles([]);
      fetchTicket(id); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleAddComment = async (commentText) => {
    try {
      await createComment(id, { content: commentText });
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      await updateComment(id, commentId, { content });
      toast.success('Comment updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      toast.success('Comment deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete comment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && !currentTicket) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <SpinnerIcon className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!currentTicket) {
    return (
      <div className="p-12">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Ticket not found</p>
          <Link to="/tickets" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <TicketHeader
        ticket={currentTicket}
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <TicketInfo
            ticket={currentTicket}
            isEditing={isEditing}
            submitting={submitting}
            formData={formData}
            statusOptions={statusOptions}
            priorityOptions={priorityOptions}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onCancel={() => setIsEditing(false)}
          />

          <AttachmentList
            attachments={[...attachments, ...newFiles.map((file, index) => ({
              name: file.name,
              size: file.size,
              url: URL.createObjectURL(file),
              index: attachments.length + index,
              isNew: true
            }))]}
            onDelete={handleDeleteAttachment}
            onUpload={handleUploadFiles}
            canEdit={isEditing}
            ticketId={id}
          />

          <ActivityTabs
            logs={ticketLogs}
            comments={comments}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            onTabChange={handleTabChange}
            formatDate={formatDate}
          />
        </div>

        <TicketSidebar
          ticket={currentTicket}
          isEditing={isEditing}
          formData={formData}
          statusOptions={statusOptions}
          priorityOptions={priorityOptions}
          availableLabels={labels}
          availableCategories={categories}
          onChange={handleChange}
          onCheckboxChange={handleCheckboxChange}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

export default TicketDetail;
