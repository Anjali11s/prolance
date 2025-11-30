import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiSearch, FiFilter, FiMapPin, FiClock, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function BrowseProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');

    const categories = [
        'All Categories',
        'Programming & Tech',
        'Graphics & Design',
        'Digital Marketing',
        'Writing & Translation',
        'Video & Animation',
        'AI Services',
        'Music & Audio',
        'Business',
        'Consulting'
    ];

    useEffect(() => {
        fetchProjects();
    }, [selectedCategory, minBudget, maxBudget]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            let url = `${API_BASE_URL}/api/projects?status=open`;

            if (selectedCategory && selectedCategory !== 'All Categories') {
                url += `&category=${encodeURIComponent(selectedCategory)}`;
            }
            if (minBudget) {
                url += `&minBudget=${minBudget}`;
            }
            if (maxBudget) {
                url += `&maxBudget=${maxBudget}`;
            }
            if (searchTerm) {
                url += `&search=${encodeURIComponent(searchTerm)}`;
            }

            const response = await axios.get(url);
            setProjects(response.data.projects || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProjects();
    };

    const getTimeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'Just now';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Browse Projects</h1>
                    <p className="text-gray-600">Find your next opportunity from {projects.length} open projects</p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
                >
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search projects..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FiFilter className="inline mr-1" /> Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Min Budget */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Min Budget (₹)
                            </label>
                            <input
                                type="number"
                                value={minBudget}
                                onChange={(e) => setMinBudget(e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            />
                        </div>

                        {/* Max Budget */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Budget (₹)
                            </label>
                            <input
                                type="number"
                                value={maxBudget}
                                onChange={(e) => setMaxBudget(e.target.value)}
                                placeholder="Any"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Projects List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 mt-4">Loading projects...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <FiBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium mb-1">No projects found</p>
                        <p className="text-sm text-gray-500">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/projects/${project._id}`}
                                    className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition">
                                                {project.title}
                                            </h3>
                                            <p className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                                {project.category}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-800">
                                                ₹{project.budget.min.toLocaleString()} - ₹{project.budget.max.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500">{project.budget.type}</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.skillsRequired.slice(0, 5).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {project.skillsRequired.length > 5 && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                +{project.skillsRequired.length - 5} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <FiClock className="w-4 h-4" />
                                                {getTimeSince(project.createdAt)}
                                            </div>
                                            {project.clientId?.location && (
                                                <div className="flex items-center gap-1">
                                                    <FiMapPin className="w-4 h-4" />
                                                    {project.clientId.location}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-gray-600">
                                            {project.proposalCount} proposal{project.proposalCount !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
