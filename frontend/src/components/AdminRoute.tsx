import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function AdminRoute() {
    const user = useAuthStore((s) => s.user);
    if (!user) return <Navigate to="/login" replace />;
    return user.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
}