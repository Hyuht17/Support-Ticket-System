import Modal from './Modal';

const InfoModal = ({ isOpen, onClose, title, children, buttonText = 'Close' }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            actions={
                <button
                    onClick={onClose}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    {buttonText}
                </button>
            }
        >
            {children}
        </Modal>
    );
};

export default InfoModal;
