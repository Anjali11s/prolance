import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <h1 className="text-xl font-light tracking-wide flex items-center">
                                <span className="text-green-600">Pro</span>
                                <span className="text-gray-700">&lt;lancer&gt;</span>
                            </h1>
                        </Link>
                        <p className="text-sm text-gray-600 mb-4">
                            Connecting talented freelancers with amazing projects worldwide.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-600 hover:text-green-600 transition">
                                <FiGithub className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-green-600 transition">
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-green-600 transition">
                                <FiLinkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-green-600 transition">
                                <FiMail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* For Clients */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-4">For Clients</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    How to Hire
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Talent Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Project Catalog
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Enterprise
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Freelancers */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-4">For Freelancers</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    How to Find Work
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Success Stories
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Resources
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            © {currentYear} Prolance. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                Help Center
                            </Link>
                            <Link to="#" className="text-sm text-gray-600 hover:text-green-600 transition">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
