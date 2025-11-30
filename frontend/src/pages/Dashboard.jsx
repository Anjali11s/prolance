import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    FiBriefcase,
    FiDollarSign,
    FiEye,
    FiFileText,
    FiUser,
    FiPlusCircle,
    FiSettings,
    FiInbox
} from 'react-icons/fi';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Welcome back, <span className="text-green-600">{user?.name}</span>
                    </h1>
                    <p className="text-gray-600">
                        Here's what's happening with your account today
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <FiBriefcase className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-500">This month</span>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Active Projects</h3>
                        <p className="text-3xl font-bold text-gray-800">0</p>
                        <p className="text-sm text-gray-500 mt-2">No active projects</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                <FiDollarSign className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-500">Total</span>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Total Earnings</h3>
                        <p className="text-3xl font-bold text-gray-800">₹0</p>
                        <p className="text-sm text-gray-500 mt-2">Start earning today</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                <FiEye className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-sm text-gray-500">Last 7 days</span>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">Profile Views</h3>
                        <p className="text-3xl font-bold text-gray-800">0</p>
                        <p className="text-sm text-gray-500 mt-2">Build your profile</p>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-white rounded-xl border border-gray-200 p-8 mb-8"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="p-6 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 text-left group">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                                <FiFileText className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-green-600">Browse Projects</h3>
                            <p className="text-sm text-gray-500">Find your next gig</p>
                        </button>

                        <button className="p-6 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 text-left group">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                                <FiUser className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-green-600">Edit Profile</h3>
                            <p className="text-sm text-gray-500">Update your details</p>
                        </button>

                        <button className="p-6 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 text-left group">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                                <FiPlusCircle className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-green-600">Post a Job</h3>
                            <p className="text-sm text-gray-500">Hire talented freelancers</p>
                        </button>

                        <button className="p-6 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 text-left group">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                                <FiSettings className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-green-600">Settings</h3>
                            <p className="text-sm text-gray-500">Manage your account</p>
                        </button>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-white rounded-xl border border-gray-200 p-8"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiInbox className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium mb-1">No recent activity</p>
                        <p className="text-sm text-gray-500">Your activity will appear here</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
