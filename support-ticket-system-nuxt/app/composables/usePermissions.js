export const ROLES = {
    ADMIN: 1,
    AGENT: 2,
    USER: 3
};

export const usePermissions = () => {
    const { user } = useAuth();

    const isAdmin = () => user.value?.role_id === ROLES.ADMIN;
    const isAgent = () => user.value?.role_id === ROLES.AGENT;
    const isUser = () => user.value?.role_id === ROLES.USER;

    const canViewDashboard = () => isAdmin();
    const canViewUsers = () => isAdmin();
    const canViewCategories = () => isAdmin();
    const canViewLabels = () => isAdmin();
    const canViewAllLogs = () => isAdmin();

    const canCreateTicket = () => true;
    const canEditTicket = (ticket) => {
        if (isAdmin()) return true;
        if (isAgent()) {
            return ticket?.user_id === user.value?.id || ticket?.assigned_to_user_id === user.value?.id;
        }
        return false; 
    };

    const canDeleteTicket = (ticket) => {
        return isAdmin(); 
    };

    const canAssignTicket = () => isAdmin(); 

    const canAddComment = () => true; 

    const canEditComment = (comment) => {
        return comment?.user_id === user.value?.id; 
    };

    const canDeleteComment = (comment) => {
        return comment?.user_id === user.value?.id || isAdmin(); 
    };

    return {
        user,
        isAdmin,
        isAgent,
        isUser,
        canViewDashboard,
        canViewUsers,
        canViewCategories,
        canViewLabels,
        canViewAllLogs,
        canCreateTicket,
        canEditTicket,
        canDeleteTicket,
        canAssignTicket,
        canAddComment,
        canEditComment,
        canDeleteComment
    };
};
