/**
 * AppLayout Component
 * Layout wrapper for authenticated screens with sidebar navigation
 */

import { ReactNode, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Brain, Sparkles, Trophy, User, MessageCircle, Menu, X } from 'lucide-react';
import { NavIcon } from './nav-icon';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useAuth } from '../../hooks/useAuth';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const { user, logout } = useAuth();

  // Determine if user is a kid (could be based on user data or route)
  const isKid = location.pathname.startsWith('/kid') || !location.pathname.startsWith('/parent');

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate('/');
    setSidebarOpen(false);
  }, [logout, navigate]);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    setSidebarOpen(false);
  }, [navigate]);

  // Navigation items for kids
  const kidNavItems = [
    { path: '/kid-dashboard', label: 'Home', icon: <Home className="w-6 h-6" /> },
    { path: '/modules', label: 'Learn', icon: <Brain className="w-6 h-6" /> },
    { path: '/ai-lab', label: 'Lab', icon: <Sparkles className="w-6 h-6" /> },
    { path: '/projects', label: 'Projects', icon: <Trophy className="w-6 h-6" /> },
    { path: '/profile', label: 'Profile', icon: <User className="w-6 h-6" /> },
    { path: '/contact', label: 'Help', icon: <MessageCircle className="w-6 h-6" /> },
  ];

  // Navigation items for parents
  const parentNavItems = [
    { path: '/parent-dashboard', label: 'Dashboard', icon: <Home className="w-6 h-6" /> },
    { path: '/contact', label: 'Support', icon: <MessageCircle className="w-6 h-6" /> },
  ];

  const navItems = isKid ? kidNavItems : parentNavItems;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 rounded-2xl bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-purple-600 transition-all hover:shadow-lg"
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && !isLargeScreen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSidebar}
            aria-label="Close sidebar"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen || isLargeScreen ? 0 : -300
        }}
        className="fixed lg:relative z-40 h-full w-24 bg-white border-r border-gray-200 shadow-lg flex flex-col items-center py-8 gap-6"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <motion.button
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white text-2xl shadow-[0_8px_20px_rgba(124,58,237,0.3)] cursor-pointer transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigate(isKid ? '/kid-dashboard' : '/parent-dashboard')}
          aria-label="Go to dashboard"
        >
          🧠
        </motion.button>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-3" role="menu">
          {navItems.map((item) => (
            <NavIcon
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            />
          ))}
        </nav>

        {/* Logout */}
        <motion.button
          className="w-14 h-14 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          aria-label="Logout"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-0" role="main">
        {children}
      </main>
    </div>
  );
}

