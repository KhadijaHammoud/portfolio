import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import { AlignableCard, AlignChipField, SkillChip } from '../../features';
import { getSettleMotion } from '../../motion';
import { AlignableCardTag } from '../../types';
import Section from '../Section';
import { EngagementBadges, ImpactTags, LinkedText } from '../shared';
import WorkCollapsiblePanel from '../Work/WorkCollapsiblePanel';
import WorkHighlightList from '../Work/WorkHighlightList';
import { OPEN_SOURCE } from './openSource.const';

const OpenSource = () => {
  const reduceMotion = useReducedMotion();
  const articleSettle = getSettleMotion(reduceMotion);

  return (
    <Section
      eyebrow='Open Source'
      title={
        <>
          Contributing back to the community
          <span className='text-accent'>.</span>
        </>
      }
      description="A closer look at the work I'm most proud of."
      id='open-source'
    >
      <AlignableCard
        id='opensource-card'
        index={0}
        as={AlignableCardTag.ARTICLE}
        className='p-6 md:p-10'
        settle={articleSettle}
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
            <p className='mt-1 text-base text-ink-muted'>{OPEN_SOURCE.role}</p>
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

        <div className='mt-8'>
          <WorkCollapsiblePanel
            id='open-source-contributions'
            title='Contributions'
          >
            <WorkHighlightList items={OPEN_SOURCE.highlights} />
          </WorkCollapsiblePanel>
        </div>

        <AlignChipField
          id='opensource-chips'
          className='mt-5 flex flex-wrap gap-2'
        >
          {OPEN_SOURCE.stack.map((s, chipIdx) => (
            <SkillChip
              key={s}
              id={`opensource-chip-${s}`}
              index={chipIdx}
              label={s}
            />
          ))}
        </AlignChipField>
      </AlignableCard>
    </Section>
  );
};

export default OpenSource;
