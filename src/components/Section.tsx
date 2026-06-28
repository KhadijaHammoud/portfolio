import { motion } from 'framer-motion';
import React from 'react';
import { useSettleMotion } from '../motion';

type SectionProps = {
  children: React.ReactNode;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  /** Render children outside `container-page` (e.g. full-bleed project stacks). */
  uncontainedBody?: boolean;
};

const Section = ({
  children,
  eyebrow,
  title,
  description,
  id,
  uncontainedBody = false,
}: SectionProps) => {
  const settle = useSettleMotion();

  const header = (
    <motion.div {...settle} className='mb-12 md:mb-16'>
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
  );

  if (uncontainedBody) {
    return (
      <section id={id} className='relative py-24 md:py-32'>
        <div className='container-page'>{header}</div>
        {children}
      </section>
    );
  }

  return (
    <section id={id} className='relative py-24 md:py-32'>
      <div className='container-page'>
        {header}
        {children}
      </div>
    </section>
  );
};

export default Section;
