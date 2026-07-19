import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-alt border border-border text-text"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
        </motion.button>
    );
}