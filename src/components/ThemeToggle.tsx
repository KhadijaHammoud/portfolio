import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme';
import { IconButton } from './shared';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

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
            {isDark ? (
              <Moon className='h-4 w-4' strokeWidth={1.75} />
            ) : (
              <Sun className='h-4 w-4' strokeWidth={1.75} />
            )}
          </motion.span>
        </AnimatePresence>
      }
      onClick={toggleTheme}
      label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    />
  );
};

export default ThemeToggle;
