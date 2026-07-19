import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center"
        >
            <Link to="/dashboard" className="font-display text-xl font-semibold tracking-tight text-text">
                Auto<span className="text-accent">Lot</span>
            </Link>

            <div className="flex items-center gap-4">
                {isAuthenticated && user?.role === 'admin' && (
                    <Link to="/admin" className="text-sm text-text-muted hover:text-text transition-colors">
                        Admin Panel
                    </Link>
                )}
                <ThemeToggle />
                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-text-muted hidden sm:inline">{user?.name}</span>
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-1.5 text-sm bg-surface-alt border border-border px-3 py-1.5 rounded-full text-text hover:border-accent transition-colors"
                        >
                            <FiLogOut size={14} /> Logout
                        </motion.button>
                    </div>
                ) : (
                    <Link to="/login" className="text-sm text-text-muted hover:text-text transition-colors">
                        Login
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}