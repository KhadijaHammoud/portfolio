import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme';
import { IconButton } from './shared';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const ThemeIcon = isDark ? Moon : Sun;

  return (
    <IconButton
      icon={
        <AnimatePresence initial={false} mode='wait'>
          <motion.span
            key={theme}
            initial={{ y: -12, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 12, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ThemeIcon className='h-4 w-4' strokeWidth={1.75} />
          </motion.span>
        </AnimatePresence>
      }
      onClick={toggleTheme}
      label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    />
  );
};

export default ThemeToggle;
