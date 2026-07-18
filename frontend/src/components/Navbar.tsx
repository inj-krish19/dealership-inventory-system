import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/dashboard" className="font-bold text-lg">AutoLot</Link>
            <div className="flex items-center gap-4">
                {isAuthenticated && user?.role === 'admin' && (
                    <Link to="/admin" className="text-sm hover:underline">Admin Panel</Link>
                )}
                {isAuthenticated ? (
                    <>
                        <span className="text-sm text-slate-300">{user?.name}</span>
                        <button onClick={handleLogout} className="text-sm bg-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-600">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="text-sm hover:underline">Login</Link>
                )}
            </div>
        </nav>
    );
}