import { SiGithub } from '@icons-pack/react-simple-icons';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import React from 'react';
import { OPEN_SOURCE } from '../constants/portfolio.constants';
import { Section } from './Section';

export const OpenSource: React.FC = () => {
  return (
    <Section
      eyebrow='Open Source'
      title={<>Contributing back to the community.</>}
      description='A closer look at the open-source work I’m most proud of.'
      id='open-source'
    >
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
        className='card relative overflow-hidden p-6 md:p-10'
      >
        <div
          aria-hidden
          className='pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl'
        />

        <div className='relative flex flex-wrap items-start justify-between gap-6'>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2 text-sm text-ink-muted'>
              <SiGithub className='h-4 w-4' color='currentColor' />
              <span>Open-Source Contribution · {OPEN_SOURCE.organization}</span>
            </div>
            <h3 className='mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl'>
              {OPEN_SOURCE.name}
            </h3>
            <p className='mt-1 text-base text-ink-muted'>{OPEN_SOURCE.tagline}</p>
          </div>

          <a
            href={OPEN_SOURCE.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-ink transition-all hover:border-accent/70 hover:bg-accent/20'
          >
            <Star className='h-4 w-4 text-accent' />
            <span>{OPEN_SOURCE.stars} stars</span>
            <span className='h-3 w-px bg-line/20' />
            <span>View on GitHub</span>
            <ArrowUpRight className='h-4 w-4' />
          </a>
        </div>

        <p className='relative mt-6 max-w-3xl text-base leading-relaxed text-ink-muted'>
          {OPEN_SOURCE.summary}
        </p>

        <ul className='relative mt-6 space-y-2.5'>
          {OPEN_SOURCE.highlights.map((h) => (
            <li
              key={h}
              className='relative pl-5 text-base leading-relaxed text-ink-muted'
            >
              <span className='absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent/60' />
              {h}
            </li>
          ))}
        </ul>

        <div className='relative mt-6 flex flex-wrap gap-2'>
          {OPEN_SOURCE.stack.map((s) => (
            <span key={s} className='chip'>
              {s}
            </span>
          ))}
        </div>
      </motion.article>
    </Section>
  );
};
