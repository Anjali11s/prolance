import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HiOutlineBell, HiOutlineX } from 'react-icons/hi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function NotificationBell() {
    const { user } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Only fetch for clients
    const isClient = user?.role === 'client' || user?.role === 'both';

    useEffect(() => {
        if (isClient) {
            fetchNotifications();
            // Poll every 30 seconds for new notifications
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [isClient]);

    const fetchNotifications = async () => {
        if (!isClient) return;

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(
                `${API_BASE_URL}/api/applications/pending/count`,
                { headers: { Authorization: token } }
            );

            setUnreadCount(response.data.pendingCount || 0);
            setNotifications(response.data.recentApplications || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const getTimeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    if (!isClient) return null;

    return (
        <div className="relative">
            {/* Bell Icon */}
            <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                title="Notifications"
            >
                <HiOutlineBell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-light">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
                {showNotifications && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <h3 className="text-sm font-normal text-gray-800">
                                Project Applications
                            </h3>
                            <button
                                onClick={() => setShowNotifications(false)}
                                className="p-1 hover:bg-gray-100 rounded transition cursor-pointer"
                            >
                                <HiOutlineX size={16} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <HiOutlineBell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500 font-light">
                                        No pending applications
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    {notifications.map((app) => (
                                        <Link
                                            key={app._id}
                                            to="/my-projects"
                                            onClick={() => setShowNotifications(false)}
                                            className="block px-4 py-3 hover:bg-gray-50 transition border-b border-gray-50 cursor-pointer"
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Avatar */}
                                                {app.freelancerId?.avatar ? (
                                                    <img
                                                        src={app.freelancerId.avatar}
                                                        alt={app.freelancerId.name}
                                                        className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-light border border-gray-200 flex-shrink-0">
                                                        {app.freelancerId?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-light text-gray-800 mb-0.5">
                                                        <span className="font-normal">{app.freelancerId?.name}</span> applied to
                                                    </p>
                                                    <p className="text-xs text-gray-600 font-light truncate mb-1">
                                                        {app.projectId?.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 font-light">
                                                        {getTimeSince(app.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}

                                    {unreadCount > notifications.length && (
                                        <Link
                                            to="/my-projects"
                                            onClick={() => setShowNotifications(false)}
                                            className="block px-4 py-3 text-center text-sm text-green-600 hover:bg-green-50 transition font-light cursor-pointer"
                                        >
                                            View all {unreadCount} applications
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close dropdown */}
            {showNotifications && (
                <div
                    onClick={() => setShowNotifications(false)}
                    className="fixed inset-0 z-40"
                />
            )}
        </div>
    );
}
