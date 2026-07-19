import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiSearch, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

const features = [
    { icon: FiSearch, title: 'Smart Search', desc: 'Filter by make, model, category, or price in real time.' },
    { icon: FiShield, title: 'Role-Based Access', desc: 'Secure JWT authentication with admin-gated inventory control.' },
    { icon: FiTrendingUp, title: 'Live Inventory', desc: 'Stock levels update instantly on every purchase and restock.' },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};
const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Home() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative min-h-[calc(100vh-73px)] flex items-center justify-center px-6">
                <motion.div
                    aria-hidden
                    animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl -z-10"
                />

                <motion.div
                    initial="hidden" animate="show" variants={container}
                    className="max-w-3xl text-center"
                >
                    <motion.p variants={{ item }} className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
                        Premium Car Dealership Inventory
                    </motion.p>
                    <motion.h1 variants={{ item }} className="font-display text-5xl sm:text-6xl font-bold text-text leading-tight mb-6">
                        Find your next drive at <span className="text-accent">AutoLot</span>
                    </motion.h1>
                    <motion.p variants={{ item }} className="text-text-muted text-lg max-w-xl mx-auto mb-10">
                        A full-stack inventory system built for real dealerships — search, purchase,
                        and manage vehicles with role-based precision and a JWT-secured backend.
                    </motion.p>
                    <motion.div variants={{ item }} className="flex flex-wrap gap-4 justify-center">
                        <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                            <motion.span
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 bg-accent text-surface px-6 py-3 rounded-full font-medium"
                            >
                                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'} <FiArrowRight size={16} />
                            </motion.span>
                        </Link>
                        {!isAuthenticated && (
                            <Link to="/login">
                                <motion.span
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-2 border border-border text-text px-6 py-3 rounded-full font-medium hover:border-accent transition-colors"
                                >
                                    Sign In
                                </motion.span>
                            </Link>
                        )}
                    </motion.div>
                </motion.div>
            </section>

            {/* Features */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={container}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                    {features.map(({ icon: Icon, title, desc }) => (
                        <motion.div
                            key={title} variants={{ item }}
                            className="bg-surface-alt border border-border rounded-2xl p-6"
                        >
                            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                                <Icon size={18} />
                            </div>
                            <h3 className="font-display text-lg font-semibold text-text mb-2">{title}</h3>
                            <p className="text-sm text-text-muted">{desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* About strip */}
            <motion.section
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="border-t border-border bg-surface-alt px-6 py-14 text-center"
            >
                <p className="text-text-muted max-w-2xl mx-auto text-sm leading-relaxed">
                    AutoLot is a TDD-driven, full-stack MERN + TypeScript application — built with
                    Express, MongoDB, and JWT on the backend, and React, Zustand, and Tailwind on the
                    frontend. Every layer follows SOLID principles, from repository interfaces to
                    role-gated routes.
                </p>
            </motion.section>
        </div>
    );
}