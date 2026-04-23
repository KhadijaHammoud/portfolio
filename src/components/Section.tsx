import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
};

export const Section: React.FC<Props> = ({
  children,
  eyebrow,
  title,
  description,
  id,
}) => {
  return (
    <section id={id} className='relative py-24 md:py-32'>
      <div className='container-page'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='mb-12 md:mb-16'
        >
          <div className='section-heading'>{eyebrow}</div>
          <h2 className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl'>
            {title}
          </h2>
          {description && (
            <p className='mt-4 max-w-2xl text-base leading-relaxed text-ink-muted'>
              {description}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
};
