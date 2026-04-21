import React from 'react';
import { PROFILE } from '../data/portfolio';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='border-t border-line/5 py-10'>
      <div className='container-page flex flex-col items-center justify-between gap-3 text-sm text-ink-muted md:flex-row'>
        <span>
          © {year} {PROFILE.name}. Built with React, TypeScript & Tailwind.
        </span>
        <span className='font-mono'>Designed &amp; built in Cairo.</span>
      </div>
    </footer>
  );
};
