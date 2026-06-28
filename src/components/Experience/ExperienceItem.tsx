import { motion } from 'framer-motion';
import { AlignCardFrame, useAlignable } from '../../features';
import { getSettleMotion, settleWithoutOffset } from '../../motion';
import type { Experience as ExperienceType } from '../../types';
import { AlignableVariant, NudgeProfile } from '../../types';
import { cn } from '../../utils';
import { EngagementBadges, ImpactTags, LinkedText } from '../shared';
import { ButtonVariant, TextButton } from '../shared/Button';

type ExperienceItemProps = {
  exp: ExperienceType;
  index: number;
  reduceMotion: boolean | null;
};

const ExperienceItem = ({ exp, index, reduceMotion }: ExperienceItemProps) => {
  const { alignProps, dragging } = useAlignable({
    id: `exp-${exp.workSlug ?? index}`,
    index,
    variant: AlignableVariant.CARD,
    nudgeProfile: NudgeProfile.STACK,
  });

  const settle = settleWithoutOffset(
    getSettleMotion(reduceMotion, index * 0.06),
  );

  return (
    <motion.li
      {...settle}
      className='group align-card-root relative isolate'
      style={{ zIndex: 20 - index }}
    >
      <span className='experience-timeline-dot' aria-hidden>
        <span className='grid h-3.5 w-3.5 place-items-center'>
          <span className='absolute h-3.5 w-3.5 rounded-full bg-accent/20' />
          <span className='h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_2px_rgba(196,92,66,0.55)]' />
        </span>
      </span>

      <AlignCardFrame dragging={dragging}>
        <div {...alignProps} className={cn(alignProps.className)}>
          <div
            className={cn(
              'card p-6 transition-colors hover:border-line/10 md:p-10',
            )}
          >
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
                {exp.start} - {exp.end}
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
                  showArrow
                  variant={ButtonVariant.GHOST}
                >
                  View product work
                </TextButton>
              </div>
            )}
          </div>
        </div>
      </AlignCardFrame>
    </motion.li>
  );
};

export default ExperienceItem;
