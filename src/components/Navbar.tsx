import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#open-source', label: 'Open Source' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line/5 bg-bg/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-bg/40 backdrop-blur-md'
      }`}
    >
      <nav className='container-page flex h-16 items-center justify-between'>
        <a
          href='#top'
          className='flex items-center gap-2 text-sm font-semibold tracking-tight text-ink'
        >
          <img
            src='/photo.png'
            alt='Khadija Hammoud'
            className='h-8 w-8 rounded-full object-cover ring-1 ring-line/10 ring-offset-2 ring-offset-bg'
          />
          <span className='hidden sm:block'>Khadija Hammoud</span>
        </a>

        <ul className='hidden items-center gap-8 md:flex'>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className='link-hover text-sm text-ink-muted transition-colors hover:text-ink'
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-2 sm:gap-3'>
          <ThemeToggle />
          <a
            href='#contact'
            className='group hidden items-center gap-2 rounded-full border border-line/10 bg-line/[0.03] px-4 py-2 text-sm font-medium text-ink transition-all hover:border-accent/60 hover:bg-accent/10 sm:inline-flex'
          >
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
            </span>
            Available for work
          </a>
        </div>
      </nav>
    </motion.header>
  );
};
