import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import Particles from '../components/ui/background';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('freelancer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Basic validation
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        const result = await signup(name, email, password, role);

        if (result.success) {
            // Redirect to login page after successful signup
            navigate('/login', { state: { message: 'Account created successfully! Please login.' } });
        } else {
            setError(result.error?.message || 'Signup failed. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-white overflow-hidden">
            {/* Background Particles */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                <Particles
                    particleColors={['#b2ffc8', '#b2ffc8']}
                    particleCount={500}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* Signup Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold text-gray-800 mb-2"
                        >
                            Create Account
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-600 text-sm"
                        >
                            Join <span className="text-green-600 font-semibold">Pro&lt;lancer&gt;</span> and start your journey
                        </motion.p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 text-gray-700"
                                placeholder="John Doe"
                                disabled={isLoading}
                            />
                        </motion.div>

                        {/* Email Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 text-gray-700"
                                placeholder="your.email@example.com"
                                disabled={isLoading}
                            />
                        </motion.div>

                        {/* Password Input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 text-gray-700"
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                        </motion.div>

                        {/* Role Selection */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.65 }}
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                I want to
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-400 transition">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="freelancer"
                                        checked={role === 'freelancer'}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                                        disabled={isLoading}
                                    />
                                    <div className="ml-3">
                                        <span className="text-sm font-medium text-gray-700">Work as a Freelancer</span>
                                        <p className="text-xs text-gray-500">Find projects and earn money</p>
                                    </div>
                                </label>

                                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-400 transition">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="client"
                                        checked={role === 'client'}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                                        disabled={isLoading}
                                    />
                                    <div className="ml-3">
                                        <span className="text-sm font-medium text-gray-700">Hire as a Client</span>
                                        <p className="text-xs text-gray-500">Post projects and hire talent</p>
                                    </div>
                                </label>

                                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-400 transition">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="both"
                                        checked={role === 'both'}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                                        disabled={isLoading}
                                    />
                                    <div className="ml-3">
                                        <span className="text-sm font-medium text-gray-700">Both</span>
                                        <p className="text-xs text-gray-500">Hire talent and work on projects</p>
                                    </div>
                                </label>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Login Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-green-600 font-semibold hover:text-green-700 hover:underline transition"
                            >
                                Login
                            </Link>
                        </p>
                    </motion.div>

                    {/* Back to Home */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-center mt-4"
                    >
                        <Link
                            to="/"
                            className="text-gray-500 text-sm hover:text-gray-700 transition"
                        >
                            ← Back to Home
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
