import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getVehicles, searchVehicles, purchaseVehicle, type SearchParams } from '../services/vehicleService';
import type { Vehicle } from '../types';
import VehicleCard from '../components/VehicleCard';
import SearchBar from '../components/SearchBar';

export default function Dashboard() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filters, setFilters] = useState<SearchParams>({});
    const [loading, setLoading] = useState(true);
    const [purchasingId, setPurchasingId] = useState<string | null>(null);
    const [toast, setToast] = useState('');

    async function loadAll() {
        setLoading(true);
        try {
            setVehicles(await getVehicles());
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch() {
        setLoading(true);
        try {
            const hasFilters = Object.values(filters).some((v) => v !== undefined && v !== '');
            setVehicles(hasFilters ? await searchVehicles(filters) : await getVehicles());
        } finally {
            setLoading(false);
        }
    }

    async function handlePurchase(id: string) {
        setPurchasingId(id);
        try {
            const updated = await purchaseVehicle(id, 1);
            setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)));
            setToast('Purchase successful');
            setTimeout(() => setToast(''), 2000);
        } catch (err: any) {
            setToast(err.response?.data?.message || 'Purchase failed');
            setTimeout(() => setToast(''), 2500);
        } finally {
            setPurchasingId(null);
        }
    }

    useEffect(() => { loadAll(); }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="font-display text-3xl font-semibold text-text">Inventory</h1>
                <p className="text-text-muted text-sm mt-1">Browse available vehicles in the AutoLot catalog</p>
            </motion.div>

            <SearchBar filters={filters} onChange={setFilters} onSubmit={handleSearch} />

            {loading ? (
                <p className="text-text-muted text-sm">Loading vehicles...</p>
            ) : vehicles.length === 0 ? (
                <p className="text-text-muted text-sm">No vehicles match your search.</p>
            ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {vehicles.map((v) => (
                            <VehicleCard key={v.id} vehicle={v} onPurchase={handlePurchase} purchasing={purchasingId === v.id} />
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