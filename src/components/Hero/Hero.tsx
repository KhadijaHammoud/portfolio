import { motion } from 'framer-motion';
import { AlignHorizontalJustifyCenter, MapPin } from 'lucide-react';
import { useAlignable } from '../../alignment';
import { useAlignment } from '../../contexts';
import { AlignableVariant } from '../../types';
import { PROFILE } from '../../constants';
import { cn } from '../../utils';
import {
  ButtonGroup,
  ButtonVariant,
  TextButton,
  Tooltip,
  TooltipPlacement,
} from '../shared';
import { FADE_UP, HERO, YEARS_OF_EXPERIENCE } from './hero.const';
import HeroStatsPanel from './HeroStatsPanel';

const Hero = () => {
  const { isGameEnabled } = useAlignment();
  const { alignProps, dragging } = useAlignable({
    id: 'hero-stats',
    index: 0,
    variant: AlignableVariant.CARD,
  });

  return (
    <section
      id='top'
      className={cn(
        'relative overflow-hidden pt-28 pb-24 md:pt-36 md:pb-28',
        isGameEnabled && 'md:pb-40',
      )}
    >
      <div className='container-page'>
        <motion.div
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={0}
          className='inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line/10 bg-line/[0.03] px-3 py-1.5 text-sm text-ink-muted'
        >
          <MapPin className='h-3.5 w-3.5 shrink-0 text-accent' />
          <span>{PROFILE.location}</span>
          <span className='text-ink-faint' aria-hidden>
            ·
          </span>
          <span>{PROFILE.openToRemote}</span>
        </motion.div>

        <motion.h1
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={1}
          className='mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl md:leading-[1.05]'
        >
          Hi, my
          <br />
          name is{' '}
          <span className='bg-gradient-to-r from-accent-soft via-accent to-accent-glow bg-clip-text text-transparent'>
            {PROFILE.firstName}
          </span>
          .
        </motion.h1>

        <motion.p
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={2}
          className='mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted md:text-2xl md:leading-relaxed'
        >
          I&apos;m a <span className='font-bold text-ink'>{HERO.role}</span>{' '}
          {HERO.tagline}
        </motion.p>

        <motion.p
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={3}
          className='mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted'
        >
          {HERO.lead}
          <Tooltip
            label={
              <>
                {HERO.info.leading}{' '}
                <a
                  href={HERO.info.linkHref}
                  target='_blank'
                  rel='noreferrer'
                  className='underline decoration-accent/50 underline-offset-2 transition-colors hover:text-accent'
                >
                  {HERO.info.linkText}
                </a>{' '}
                {HERO.info.trailing}
              </>
            }
            placement={TooltipPlacement.RIGHT}
          >
            <span
              tabIndex={0}
              className='cursor-default text-accent'
              aria-label={`${HERO.info.leading} ${HERO.info.linkText} ${HERO.info.trailing}`}
            >
              *
            </span>
          </Tooltip>
          .
        </motion.p>

        <motion.div
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={4}
          className='mt-10'
        >
          <ButtonGroup wrap>
            <TextButton
              href='#contact'
              showArrow
              variant={ButtonVariant.PRIMARY}
            >
              Say hello
            </TextButton>
            <TextButton href='#experience' variant={ButtonVariant.SECONDARY}>
              See my experience
            </TextButton>
          </ButtonGroup>
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={5}
          className='chip-tagline mt-6 inline-flex items-center gap-2 md:hidden'
        >
          <AlignHorizontalJustifyCenter className='h-3.5 w-3.5' aria-hidden />
          Something&apos;s crooked. Play on desktop.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className='align-card-root relative mt-12'
        >
          <HeroStatsPanel
            alignProps={alignProps}
            dragging={dragging}
            isGameEnabled={isGameEnabled}
            yearsOfExperience={YEARS_OF_EXPERIENCE}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
