import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import Section from './Section';
import {
  EngagementBadges,
  ImpactTags,
  LinkedText,
  TextButton,
  TextButtonVariant,
} from './shared';

const Experience = () => {
  return (
    <Section
      eyebrow='Experience'
      title={
        <>
          Places I've helped build<span className='text-accent'>.</span>
        </>
      }
      description='Roles and timelines.'
      id='experience'
    >
      <ol className='relative space-y-10 before:absolute before:bottom-8 before:left-0 before:top-8 before:w-px before:-translate-x-6 before:bg-line/5 before:content-[""] md:before:-translate-x-10'>
        {EXPERIENCES.map((exp, i) => (
          <motion.li
            key={exp.company + exp.start}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
            className='group relative'
          >
            <span className='absolute left-0 top-8 z-10 -translate-x-6 md:-translate-x-10'>
              <span className='grid h-3.5 w-3.5 place-items-center'>
                <span className='absolute h-3.5 w-3.5 rounded-full bg-accent/20' />
                <span className='h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_2px_rgba(196,92,66,0.55)]' />
              </span>
            </span>

            <div className='card p-6 transition-colors hover:border-line/10 md:p-10'>
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
                <LinkedText>{exp.summary}</LinkedText>
              </p>

              {exp.workSlug && (
                <div className='mt-5'>
                  <TextButton
                    href={`#work-${exp.workSlug}`}
                    variant={TextButtonVariant.Ghost}
                    showArrow
                  >
                    View product work
                  </TextButton>
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
};

export default Experience;
