import { motion } from 'framer-motion';
import React from 'react';
import { EXPERIENCES } from '../constants/portfolio.constants';
import { Section } from './Section';
import {
  EngagementBadges,
  ImpactTags,
  TextButton,
  TextButtonVariant,
} from './shared';

export const Experience: React.FC = () => {
  return (
    <Section
      eyebrow='Experience'
      title={<>Places I've helped build.</>}
      description='Roles and timelines — product deep-dives and UI walkthroughs live in Work.'
      id='experience'
    >
      <ol className='relative space-y-10 border-l border-line/5 pl-6 md:pl-10'>
        {EXPERIENCES.map((exp, i) => (
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
              <span className='h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_2px_rgba(196,92,66,0.55)]' />
            </span>

            <div className='card p-6 transition-colors hover:border-line/10 md:p-8'>
              <div className='flex flex-wrap items-start justify-between gap-x-6 gap-y-2'>
                <div className='min-w-0'>
                  <p className='text-lg font-semibold leading-snug text-ink md:text-xl'>
                    {exp.role}
                  </p>
                  <div className='mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5'>
                    <p className='text-base text-ink-muted'>{exp.company}</p>
                    <EngagementBadges badges={exp.badges} />
                    <ImpactTags tags={exp.impacts} />
                  </div>
                </div>
                <span className='shrink-0 font-mono text-sm leading-snug text-ink-muted'>
                  {exp.start} — {exp.end}
                </span>
              </div>
              <p className='mt-2 text-base text-ink-muted'>{exp.location}</p>

              <p className='mt-4 text-base leading-relaxed text-ink-muted'>
                {exp.summary}
              </p>

              {'workSlug' in exp && exp.workSlug ? (
                <div className='mt-5'>
                  <TextButton
                    href={`#work-${exp.workSlug}`}
                    variant={TextButtonVariant.Ghost}
                    showArrow
                  >
                    View product work
                  </TextButton>
                </div>
              ) : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
};
