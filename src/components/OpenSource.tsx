import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import React from 'react';
import { OPEN_SOURCE } from '../constants';
import { EngagementBadges, ImpactTags, LinkedText } from './shared';

export const OpenSource: React.FC = () => {
  return (
    <section id='open-source' className='relative py-24 md:py-32'>
      <div className='container-page mb-12 md:mb-16'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='section-heading'>Open Source</div>
          <h2 className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl'>
            Contributing back to the community
            <span className='text-accent'>.</span>
          </h2>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-ink-muted'>
            A closer look at the work I&apos;m most proud of.
          </p>
        </motion.div>
      </div>

      <div className='container-page'>
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className='card p-6 md:p-10'
        >
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-muted'>
            <span className='font-medium text-ink'>{OPEN_SOURCE.company}</span>
            <EngagementBadges badges={OPEN_SOURCE.badges} />
            <ImpactTags tags={OPEN_SOURCE.impacts} />
            <span aria-hidden>·</span>
            <span>{OPEN_SOURCE.period}</span>
          </div>

          <div className='mt-3 flex flex-wrap items-start justify-between gap-6'>
            <div className='min-w-0 flex-1'>
              <h3 className='text-2xl font-semibold tracking-tight text-ink md:text-3xl'>
                {OPEN_SOURCE.name}
              </h3>
              <p className='mt-1 text-base text-ink-muted'>
                {OPEN_SOURCE.role}
              </p>
            </div>

            <a
              href={OPEN_SOURCE.url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-ink transition-all hover:border-accent/70 hover:bg-accent/20'
            >
              <Star className='h-4 w-4 text-accent' />
              <span>{OPEN_SOURCE.stars} stars</span>
              <span className='h-3 w-px bg-line/20' />
              <span>View on GitHub</span>
              <ArrowUpRight className='h-4 w-4' />
            </a>
          </div>
          <p className='mt-4 text-base leading-relaxed text-ink-muted'>
            <LinkedText>{OPEN_SOURCE.summary}</LinkedText>
          </p>
          <ul className='mt-5 space-y-2.5'>
            {OPEN_SOURCE.highlights.map((h) => (
              <li
                key={h}
                className='relative pl-5 text-base leading-relaxed text-ink-muted'
              >
                <span className='absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent/60' />
                <LinkedText>{h}</LinkedText>
              </li>
            ))}
          </ul>
          <div className='mt-5 flex flex-wrap gap-2'>
            {OPEN_SOURCE.stack.map((s) => (
              <span key={s} className='chip'>
                {s}
              </span>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};
