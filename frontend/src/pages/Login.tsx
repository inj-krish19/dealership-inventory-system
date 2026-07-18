import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { user, token } = await loginUser(email, password);
            login(user, token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-slate-800">Sign in to AutoLot</h1>
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                    type="submit" disabled={loading}
                    className="w-full bg-slate-800 text-white rounded-lg py-2 font-medium hover:bg-slate-700 disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                <p className="text-sm text-slate-500 mt-4 text-center">
                    No account? <Link to="/register" className="text-slate-800 font-medium">Register</Link>
                </p>
            </form>
        </div>
    );
}