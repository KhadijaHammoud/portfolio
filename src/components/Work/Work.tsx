import { motion } from 'framer-motion';
import { FEATURED_WORK } from '../../constants';
import WorkProject from './WorkProject';

const Work = () => {
  return (
    <section id='work' className='relative py-24 md:py-32'>
      <div className='container-page mb-12 md:mb-16'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='section-heading'>Work</div>
          <h2 className='mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl'>
            Products I've helped ship<span className='text-accent'>.</span>
          </h2>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-ink-muted'>
            Scope, impact, and stack for each product.
          </p>
        </motion.div>
      </div>

      <div className='space-y-16 md:space-y-24'>
        {FEATURED_WORK.map((project, i) => (
          <WorkProject key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Work;
