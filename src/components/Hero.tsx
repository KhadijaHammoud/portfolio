import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { motion, type Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { EXPERIENCES, PROFILE } from '../constants';
import { LinkedText, TextButton, TextButtonVariant } from './shared';

dayjs.extend(customParseFormat);

const EXPERIENCE_START_FORMAT = 'MMM YYYY';

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
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

const Hero = () => {
  return (
    <section
      id='top'
      className='relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-grid-faint bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]' />
      </div>

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className='mt-20 flex flex-col gap-px overflow-hidden rounded-2xl border border-line/5 bg-line/[0.04] sm:flex-row'
        >
          <Stat label='Years of experience' value={YEARS_OF_EXPERIENCE} />
          <Stat label='Users at scale' value='2M+' />
          <Stat label='ARR from zero' value='$1M+' />
          <Stat label='Open-source stars' value='420+' />
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className='flex-1 bg-bg-soft/70 px-5 py-6'>
    <div className='font-mono text-2xl font-semibold text-ink md:text-3xl'>
      {value}
    </div>
    <div className='mt-1 text-sm text-ink-muted'>{label}</div>
  </div>
);

export default Hero;
