import { motion } from 'framer-motion';
import React from 'react';
import { experiences } from '../data/portfolio';
import { Section } from './Section';

export const Experience: React.FC = () => {
  return (
    <Section
      id='experience'
      eyebrow='Experience'
      title={<>Places I've helped build.</>}
      description="Zero-to-one products, end-to-end encrypted suites, blockchain-backed platforms — a few of the teams and problems I've worked on over the years."
    >
      <ol className='relative space-y-10 border-l border-white/5 pl-6 md:pl-10'>
        {experiences.map((exp, i) => (
          <motion.li
            key={exp.company + exp.start}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
            className='group relative'
          >
            <span className='absolute -left-[34px] top-2 grid h-3.5 w-3.5 place-items-center md:-left-[46px]'>
              <span className='absolute h-3.5 w-3.5 rounded-full bg-accent/20' />
              <span className='h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_2px_rgba(124,92,255,0.65)]' />
            </span>

            <div className='card p-6 transition-colors hover:border-white/10 md:p-8'>
              <div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
                <h3 className='text-lg font-semibold text-ink md:text-xl'>
                  {exp.role}{' '}
                  <span className='text-ink-muted'>· {exp.company}</span>
                </h3>
                <span className='font-mono text-xs text-ink-faint'>
                  {exp.start} — {exp.end}
                </span>
              </div>
              <div className='mt-1 text-sm text-ink-muted'>{exp.location}</div>

              <p className='mt-4 text-base leading-relaxed text-ink-muted'>
                {exp.summary}
              </p>

              <ul className='mt-5 space-y-2.5'>
                {exp.highlights.map((h) => (
                  <li
                    key={h}
                    className='relative pl-5 text-sm leading-relaxed text-ink-muted'
                  >
                    <span className='absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent/60' />
                    {h}
                  </li>
                ))}
              </ul>

              <div className='mt-5 flex flex-wrap gap-2'>
                {exp.stack.map((s) => (
                  <span key={s} className='chip'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
};
