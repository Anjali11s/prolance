import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HiOutlineChat, HiOutlineChevronLeft } from 'react-icons/hi';
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
                        className={`w-full md:w-80 lg:w-96 border-r border-gray-100 ${showMobileChat ? 'hidden md:block' : 'block'
                            }`}
                    >
                        <ConversationsList
                            conversations={conversations}
                            selectedConversation={selectedConversation}
                            onSelectConversation={handleSelectConversation}
                        />
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
