import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-surface px-4">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-surface-alt border border-border p-8 rounded-2xl shadow-xl w-full max-w-sm"
            >
                <h1 className="font-display text-2xl font-semibold mb-1 text-text">Welcome back</h1>
                <p className="text-sm text-text-muted mb-6">Sign in to your AutoLot account</p>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-sm mb-4 overflow-hidden"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1">Email</label>
                <input
                    id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 mb-4 text-text focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                />

                <label htmlFor="password" className="block text-sm font-medium text-text-muted mb-1">Password</label>
                <input
                    id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 mb-6 text-text focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                />

                <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-accent text-surface rounded-lg py-2.5 font-medium disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </motion.button>

                <p className="text-sm text-text-muted mt-5 text-center">
                    No account? <Link to="/register" className="text-accent font-medium hover:underline">Register</Link>
                </p>
            </motion.form>
        </div>
    );
}