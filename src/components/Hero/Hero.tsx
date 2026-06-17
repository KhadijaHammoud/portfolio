import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { motion, type Variants } from 'framer-motion';
import { AlignHorizontalJustifyCenter, MapPin, RotateCcw } from 'lucide-react';
import { AlignCardFrame, useAlignable, useAlignment } from '../../alignment';
import { EXPERIENCES, PROFILE } from '../../constants';
import { cn } from '../../utils';
import {
  ButtonLink,
  LinkedText,
  TextButton,
  TextButtonVariant,
} from '../shared';
import HeroStat from './HeroStat';

dayjs.extend(customParseFormat);

const EXPERIENCE_START_FORMAT = 'MMM YYYY';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 16, x: 10 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/** Full years since earliest role start — e.g. `"5+"` for hero stats. */
const YEARS_OF_EXPERIENCE = (() => {
  const earliestStart = EXPERIENCES.reduce(
    (earliest, exp) =>
      dayjs(exp.start, EXPERIENCE_START_FORMAT).isBefore(
        dayjs(earliest, EXPERIENCE_START_FORMAT),
      )
        ? exp.start
        : earliest,
    EXPERIENCES[0].start,
  );
  const years = dayjs().diff(
    dayjs(earliestStart, EXPERIENCE_START_FORMAT),
    'year',
  );
  return `${years}+`;
})();

function scrollToFirstCrooked() {
  const target = document.querySelector('[data-aligned="false"]');
  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}

const Hero = () => {
  const { isGameEnabled, isComplete, showHint, resetGame } = useAlignment();
  const { alignProps, dragging } = useAlignable({
    id: 'hero-stats',
    index: 0,
    variant: 'card',
  });

  const goToFirstCrooked = () => {
    showHint();
    scrollToFirstCrooked();
  };

  const scrambleAgain = () => {
    resetGame();
    scrollToFirstCrooked();
  };

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
          I&apos;m a{' '}
          <span className='font-bold text-ink'>{PROFILE.heroTaglineRole}</span>{' '}
          {PROFILE.heroTagline}
        </motion.p>

        <motion.p
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={3}
          className='mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted'
        >
          <LinkedText>{PROFILE.heroLead}</LinkedText>
        </motion.p>

        <motion.div
          variants={FADE_UP}
          initial='hidden'
          animate='show'
          custom={4}
          className='mt-10 flex flex-wrap items-center gap-3'
        >
          <TextButton
            href='#contact'
            showArrow
            variant={TextButtonVariant.Primary}
          >
            Say hello
          </TextButton>
          <TextButton href='#experience' variant={TextButtonVariant.Secondary}>
            See my experience
          </TextButton>
        </motion.div>

        {isGameEnabled ? (
          <motion.div
            variants={FADE_UP}
            initial='hidden'
            animate='show'
            custom={5}
          >
            <ButtonLink
              unstyled
              onClick={isComplete ? scrambleAgain : goToFirstCrooked}
              className='chip-tagline mt-6 inline-flex items-center gap-2 transition-colors hover:border-accent/40 hover:bg-accent/[0.12]'
            >
              {isComplete ? (
                <RotateCcw className='h-3.5 w-3.5' aria-hidden />
              ) : (
                <AlignHorizontalJustifyCenter
                  className='h-3.5 w-3.5'
                  aria-hidden
                />
              )}
              {isComplete
                ? 'Things got tidy. Scramble again?'
                : "Something's crooked. Drag cards, hover chips."}
            </ButtonLink>
          </motion.div>
        ) : (
          <motion.p
            variants={FADE_UP}
            initial='hidden'
            animate='show'
            custom={5}
            className='chip-tagline mt-6 inline-flex items-center gap-2'
          >
            <AlignHorizontalJustifyCenter className='h-3.5 w-3.5' aria-hidden />
            Something&apos;s crooked. Play on desktop.
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className='align-card-root relative mt-12'
        >
          {isGameEnabled ? (
            <AlignCardFrame dragging={dragging}>
              <div
                {...alignProps}
                className={cn(
                  'relative rounded-2xl border border-line/5 bg-line/[0.04]',
                  alignProps.className,
                )}
              >
                <div className='overflow-hidden rounded-2xl'>
                  <div className='flex flex-col gap-px sm:flex-row'>
                    <HeroStat
                      label='Years of experience'
                      value={YEARS_OF_EXPERIENCE}
                    />
                    <HeroStat label='Users at scale' value='2M+' />
                    <HeroStat label='ARR from zero' value='$1M+' />
                    <HeroStat label='Open-source stars' value='420+' />
                  </div>
                </div>
              </div>
            </AlignCardFrame>
          ) : (
            <div className='overflow-hidden rounded-2xl border border-line/5 bg-line/[0.04]'>
              <div className='flex flex-col gap-px sm:flex-row'>
                <HeroStat
                  label='Years of experience'
                  value={YEARS_OF_EXPERIENCE}
                />
                <HeroStat label='Users at scale' value='2M+' />
                <HeroStat label='ARR from zero' value='$1M+' />
                <HeroStat label='Open-source stars' value='420+' />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
