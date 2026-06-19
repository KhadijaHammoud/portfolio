import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Variants } from 'framer-motion';
import { EXPERIENCES } from '../../constants';

dayjs.extend(customParseFormat);

export const HERO = {
  role: 'software engineer',
  tagline: 'who ships polished, zero-to-one products.',
  lead: 'With a strong focus on frontend development, I help teams build scalable, high-performance applications from sketch to production, clean and pixel-perfect. I care about the details most people only feel, like when something needs to go just a little to the left',
  info: {
    leading: 'Inspired by',
    linkText: 'A Little to the Left',
    linkHref: 'https://www.alittletotheleft.com/',
    trailing: '- not affiliated',
  },
};

const EXPERIENCE_START_FORMAT = 'MMM YYYY';

export const FADE_UP: Variants = {
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
export const YEARS_OF_EXPERIENCE = (() => {
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
