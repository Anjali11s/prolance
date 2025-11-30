import { FaGithub, FaTwitter } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { LuChevronDown } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="w-full px-8 py-2 flex items-center justify-between bg-white relative z-50">

        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-xl font-light tracking-wide flex items-center">
            <span className="text-green-600">Pro</span>
            <span className="text-gray-700">&lt;lancer&gt;</span>
          </h1>
        </Link>

        {/* CENTER MENU */}
        <div className="flex items-center gap-10 text-gray-600 text-sm font-light">

          {/* HOME */}
          <Link to="/" className="hover:text-green-600 cursor-pointer transition">Home</Link>

          {/* PROJECTS DROPDOWN */}
          <div className="relative group">
            <button className="hover:text-green-600 cursor-pointer flex items-center gap-1 transition">
              Projects <LuChevronDown size={12} />
            </button>
            <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white border border-green-100 shadow-sm rounded-lg text-gray-700 text-sm font-light w-40 py-2">
              <Link to="/projects" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Browse Projects</Link>
              <Link to="/projects?sort=rating" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Top Rated</Link>
              <Link to="/projects?sort=new" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">New Projects</Link>
            </div>
          </div>

          {/* FIND WORK DROPDOWN */}
          <div className="relative group">
            <button className="hover:text-green-600 cursor-pointer flex items-center gap-1 transition">
              Find Work <LuChevronDown size={12} />
            </button>
            <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white border border-green-100 shadow-sm rounded-lg text-gray-700 text-sm font-light w-40 py-2">
              <Link to="/projects" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Browse Jobs</Link>
              <Link to="/projects?category=Programming%20%26%20Tech" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Tech Jobs</Link>
              <Link to="/projects?category=Graphics%20%26%20Design" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Design Jobs</Link>
            </div>
          </div>

          {/* HIRE FREELANCE DROPDOWN */}
          <div className="relative group">
            <button className="hover:text-green-600 cursor-pointer flex items-center gap-1 transition">
              Hire Freelance <LuChevronDown size={12} />
            </button>
            <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white border border-green-100 shadow-sm rounded-lg text-gray-700 text-sm font-light w-44 py-2">
              <Link to="/freelancers" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Find Freelancers</Link>
              <Link to="/freelancers?skill=JavaScript" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Developers</Link>
              <Link to="/freelancers?skill=UI/UX%20Design" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 cursor-pointer">Designers</Link>
            </div>
          </div>

          {/* ABOUT */}
          <Link to="/about" className="hover:text-green-600 transition cursor-pointer">About</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-md text-gray-700">
            <FaGithub className="hover:text-green-600 cursor-pointer transition" />
            <FaTwitter className="hover:text-green-600 cursor-pointer transition" />
          </div>

          {/* Auth-aware buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-sm text-gray-700 hover:text-green-600 transition cursor-pointer font-medium"
              >
                {user?.name}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-600 transition cursor-pointer"
              >
                <CiLogin className="text-lg rotate-180" /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-600 transition cursor-pointer"
            >
              <CiLogin className="text-lg" /> Login
            </Link>
          )}
        </div>

      </nav>

      {/* ANNOUNCEMENT BAR */}
      <div className="mt-5 w-full">
        <div className="flex justify-between items-center rounded-xl px-6 py-3 bg-gradient-to-r from-green-50 to-green-100 text-gray-700 text-sm border border-green-200 shadow-sm">
          <p className="font-light">New to Prolance? Enjoy exclusive benefits when you sign up today</p>
          <button className="text-green-700 font-medium hover:text-green-800 transition cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
}
