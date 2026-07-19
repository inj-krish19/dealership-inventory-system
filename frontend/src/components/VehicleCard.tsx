import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import type { Vehicle } from '../types';

interface Props {
    vehicle: Vehicle;
    onPurchase: (id: string) => void;
    purchasing: boolean;
}

export default function VehicleCard({ vehicle, onPurchase, purchasing }: Props) {
    const outOfStock = vehicle.quantity === 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-surface-alt border border-border rounded-2xl p-5 flex flex-col gap-3"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-display text-lg font-semibold text-text">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-sm text-text-muted">{vehicle.category}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${outOfStock ? 'bg-red-500/10 text-red-500' : 'bg-accent/10 text-accent'}`}>
                    {outOfStock ? 'Out of stock' : `${vehicle.quantity} in stock`}
                </span>
            </div>

            <p className="text-2xl font-semibold text-text">${vehicle.price.toLocaleString()}</p>

            <motion.button
                onClick={() => onPurchase(vehicle.id)}
                disabled={outOfStock || purchasing}
                whileHover={{ scale: outOfStock ? 1 : 1.02 }}
                whileTap={{ scale: outOfStock ? 1 : 0.98 }}
                className="mt-2 flex items-center justify-center gap-2 bg-accent text-surface rounded-lg py-2.5 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <FiShoppingCart size={15} />
                {purchasing ? 'Purchasing...' : outOfStock ? 'Unavailable' : 'Purchase'}
            </motion.button>
        </motion.div>
    );
}