import { SiGithub } from '@icons-pack/react-simple-icons';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { PROFILE } from '../constants';
import { LinkedInIcon } from './icons';
import { TextButton, TextButtonVariant } from './shared';

const Contact = () => {
  return (
    <section id='contact' className='relative py-24 md:py-36'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-[140px]' />
      </div>
      <div className='container-page'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-3xl text-center flex flex-col gap-4 items-center'
        >
          <div className='section-heading justify-center'>Contact</div>
          <h2 className='text-4xl font-semibold tracking-tight text-ink md:text-5xl'>
            Let's build something{' '}
            <span className='bg-gradient-to-r from-accent-soft via-accent to-accent-glow bg-clip-text text-transparent'>
              together
            </span>
            .
          </h2>
          <p className='text-lg leading-relaxed text-ink-muted'>
            I'm always open to talking about ambitious product work, founding
            teams, and interesting engineering problems. The fastest way to
            reach me is email.
          </p>

          <TextButton
            href={`mailto:${PROFILE.email}`}
            icon={<Mail />}
            showArrow
            variant={TextButtonVariant.Primary}
          >
            {PROFILE.email}
          </TextButton>

          <div className='flex items-center justify-center gap-3'>
            <TextButton
              href={PROFILE.github}
              icon={<SiGithub />}
              variant={TextButtonVariant.Ghost}
            >
              GitHub
            </TextButton>
            <TextButton
              href={PROFILE.linkedin}
              icon={<LinkedInIcon />}
              variant={TextButtonVariant.Ghost}
            >
              LinkedIn
            </TextButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
