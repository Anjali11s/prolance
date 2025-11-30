import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiSearch, FiFilter, FiMapPin, FiStar, FiBriefcase, FiDollarSign, FiUser } from 'react-icons/fi';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function FindFreelancers() {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [minRate, setMinRate] = useState('');
    const [maxRate, setMaxRate] = useState('');

    const popularSkills = [
        'All Skills',
        'JavaScript',
        'React',
        'Node.js',
        'Python',
        'Java',
        'UI/UX Design',
        'Graphic Design',
        'Content Writing',
        'SEO',
        'Video Editing'
    ];

    useEffect(() => {
        fetchFreelancers();
    }, [selectedSkill, minRate, maxRate]);

    const fetchFreelancers = async () => {
        setLoading(true);
        try {
            let url = `${API_BASE_URL}/api/users/search?`;

            const params = [];
            if (selectedSkill && selectedSkill !== 'All Skills') {
                params.push(`skills=${encodeURIComponent(selectedSkill)}`);
            }
            if (minRate) {
                params.push(`minRate=${minRate}`);
            }
            if (maxRate) {
                params.push(`maxRate=${maxRate}`);
            }
            if (searchTerm) {
                params.push(`search=${encodeURIComponent(searchTerm)}`);
            }

            url += params.join('&');

            const response = await axios.get(url);
            setFreelancers(response.data.freelancers || []);
        } catch (error) {
            console.error('Error fetching freelancers:', error);
            setFreelancers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFreelancers();
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
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Find Freelancers</h1>
                    <p className="text-gray-600">Discover talented professionals for your projects</p>
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
                                    placeholder="Search by name or skills..."
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
                        {/* Skill Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FiFilter className="inline mr-1" /> Skill
                            </label>
                            <select
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            >
                                {popularSkills.map((skill) => (
                                    <option key={skill} value={skill === 'All Skills' ? '' : skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Min Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Min Rate (₹/hr)
                            </label>
                            <input
                                type="number"
                                value={minRate}
                                onChange={(e) => setMinRate(e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            />
                        </div>

                        {/* Max Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Rate (₹/hr)
                            </label>
                            <input
                                type="number"
                                value={maxRate}
                                onChange={(e) => setMaxRate(e.target.value)}
                                placeholder="Any"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Freelancers Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 mt-4">Finding freelancers...</p>
                    </div>
                ) : freelancers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium mb-1">No freelancers found</p>
                        <p className="text-sm text-gray-500">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {freelancers.map((freelancer, index) => (
                            <motion.div
                                key={freelancer._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/profile/${freelancer._id}`}
                                    className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition-all duration-300"
                                >
                                    {/* Avatar and Name */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                            {freelancer.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition">
                                                {freelancer.name}
                                            </h3>
                                            {freelancer.location && (
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <FiMapPin className="w-3 h-3" />
                                                    {freelancer.location}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {freelancer.bio || 'No bio provided'}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {freelancer.skills.slice(0, 4).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {freelancer.skills.length > 4 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                +{freelancer.skills.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                                                <FiStar className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {freelancer.rating > 0 ? freelancer.rating.toFixed(1) : 'New'}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {freelancer.totalReviews} reviews
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <FiDollarSign className="w-4 h-4 text-green-600" />
                                                <span className="text-sm font-semibold text-gray-800">
                                                    ₹{freelancer.hourlyRate || 0}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">per hour</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <FiBriefcase className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {freelancer.completedProjects || 0}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">projects</div>
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
