import { useState, useEffect, useRef } from 'react';
import { SpinnerIcon } from '../../assets/icons';
import { useUsers } from '../../contexts/UserContext';

const AgentSearchSelect = ({ value, onChange, label = 'Assignee' }) => {
    const { searchAgents } = useUsers();
    const [searchTerm, setSearchTerm] = useState('');
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchAgents = async () => {
            if (searchTerm.length < 1) {
                setAgents([]);
                return;
            }

            setLoading(true);
            try {
                const data = await searchAgents(searchTerm);
                setAgents(data);
            } catch (error) {
                console.error('Failed to fetch agents:', error);
                setAgents([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchAgents();
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchTerm]);

    useEffect(() => {
        if (value && !selectedAgent) {
            const agent = agents.find(a => a.id === parseInt(value));
            if (agent) {
                setSelectedAgent(agent);
            }
        }
    }, [value, agents, selectedAgent]);

    const handleSelect = (agent) => {
        setSelectedAgent(agent);
        onChange({ target: { name: 'assigned_to_user_id', value: agent.id } });
        setSearchTerm('');
        setIsOpen(false);
    };

    const handleClear = () => {
        setSelectedAgent(null);
        onChange({ target: { name: 'assigned_to_user_id', value: '' } });
        setSearchTerm('');
    };

    return (
        <div className="space-y-2" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            
            {selectedAgent ? (
                <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div>
                        <p className="font-medium text-gray-900">{selectedAgent.name}</p>
                        <p className="text-sm text-gray-500">{selectedAgent.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Search by name or email..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    {loading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <SpinnerIcon className="w-5 h-5 animate-spin text-gray-400" />
                        </div>
                    )}

                    {isOpen && searchTerm && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500">
                                    <SpinnerIcon className="w-6 h-6 animate-spin mx-auto" />
                                </div>
                            ) : agents.length > 0 ? (
                                agents.map((agent) => (
                                    <button
                                        key={agent.id}
                                        type="button"
                                        onClick={() => handleSelect(agent)}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                    >
                                        <p className="font-medium text-gray-900">{agent.name}</p>
                                        <p className="text-sm text-gray-500">{agent.email}</p>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No agents found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AgentSearchSelect;
