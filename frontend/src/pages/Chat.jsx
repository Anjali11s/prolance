import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HiOutlineChat, HiOutlineChevronLeft, HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import axios from 'axios';
import socketService from '../services/socketService';
import ConversationsList from '../components/chat/ConversationsList';
import ChatWindow from '../components/chat/ChatWindow';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function Chat() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMobileChat, setShowMobileChat] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        // Connect socket
        const token = localStorage.getItem('authToken');
        if (token) {
            socketService.connect(token);
        }

        fetchConversations();

        // Listen for conversation updates
        socketService.onConversationUpdated(handleConversationUpdate);

        return () => {
            socketService.offConversationUpdated(handleConversationUpdate);
        };
    }, []);

    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const timer = setTimeout(() => {
                searchFreelancers();
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${API_BASE_URL}/api/chat/conversations`, {
                headers: { Authorization: token }
            });

            setConversations(response.data.conversations || []);
        } catch (err) {
            console.error('Error fetching conversations:', err);
        } finally {
            setLoading(false);
        }
    };

    const searchFreelancers = async () => {
        setSearching(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(
                `${API_BASE_URL}/api/users/search?search=${encodeURIComponent(searchQuery)}`,
                { headers: { Authorization: token } }
            );
            // The API returns freelancers, not users
            setSearchResults(response.data.freelancers || []);
        } catch (err) {
            console.error('Error searching freelancers:', err);
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const handleStartChat = async (user) => {
        try {
            const token = localStorage.getItem('authToken');

            // Check if conversation already exists
            const existingConv = conversations.find(conv =>
                conv.participants.some(p => p._id === user._id)
            );

            if (existingConv) {
                setSelectedConversation(existingConv);
                setShowMobileChat(true);
                setShowSearch(false);
                setSearchQuery('');
                return;
            }

            // Create new conversation
            const response = await axios.post(
                `${API_BASE_URL}/api/chat/conversations`,
                { participantId: user._id },
                { headers: { Authorization: token } }
            );

            const newConversation = response.data.conversation;
            setConversations(prev => [newConversation, ...prev]);
            setSelectedConversation(newConversation);
            setShowMobileChat(true);
            setShowSearch(false);
            setSearchQuery('');
        } catch (err) {
            console.error('Error starting chat:', err);
        }
    };

    const handleConversationUpdate = ({ conversationId, lastMessage }) => {
        setConversations(prev => {
            const updated = prev.map(conv =>
                conv._id === conversationId
                    ? { ...conv, lastMessage, lastMessageAt: lastMessage.createdAt }
                    : conv
            );
            // Sort by last message time
            return updated.sort((a, b) =>
                new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
            );
        });
    };

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
        setShowMobileChat(true);
    };

    const handleBackToList = () => {
        setShowMobileChat(false);
        setSelectedConversation(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 mt-3 font-light">Loading messages...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="h-[85vh] w-full bg-white flex flex-col overflow-hidden border-b border-gray-200">
                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Conversations List - Desktop always visible, Mobile conditionally */}
                    <div
                        className={`w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'
                            }`}
                    >
                        {/* Search Bar */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search freelancers by username..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setShowSearch(true)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 transition"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setShowSearch(false);
                                        }}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <HiOutlineX className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Search Results */}
                            {showSearch && searchQuery && (
                                <div className="absolute z-10 w-full md:w-80 lg:w-96 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg mt-2 shadow-lg">
                                    {searching ? (
                                        <div className="p-4 text-center">
                                            <div className="inline-block w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-xs text-gray-500 mt-2">Searching...</p>
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="py-2">
                                            {searchResults.map((user) => (
                                                <button
                                                    key={user._id}
                                                    onClick={() => handleStartChat(user)}
                                                    className="w-full px-4 py-3 hover:bg-gray-50 transition flex items-center gap-3 text-left"
                                                >
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <span className="text-green-700 font-medium text-sm">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                                                    </div>
                                                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                                                        {user.role}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center">
                                            <p className="text-sm text-gray-500">No users found</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Conversations List */}
                        <div className="flex-1 overflow-hidden">
                            <ConversationsList
                                conversations={conversations}
                                selectedConversation={selectedConversation}
                                onSelectConversation={handleSelectConversation}
                            />
                        </div>
                    </div>

                    {/* Chat Window - Desktop always visible, Mobile conditionally */}
                    <div className={`flex-1 ${showMobileChat ? 'block' : 'hidden md:block'}`}>
                        {selectedConversation ? (
                            <ChatWindow
                                conversation={selectedConversation}
                                onBack={handleBackToList}
                            />
                        ) : (
                            <div className="h-full flex items-center justify-center bg-gray-50">
                                <div className="text-center">
                                    <HiOutlineChat className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                                    <p className="text-sm text-gray-500 font-light">
                                        Select a conversation to start messaging
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
