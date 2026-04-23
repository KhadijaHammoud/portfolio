import { SiGithub } from '@icons-pack/react-simple-icons';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { PROFILE } from '../constants/portfolio.constants';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TextButton, TextButtonVariant } from './shared';

export const Contact: React.FC = () => {
  return (
    <section id='contact' className='relative py-24 md:py-36'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]' />
      </div>
      <div className='container-page'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-3xl text-center'
        >
          <div className='section-heading justify-center'>Contact</div>
          <h2 className='mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl'>
            Let's build something{' '}
            <span className='bg-gradient-to-r from-accent-soft via-accent to-accent-glow bg-clip-text text-transparent'>
              thoughtful
            </span>
            .
          </h2>
          <p className='mt-5 text-lg leading-relaxed text-ink-muted'>
            I'm always open to talking about ambitious product work, founding
            teams, and interesting engineering problems. The fastest way to
            reach me is email.
          </p>

          <div className='mt-10 flex flex-wrap items-center justify-center gap-3'>
            <TextButton
              href={`mailto:${PROFILE.email}`}
              leadingIcon={<Mail className='h-4 w-4' />}
              showArrow
              variant={TextButtonVariant.Primary}
            >
              {PROFILE.email}
            </TextButton>
            <TextButton
              href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
              leadingIcon={<Phone className='h-4 w-4' />}
              variant={TextButtonVariant.Secondary}
            >
              {PROFILE.phone}
            </TextButton>
          </div>

          <div className='mt-8 flex items-center justify-center gap-3'>
            <TextButton
              href={PROFILE.github}
              leadingIcon={<SiGithub className='h-4 w-4' color='currentColor' />}
              variant={TextButtonVariant.Ghost}
            >
              GitHub
            </TextButton>
            <TextButton
              href={PROFILE.linkedin}
              leadingIcon={<LinkedInIcon className='h-4 w-4' />}
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
