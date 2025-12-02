import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import axios from 'axios';
import ImageUpload from '../components/ui/ImageUpload';
import MultiImageUpload from '../components/ui/MultiImageUpload';
import {
    HiOutlineCheckCircle,
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlineSave,
    HiOutlineX
} from 'react-icons/hi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function PostProject() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        budgetMin: '',
        budgetMax: '',
        budgetType: 'fixed',
        duration: '',
        skillsRequired: '',
        visibility: 'public',
        thumbnail: '',
        images: []
    });

    const categories = [
        'Programming & Tech',
        'Graphics & Design',
        'Digital Marketing',
        'Writing & Translation',
        'Video & Animation',
        'AI Services',
        'Music & Audio',
        'Business',
        'Consulting',
        'Other'
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!formData.title.trim()) {
            setError('Please enter a project title');
            setLoading(false);
            return;
        }

        if (formData.description.length < 50) {
            setError('Description must be at least 50 characters');
            setLoading(false);
            return;
        }

        if (!formData.category) {
            setError('Please select a category');
            setLoading(false);
            return;
        }

        if (!formData.budgetMin || !formData.budgetMax) {
            setError('Please enter budget range');
            setLoading(false);
            return;
        }

        if (Number(formData.budgetMin) >= Number(formData.budgetMax)) {
            setError('Maximum budget must be greater than minimum budget');
            setLoading(false);
            return;
        }

        if (!formData.duration) {
            setError('Please enter project duration');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('authToken');

            // Parse skills from comma-separated string
            const skills = formData.skillsRequired
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);

            const projectData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                budget: {
                    min: Number(formData.budgetMin),
                    max: Number(formData.budgetMax),
                    type: formData.budgetType
                },
                duration: formData.duration,
                skillsRequired: skills,
                visibility: formData.visibility,
                thumbnail: formData.thumbnail,
                images: formData.images
            };

            const response = await axios.post(
                `${API_BASE_URL}/api/projects`,
                projectData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/my-projects');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <HiOutlineCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-light text-gray-700 mb-2">Project Created!</h2>
                    <p className="text-sm text-gray-500 font-light">Redirecting to your projects...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-8 py-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-light text-gray-700">Post a Project</h1>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition"
                        >
                            <HiOutlineX size={20} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 font-light">
                        Share your project details and connect with talented freelancers
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Project Title */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-2 font-light">
                                    Project Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="e.g., Build a responsive e-commerce website"
                                    className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-2 font-light">
                                    Description *
                                    <span className="text-xs text-gray-400 ml-2">
                                        ({formData.description.length} characters)
                                    </span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Describe your project in detail. What are you trying to achieve? What skills are needed?"
                                    rows={8}
                                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light resize-none"
                                />
                                <p className="text-xs text-gray-400 mt-1 font-light">
                                    Minimum 50 characters
                                </p>
                            </div>

                            {/* Category & Duration */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2 font-light">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-600 mb-2 font-light">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => handleChange('duration', e.target.value)}
                                        placeholder="e.g., 2-3 weeks"
                                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                    />
                                </div>
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-2 font-light">
                                    Budget Range (₹) *
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        type="number"
                                        value={formData.budgetMin}
                                        onChange={(e) => handleChange('budgetMin', e.target.value)}
                                        placeholder="Min"
                                        className="px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                    />
                                    <input
                                        type="number"
                                        value={formData.budgetMax}
                                        onChange={(e) => handleChange('budgetMax', e.target.value)}
                                        placeholder="Max"
                                        className="px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                    />
                                    <select
                                        value={formData.budgetType}
                                        onChange={(e) => handleChange('budgetType', e.target.value)}
                                        className="px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                    >
                                        <option value="fixed">Fixed</option>
                                        <option value="hourly">Hourly</option>
                                    </select>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-2 font-light">
                                    Skills Required
                                </label>
                                <input
                                    type="text"
                                    value={formData.skillsRequired}
                                    onChange={(e) => handleChange('skillsRequired', e.target.value)}
                                    placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-green-600 focus:outline-none font-light"
                                />
                                <p className="text-xs text-gray-400 mt-1 font-light">
                                    Separate skills with commas
                                </p>
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-2 font-light">
                                    Project Thumbnail
                                </label>
                                <ImageUpload
                                    value={formData.thumbnail}
                                    onChange={(value) => handleChange('thumbnail', value)}
                                    label="Upload Thumbnail"
                                />
                            </div>

                            {/* Additional Images */}
                            <div>
                                <label className="block text-sm text-gray-600 mb-2 font-light">
                                    Additional Images
                                </label>
                                <MultiImageUpload
                                    values={formData.images}
                                    onChange={(value) => handleChange('images', value)}
                                    maxImages={5}
                                />
                            </div>
                        </div>

                        {/* Right Column - Settings */}
                        <div className="space-y-6">
                            {/* Visibility */}
                            <div className="border border-gray-100 rounded-lg p-5">
                                <label className="block text-sm text-gray-600 mb-3 font-light">
                                    Visibility
                                </label>
                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => handleChange('visibility', 'public')}
                                        className={`w-full flex items-center gap-3 p-3 border rounded-lg transition ${formData.visibility === 'public'
                                                ? 'border-green-600 bg-green-50/30'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <HiOutlineEye className={formData.visibility === 'public' ? 'text-green-600' : 'text-gray-400'} size={18} />
                                        <div className="flex-1 text-left">
                                            <p className={`text-sm font-light ${formData.visibility === 'public' ? 'text-green-700' : 'text-gray-700'}`}>
                                                Public
                                            </p>
                                            <p className="text-xs text-gray-400 font-light">
                                                Visible to everyone
                                            </p>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleChange('visibility', 'private')}
                                        className={`w-full flex items-center gap-3 p-3 border rounded-lg transition ${formData.visibility === 'private'
                                                ? 'border-green-600 bg-green-50/30'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <HiOutlineEyeOff className={formData.visibility === 'private' ? 'text-green-600' : 'text-gray-400'} size={18} />
                                        <div className="flex-1 text-left">
                                            <p className={`text-sm font-light ${formData.visibility === 'private' ? 'text-green-700' : 'text-gray-700'}`}>
                                                Private
                                            </p>
                                            <p className="text-xs text-gray-400 font-light">
                                                Only you can see
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Preview Card */}
                            {formData.title && (
                                <div className="border border-gray-100 rounded-lg p-5">
                                    <p className="text-xs text-gray-400 mb-3 font-light">PREVIEW</p>
                                    {formData.thumbnail && (
                                        <img
                                            src={formData.thumbnail}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-lg mb-3"
                                        />
                                    )}
                                    <h3 className="text-sm font-light text-gray-700 mb-2 line-clamp-2">
                                        {formData.title}
                                    </h3>
                                    {formData.category && (
                                        <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-md font-light mb-2">
                                            {formData.category}
                                        </span>
                                    )}
                                    {formData.budgetMin && formData.budgetMax && (
                                        <p className="text-sm text-gray-600 font-light">
                                            ₹{Number(formData.budgetMin).toLocaleString()} - ₹{Number(formData.budgetMax).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600 font-light">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-light"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-light flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <HiOutlineSave size={16} />
                                    Publish Project
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
