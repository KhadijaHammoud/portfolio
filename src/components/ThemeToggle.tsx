import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className='relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line/10 bg-line/[0.03] text-ink-muted transition-colors hover:border-accent/60 hover:text-ink'
    >
      <AnimatePresence initial={false} mode='wait'>
        <motion.span
          key={theme}
          initial={{ y: -12, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='absolute inset-0 grid place-items-center'
        >
          {isDark ? (
            <Moon className='h-4 w-4' strokeWidth={1.75} />
          ) : (
            <Sun className='h-4 w-4' strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
