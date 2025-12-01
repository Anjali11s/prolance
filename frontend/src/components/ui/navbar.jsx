import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import {
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlinePlusCircle,
  HiOutlineFolderOpen,
  HiOutlineChatAlt2,
  HiOutlineQuestionMarkCircle,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineCog
} from "react-icons/hi";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`${API_URL}/api/settings`, {
            headers: { Authorization: token }
          });
          setUserProfile(response.data.settings);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="sticky top-0 w-full px-8 py-3 flex items-center justify-between bg-white border-b border-gray-100 z-50 rounded-full outline-1 outline-gray-100 ">

      {/* LEFT: LOGO */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <h1 className="text-xl font-light tracking-wide flex items-center">
          <span className="text-green-600">Pro</span>
          <span className="text-gray-700">&lt;lancer&gt;</span>
        </h1>
      </Link>

      {/* CENTER MENU */}
      <div className="flex items-center gap-8 text-gray-600 text-sm font-light">

        {/* HOME */}
        <Link
          to="/"
          className="flex items-center gap-1.5 hover:text-green-600 transition cursor-pointer"
        >
          <HiOutlineHome size={16} />
          <span>Home</span>
        </Link>

        {/* EXPLORE */}
        <Link
          to="/projects"
          className="flex items-center gap-1.5 hover:text-green-600 transition cursor-pointer"
        >
          <HiOutlineSearch size={16} />
          <span>Explore</span>
        </Link>

        {/* POST PROJECT - Only show when authenticated */}
        {isAuthenticated && (
          <Link
            to="/post-project"
            className="flex items-center gap-1.5 hover:text-green-600 transition cursor-pointer"
          >
            <HiOutlinePlusCircle size={16} />
            <span>Post Project</span>
          </Link>
        )}

        {/* MY PROJECTS - Only show when authenticated */}
        {isAuthenticated && (
          <Link
            to="/my-projects"
            className="flex items-center gap-1.5 hover:text-green-600 transition cursor-pointer"
          >
            <HiOutlineFolderOpen size={16} />
            <span>My Projects</span>
          </Link>
        )}

        {/* MESSAGES - Only show when authenticated */}
        {isAuthenticated && (
          <Link
            to="/messages"
            className="flex items-center gap-1.5 hover:text-green-600 transition cursor-pointer"
          >
            <HiOutlineChatAlt2 size={16} />
            <span>Messages</span>
          </Link>
        )}

        {/* SUPPORT */}
        <Link
          to="/support"
          className="flex items-center gap-1.5 hover:text-green-600 transition cursor-pointer"
        >
          <HiOutlineQuestionMarkCircle size={16} />
          <span>Support</span>
        </Link>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button
              className="relative text-gray-600 hover:text-green-600 transition cursor-pointer"
              title="Notifications"
            >
              <HiOutlineBell size={18} />
              {/* Notification badge - uncomment when you have notifications */}
              {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full"></span> */}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition cursor-pointer"
              >
                {userProfile?.profile?.avatar ? (
                  <img
                    src={userProfile.profile.avatar}
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 border border-gray-200">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-light">{user?.name?.split(' ')[0]}</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-sm py-2 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition"
                  >
                    <HiOutlineUser size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition"
                  >
                    <HiOutlineCog size={16} />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition"
                  >
                    <HiOutlineLogout size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-600 transition cursor-pointer"
          >
            <HiOutlineLogin size={16} />
            <span>Login</span>
          </Link>
        )}
      </div>

    </nav>
  );
}
