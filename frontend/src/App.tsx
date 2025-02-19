import { useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, ListChecks, Info, LogIn, UserPlus } from "lucide-react";
import MainRoutes from './routes/Mainroutes'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAPI } from './Redux/Auth/action';
import { AppDispatch } from './Redux/store';

function App() {

  const { token } = useSelector((store) => store.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const logoutHandle = () => {
    dispatch(logoutAPI())
  }

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`bg-gray-900 text-white w-64 p-4 space-y-4 fixed h-full transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
            } md:relative md:translate-x-0`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Task App</h2>
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-2">
            <Link to="/" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/tasks" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <ListChecks size={20} />
              <span>Tasks</span>
            </Link>
            <Link to='/login' onClick={logoutHandle} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <LogIn size={20} />
              <span>{token.length > 0 ? 'Logout' : 'Login'}</span>
            </Link>
            {!token && <Link to="/signup" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <UserPlus size={20} />
              <span>Signup</span>
            </Link>}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 ml-0 md:ml-64">
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden mb-4 p-2 border rounded bg-gray-200"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <MainRoutes />
        </main>
      </div>
    </>
  );
}

export default App
