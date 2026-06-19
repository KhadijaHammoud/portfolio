import { SiGithub } from '@icons-pack/react-simple-icons';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useSettleMotion } from '../../motion';
import { LinkedInIcon } from '../icons';
import { ButtonGroup, TextButton, TextButtonVariant } from '../shared';
import { CONTACT } from './contact.const';

const Contact = () => {
  const settle = useSettleMotion();

  return (
    <section id='contact' className='relative py-24 md:py-36'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-[140px]' />
      </div>
      <div className='container-page'>
        <motion.div
          {...settle}
          className='mx-auto flex max-w-2xl flex-col items-center gap-4 text-center'
        >
          <div className='section-heading justify-center'>Contact</div>
          <h2 className='text-4xl font-semibold tracking-tight text-ink md:text-5xl'>
            Let's build something{' '}
            <span className='bg-gradient-to-r from-accent-soft via-accent to-accent-glow bg-clip-text text-transparent'>
              polished{' '}
            </span>
            together.
          </h2>
          <p className='text-lg leading-relaxed text-ink-muted'>
            I'm always open to talking about ambitious product work, founding
            teams, and interesting engineering problems. The fastest way to
            reach me is email.
          </p>

          <TextButton
            href={`mailto:${CONTACT.email}`}
            icon={<Mail />}
            showArrow
            variant={TextButtonVariant.Primary}
          >
            {CONTACT.email}
          </TextButton>

          <ButtonGroup className='justify-center'>
            <TextButton
              href={CONTACT.github}
              icon={<SiGithub />}
              variant={TextButtonVariant.Ghost}
            >
              GitHub
            </TextButton>
            <TextButton
              href={CONTACT.linkedin}
              icon={<LinkedInIcon />}
              variant={TextButtonVariant.Ghost}
            >
              LinkedIn
            </TextButton>
          </ButtonGroup>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
