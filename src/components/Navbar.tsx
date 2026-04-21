import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#open-source', label: 'Open Source' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const NAV_HEIGHT = 64;
    const ACTIVATION_RATIO = 0.25;

    const update = () => {
      const viewportH = window.innerHeight;
      const availableH = viewportH - NAV_HEIGHT;
      let bestId = '';
      let bestCoverage = 0;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const visibleTop = Math.max(NAV_HEIGHT, rect.top);
        const visibleBottom = Math.min(viewportH, rect.bottom);
        const visible = Math.max(0, visibleBottom - visibleTop);
        const screenCoverage = availableH > 0 ? visible / availableH : 0;

        if (
          screenCoverage >= ACTIVATION_RATIO &&
          screenCoverage > bestCoverage
        ) {
          bestCoverage = screenCoverage;
          bestId = section.id;
        }
      }

      setActiveId(bestId);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
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
          {LINKS.map((l) => {
            const isActive = activeId === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`link-hover relative text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId='nav-active'
                      className='absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-accent'
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}
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
