import { FiSearch } from 'react-icons/fi';
import type { SearchParams } from '../services/vehicleService';

interface Props {
    filters: SearchParams;
    onChange: (filters: SearchParams) => void;
    onSubmit: () => void;
}

export default function SearchBar({ filters, onChange, onSubmit }: Props) {
    return (
        <form
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            className="bg-surface-alt border border-border rounded-2xl p-4 flex flex-wrap gap-3 items-end mb-6"
        >
            <div className="flex-1 min-w-[140px]">
                <label className="block text-xs text-text-muted mb-1">Make</label>
                <input value={filters.make || ''} onChange={(e) => onChange({ ...filters, make: e.target.value })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div className="flex-1 min-w-[140px]">
                <label className="block text-xs text-text-muted mb-1">Model</label>
                <input value={filters.model || ''} onChange={(e) => onChange({ ...filters, model: e.target.value })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div className="flex-1 min-w-[140px]">
                <label className="block text-xs text-text-muted mb-1">Category</label>
                <input value={filters.category || ''} onChange={(e) => onChange({ ...filters, category: e.target.value })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div className="w-24">
                <label className="block text-xs text-text-muted mb-1">Min $</label>
                <input type="number" value={filters.minPrice ?? ''} onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div className="w-24">
                <label className="block text-xs text-text-muted mb-1">Max $</label>
                <input type="number" value={filters.maxPrice ?? ''} onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <button type="submit" className="flex items-center gap-2 bg-accent text-surface rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors">
                <FiSearch size={14} /> Search
            </button>
        </form>
    );
}