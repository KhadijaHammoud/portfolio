import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { profile, languages } from '../data/portfolio';

export const About: React.FC = () => {
  return (
    <Section id='about' eyebrow='About' title={<>A little about how I work.</>}>
      <div className='grid gap-10 md:grid-cols-[1.6fr_1fr]'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className='space-y-5 text-lg leading-relaxed text-ink-muted'
        >
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='card space-y-6 p-6'
        >
          <InfoRow label='Based in' value={profile.location} />
          <InfoRow
            label='Current role'
            value='Founding Engineer at FullyRamped'
          />
          <InfoRow
            label='Focus'
            value='Frontend · Architecture · Performance'
          />
          <div>
            <div className='text-xs uppercase tracking-wider text-ink-faint'>
              Languages
            </div>
            <ul className='mt-3 space-y-2'>
              {languages.map((l) => (
                <li
                  key={l.name}
                  className='flex items-center justify-between text-sm'
                >
                  <span className='text-ink'>{l.name}</span>
                  <span className='text-ink-muted'>{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      </div>
    </Section>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <div className='text-xs uppercase tracking-wider text-ink-faint'>
      {label}
    </div>
    <div className='mt-1 text-sm text-ink'>{value}</div>
  </div>
);
