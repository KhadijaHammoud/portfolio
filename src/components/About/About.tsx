import { motion } from 'framer-motion';
import { AlignableCard } from '../../alignment';
import { LANGUAGES, PROFILE } from '../../constants';
import { useSettleMotion } from '../../motion/settle';
import Section from '../Section';
import { LinkedText } from '../shared';
import AboutInfoRow from './AboutInfoRow';

const About = () => {
  const bioSettle = useSettleMotion();
  const asideSettle = useSettleMotion(0.1);

  return (
    <Section
      eyebrow='About'
      title={
        <>
          Nice to meet you<span className='text-accent'>.</span>
        </>
      }
      description='A little about me.'
      id='about'
    >
      <div className='grid gap-10 md:grid-cols-[1.6fr_1fr]'>
        <motion.div
          {...bioSettle}
          className='space-y-5 text-lg leading-relaxed text-ink-muted'
        >
          {PROFILE.bio.map((p, i) => (
            <p key={i}>
              <LinkedText>{p}</LinkedText>
            </p>
          ))}
        </motion.div>

        <AlignableCard
          id='about-sidebar'
          index={1}
          settle={asideSettle}
          as='aside'
          className='space-y-6 p-6'
        >
          <AboutInfoRow label='Based in' value={PROFILE.location} />
          <AboutInfoRow
            label='Current role'
            value='Founding Engineer at FullyRamped'
          />
          <AboutInfoRow
            label='Focus'
            value='Frontend · Architecture · Performance'
          />
          <div>
            <div className='text-xs uppercase tracking-wider text-ink-muted'>
              Languages
            </div>
            <ul className='mt-3 space-y-2'>
              {LANGUAGES.map((l) => (
                <li
                  key={l.name}
                  className='flex items-center justify-between text-sm'
                >
                  <span className='text-ink'>{l.name}</span>
                  <span className='text-ink-muted'>{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </AlignableCard>
      </div>
    </Section>
  );
};

export default About;
