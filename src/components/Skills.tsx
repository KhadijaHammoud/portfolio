import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { SKILLS } from '../constants/portfolio.constants';

export const Skills: React.FC = () => {
  return (
    <Section
      eyebrow='Skills'
      title={<>Tools I reach for.</>}
      description="A snapshot of the stack I use day-to-day. I'm biased toward strongly-typed, composable systems and a pragmatic, product-first approach."
      id='skills'
    >
      <div className='grid gap-5 md:grid-cols-3'>
        {SKILLS.map((group, idx) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className='card p-6'
          >
            <div className='flex items-center gap-3'>
              <span className='grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-sm font-semibold text-accent-soft'>
                {idx + 1}
              </span>
              <h3 className='text-base font-semibold text-ink'>{group.group}</h3>
            </div>
            <ul className='mt-5 flex flex-wrap gap-2'>
              {group.items.map((item) => (
                <li key={item} className='chip'>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
