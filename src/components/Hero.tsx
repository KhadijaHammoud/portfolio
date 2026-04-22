import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import React from 'react';
import { PROFILE } from '../constants/portfolio.constants';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const Hero: React.FC = () => {
  return (
    <section
      id='top'
      className='relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-accent/20 blur-[140px] opacity-60' />
        <div className='absolute inset-0 bg-grid-faint bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]' />
      </div>

      <div className='container-page'>
        <motion.div
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={0}
          className='inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/[0.03] px-3 py-1.5 text-sm text-ink-muted'
        >
          <MapPin className='h-3.5 w-3.5 text-accent' />
          {PROFILE.location}
        </motion.div>

        <motion.h1
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={1}
          className='mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-7xl'
        >
          Hi, I'm {PROFILE.name.split(' ')[0]}.
          <br />
          <span className='bg-gradient-to-r from-ink via-ink to-ink-muted bg-clip-text text-transparent'>
            I build{' '}
          </span>
          <span className='bg-gradient-to-r from-accent-soft via-accent to-accent-glow bg-clip-text text-transparent'>
            fast, thoughtful
          </span>
          <span className='bg-gradient-to-r from-ink via-ink to-ink-muted bg-clip-text text-transparent'>
            {' '}
            web products.
          </span>
        </motion.h1>

        <motion.p
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={2}
          className='mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted'
        >
          {PROFILE.tagline} Currently a founding engineer at{' '}
          <span className='text-ink'>FullyRamped</span>, previously founding
          engineer at <span className='text-ink'>Skiff</span> (acquired by
          Notion).
        </motion.p>

        <motion.div
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={3}
          className='mt-10 flex flex-wrap items-center gap-3'
        >
          <a
            href='#contact'
            className='group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-glow transition-all hover:bg-accent-soft'
          >
            Get in touch
            <ArrowUpRight className='h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
          </a>
          <a
            href='#experience'
            className='inline-flex items-center gap-2 rounded-full border border-line/10 bg-line/[0.03] px-5 py-3 text-sm font-medium text-ink transition-all hover:border-line/30'
          >
            View experience
          </a>

          <div className='ml-0 mt-4 flex items-center gap-2 sm:ml-2 sm:mt-0'>
            <IconLink
              href={PROFILE.github}
              label='GitHub'
              icon={<Github className='h-4 w-4' />}
            />
            <IconLink
              href={PROFILE.linkedin}
              label='LinkedIn'
              icon={<Linkedin className='h-4 w-4' />}
            />
            <IconLink
              href={`mailto:${PROFILE.email}`}
              label='Email'
              icon={<Mail className='h-4 w-4' />}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className='mt-20 flex flex-col gap-px overflow-hidden rounded-2xl border border-line/5 bg-line/[0.04] sm:flex-row'
        >
          <Stat label='Years of experience' value='5+' />
          <Stat label='Zero-to-one products' value='5' />
          <Stat label='Open-source stars' value='420+' />
        </motion.div>
      </div>
    </section>
  );
};

const IconLink: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
}> = ({ href, label, icon }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel='noreferrer'
    aria-label={label}
    className='grid h-10 w-10 place-items-center rounded-full border border-line/10 bg-line/[0.03] text-ink-muted transition-all hover:border-accent/60 hover:text-ink'
  >
    {icon}
  </a>
);

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className='flex-1 bg-bg-soft/70 px-5 py-6'>
    <div className='font-mono text-2xl font-semibold text-ink md:text-3xl'>
      {value}
    </div>
    <div className='mt-1 text-xs uppercase tracking-wider text-ink-muted'>
      {label}
    </div>
  </div>
);
