import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
    HiOutlineSearch,
    HiOutlineFilter,
    HiOutlineLocationMarker,
    HiOutlineClock,
    HiOutlineBriefcase,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineStar
} from 'react-icons/hi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function BrowseProjects() {
    const { isAuthenticated } = useAuth();
    const [projects, setProjects] = useState([]);
    const [trendingProjects, setTrendingProjects] = useState([]);
    const [bestMatchProjects, setBestMatchProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const carouselRef = useRef(null);

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
        if (isAuthenticated) {
            fetchTrendingProjects();
            fetchBestMatches();
        }
    }, [selectedCategory, minBudget, maxBudget, isAuthenticated]);

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

    const fetchTrendingProjects = async () => {
        try {
            const url = `${API_BASE_URL}/api/projects?status=open&limit=6`;
            const response = await axios.get(url);
            setTrendingProjects(response.data.projects || []);
        } catch (error) {
            console.error('Error fetching trending projects:', error);
        }
    };

    const fetchBestMatches = async () => {
        try {
            const url = `${API_BASE_URL}/api/projects?status=open&limit=3`;
            const response = await axios.get(url);
            setBestMatchProjects(response.data.projects || []);
        } catch (error) {
            console.error('Error fetching best matches:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProjects();
    };

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 350;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
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
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-8 py-10">
                {/* Header with Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-light text-gray-700 mb-6">Explore Projects</h1>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="flex-1 relative">
                            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                            title="Filters"
                        >
                            <HiOutlineFilter size={18} />
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                            title="Search"
                        >
                            <HiOutlineSearch size={18} />
                        </button>
                    </form>
                </motion.div>

                {/* Filters Panel */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 pb-6 border-b border-gray-100"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 font-light">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 font-light">Min Budget (₹)</label>
                                <input
                                    type="number"
                                    value={minBudget}
                                    onChange={(e) => setMinBudget(e.target.value)}
                                    placeholder="0"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 font-light">Max Budget (₹)</label>
                                <input
                                    type="number"
                                    value={maxBudget}
                                    onChange={(e) => setMaxBudget(e.target.value)}
                                    placeholder="Any"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Trending Projects Carousel - Only show when authenticated */}
                {isAuthenticated && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-10"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-light text-gray-700">Trending Projects</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => scrollCarousel('left')}
                                    className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <HiOutlineChevronLeft size={16} className="text-gray-600" />
                                </button>
                                <button
                                    onClick={() => scrollCarousel('right')}
                                    className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <HiOutlineChevronRight size={16} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div
                            ref={carouselRef}
                            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {trendingProjects.map((project) => (
                                <Link
                                    key={project._id}
                                    to={`/projects/${project._id}`}
                                    className="flex-shrink-0 w-80 border border-gray-100 rounded-lg overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
                                >
                                    {/* Thumbnail */}
                                    {project.thumbnail ? (
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="w-full h-40 object-cover bg-gray-100"
                                        />
                                    ) : (
                                        <div className="w-full h-40 bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center">
                                            <HiOutlineBriefcase size={40} className="text-gray-300" />
                                        </div>
                                    )}

                                    <div className="p-4">
                                        <h3 className="text-base font-light text-gray-700 mb-2 line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-light">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-400 font-light">
                                            <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-md">
                                                {project.category}
                                            </span>
                                            <span>
                                                ₹{project.budget.min.toLocaleString()}+
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Best Matching Projects - Only show when authenticated */}
                {isAuthenticated && bestMatchProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <HiOutlineStar className="text-green-600" size={18} />
                            <h2 className="text-lg font-light text-gray-700">Best Matches for You</h2>
                        </div>
                        <div className="space-y-3">
                            {bestMatchProjects.map((project) => (
                                <Link
                                    key={project._id}
                                    to={`/projects/${project._id}`}
                                    className="flex border border-green-100 bg-green-50/30 rounded-lg overflow-hidden hover:border-green-200 hover:bg-green-50/50 transition-all"
                                >
                                    {/* Thumbnail */}
                                    {project.thumbnail ? (
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="w-32 h-32 object-cover bg-gray-100 flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-gray-50 flex items-center justify-center flex-shrink-0">
                                            <HiOutlineBriefcase size={32} className="text-gray-300" />
                                        </div>
                                    )}

                                    <div className="flex-1 p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-light text-gray-700 mb-2 hover:text-green-600 transition">
                                                    {project.title}
                                                </h3>
                                                <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-md font-light">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <div className="text-right ml-4">
                                                <div className="text-lg font-light text-gray-700">
                                                    ₹{project.budget.min.toLocaleString()} - ₹{project.budget.max.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-400 font-light">{project.budget.type}</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-light">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-400 font-light">
                                            <div className="flex items-center gap-1">
                                                <HiOutlineClock size={14} />
                                                {getTimeSince(project.createdAt)}
                                            </div>
                                            <div>
                                                {project.proposalCount} proposals
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* All Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-lg font-light text-gray-700 mb-4">All Projects</h2>
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="inline-block w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-500 mt-3 font-light">Loading projects...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-16 border border-gray-100 rounded-lg">
                            <HiOutlineBriefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-600 font-light mb-1">No projects found</p>
                            <p className="text-xs text-gray-400 font-light">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                >
                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="block border border-gray-100 rounded-lg overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all h-full"
                                    >
                                        {/* Thumbnail */}
                                        {project.thumbnail ? (
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="w-full h-40 object-cover bg-gray-100"
                                            />
                                        ) : (
                                            <div className="w-full h-40 bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
                                                <HiOutlineBriefcase size={36} className="text-gray-300" />
                                            </div>
                                        )}

                                        <div className="p-4">
                                            <div className="mb-3">
                                                <h3 className="text-base font-light text-gray-700 mb-2 line-clamp-2 hover:text-green-600 transition min-h-[3rem]">
                                                    {project.title}
                                                </h3>
                                                <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-md font-light">
                                                    {project.category}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-light min-h-[2.5rem]">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 mb-3 min-h-[1.5rem]">
                                                {project.skillsRequired.slice(0, 3).map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded border border-gray-100 font-light"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {project.skillsRequired.length > 3 && (
                                                    <span className="px-2 py-0.5 text-gray-400 text-xs font-light">
                                                        +{project.skillsRequired.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="pt-3 border-t border-gray-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="text-base font-light text-gray-700">
                                                        ₹{project.budget.min.toLocaleString()}+
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-light">{project.budget.type}</div>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-gray-400 font-light">
                                                    <div className="flex items-center gap-1">
                                                        <HiOutlineClock size={12} />
                                                        {getTimeSince(project.createdAt)}
                                                    </div>
                                                    <div>
                                                        {project.proposalCount} proposals
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
