import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import BrowseProjects from './pages/BrowseProjects'
import FindFreelancers from './pages/FindFreelancers'
import PostProject from './pages/PostProject'
import MyProjects from './pages/MyProjects'
import ProjectDetail from './pages/ProjectDetail'
import UserProfile from './pages/UserProfile'
import Support from './pages/Support'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Navbar from './components/ui/navbar'
import './App.css'

function App() {
  return (
    <>
      <div className='overflow-x-hidden'>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />
          <Route path="/projects" element={<BrowseProjects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/freelancers" element={<FindFreelancers />} />
          <Route
            path="/post-project"
            element={
              <ProtectedRoute>
                <PostProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-projects"
            element={
              <ProtectedRoute>
                <MyProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
