import { PROFILE } from '../constants';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='border-t border-line/5 py-10'>
      <div className='container-page flex flex-col justify-between gap-3 text-sm text-ink-muted md:flex-row md:items-center'>
        <span>
          © {year} {PROFILE.firstName} {PROFILE.lastName}. Built with React,
          TypeScript & Tailwind.
        </span>
        <span className='font-mono text-ink-faint'>Aligned with care.</span>
      </div>
    </footer>
  );
};

export default Footer;
