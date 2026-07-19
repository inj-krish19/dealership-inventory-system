import { useEffect, useState } from 'react';
import type { SubmitEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiEdit2, FiPlus, FiPackage, FiX, FiBox } from 'react-icons/fi';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle, restockVehicle } from '../services/vehicleService';
import type { Vehicle } from '../types';

const emptyForm = { make: '', model: '', category: '', price: '', quantity: '' };

export default function AdminPanel() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [restockInputs, setRestockInputs] = useState<Record<string, string>>({});
    const [error, setError] = useState('');
    const [toast, setToast] = useState('');

    async function load() {
        setLoading(true);
        try {
            setVehicles(await getVehicles());
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { load(); }, []);

    function flashToast(msg: string) {
        setToast(msg);
        setTimeout(() => setToast(''), 2000);
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setError('');
        const payload = {
            make: form.make, model: form.model, category: form.category,
            price: Number(form.price), quantity: Number(form.quantity),
        };
        try {
            if (editingId) {
                const updated = await updateVehicle(editingId, payload);
                setVehicles((prev) => prev.map((v) => (v.id === editingId ? updated : v)));
                flashToast('Vehicle updated');
            } else {
                const created = await createVehicle(payload);
                setVehicles((prev) => [created, ...prev]);
                flashToast('Vehicle added');
            }
            setForm(emptyForm);
            setEditingId(null);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Save failed');
        }
    }

    function startEdit(v: Vehicle) {
        setEditingId(v.id);
        setForm({ make: v.make, model: v.model, category: v.category, price: String(v.price), quantity: String(v.quantity) });
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
        setError('');
    }

    async function handleDelete(id: string) {
        await deleteVehicle(id);
        setVehicles((prev) => prev.filter((v) => v.id !== id));
        flashToast('Vehicle deleted');
    }

    async function handleRestock(id: string) {
        const qty = Number(restockInputs[id]);
        if (!qty || qty <= 0) return;
        const updated = await restockVehicle(id, qty);
        setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)));
        setRestockInputs((prev) => ({ ...prev, [id]: '' }));
        flashToast('Stock updated');
    }

    const totalUnits = vehicles.reduce((sum, v) => sum + v.quantity, 0);
    const outOfStockCount = vehicles.filter((v) => v.quantity === 0).length;

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="font-display text-3xl font-semibold text-text">Admin Panel</h1>
                <p className="text-text-muted text-sm mt-1">Manage inventory, pricing, and stock levels</p>
            </motion.div>

            {/* Stats strip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="grid grid-cols-3 gap-4 mb-8"
            >
                {[
                    { label: 'Total Models', value: vehicles.length },
                    { label: 'Units in Stock', value: totalUnits },
                    { label: 'Out of Stock', value: outOfStockCount },
                ].map((stat) => (
                    <div key={stat.label} className="bg-surface-alt border border-border rounded-xl p-4">
                        <p className="text-2xl font-semibold text-text font-display">{stat.value}</p>
                        <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* Add/Edit form */}
            <motion.form
                onSubmit={handleSubmit}
                layout
                className="bg-surface-alt border border-border rounded-2xl p-5 mb-8"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium text-text-muted flex items-center gap-2">
                        <FiBox size={14} /> {editingId ? 'Edit vehicle' : 'Add a new vehicle'}
                    </h2>
                    {editingId && (
                        <button type="button" onClick={cancelEdit} className="text-xs text-text-muted hover:text-text flex items-center gap-1">
                            <FiX size={12} /> Cancel
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(['make', 'model', 'category', 'price', 'quantity'] as const).map((field) => (
                        <input
                            key={field} placeholder={field[0].toUpperCase() + field.slice(1)}
                            type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                            value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required
                            className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                        />
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                        className="flex items-center justify-center gap-2 bg-accent text-surface rounded-lg py-2 text-sm font-medium"
                    >
                        <FiPlus size={14} /> {editingId ? 'Update Vehicle' : 'Add Vehicle'}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-sm mt-3 overflow-hidden"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.form>

            {/* Inventory list */}
            {loading ? (
                <p className="text-text-muted text-sm">Loading inventory...</p>
            ) : vehicles.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border rounded-2xl">
                    <p className="text-text-muted text-sm">No vehicles yet — add your first one above.</p>
                </div>
            ) : (
                <motion.div layout className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {vehicles.map((v) => (
                            <motion.div
                                key={v.id} layout
                                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                                className="bg-surface-alt border border-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 hover:border-accent/40 transition-colors"
                            >
                                <div>
                                    <p className="font-medium text-text">{v.make} {v.model}</p>
                                    <p className="text-xs text-text-muted">
                                        {v.category} · ${v.price.toLocaleString()} ·{' '}
                                        <span className={v.quantity === 0 ? 'text-red-500' : 'text-text-muted'}>
                                            Qty: {v.quantity}{v.quantity === 0 && ' (out of stock)'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number" placeholder="Qty" min={1} value={restockInputs[v.id] || ''}
                                        onChange={(e) => setRestockInputs((prev) => ({ ...prev, [v.id]: e.target.value }))}
                                        className="w-16 bg-surface border border-border rounded-lg px-2 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/40"
                                    />
                                    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                        onClick={() => handleRestock(v.id)}
                                        className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors" title="Restock">
                                        <FiPackage size={15} />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                        onClick={() => startEdit(v)}
                                        className="p-2 rounded-lg bg-surface border border-border text-text hover:border-accent transition-colors" title="Edit">
                                        <FiEdit2 size={15} />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                                        onClick={() => handleDelete(v.id)}
                                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors" title="Delete">
                                        <FiTrash2 size={15} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-6 right-6 bg-accent text-surface px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium"
                    >
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}