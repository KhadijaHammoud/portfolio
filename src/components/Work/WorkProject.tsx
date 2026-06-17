import { motion } from 'framer-motion';
import { useState } from 'react';
import { WorkProject as WorkProjectType } from '../../types';
import { EngagementBadges, ImpactTags, LinkedText } from '../shared';
import WorkAppSections from './WorkAppSections';
import WorkHighlightList from './WorkHighlightList';
import WorkWalkthroughSection from './WorkWalkthroughSection';

type WorkProjectProps = {
  project: WorkProjectType;
  index: number;
};

const WorkProject = ({ project, index }: WorkProjectProps) => {
  const shots = project.shots ?? [];
  const hasProjectShots = shots.length > 0 && !project.apps?.length;
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  return (
    <div id={`work-${project.slug}`} className='scroll-mt-28'>
      <div className='container-page'>
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: index * 0.05 }}
          className='card p-6 md:p-10'
        >
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-ink-muted'>
            <span className='font-medium text-ink'>{project.company}</span>
            <EngagementBadges badges={project.badges} />
            <ImpactTags tags={project.impacts} />
            <span aria-hidden>·</span>
            <span>{project.period}</span>
          </div>
          <h3 className='mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl'>
            {project.title}
          </h3>
          <p className='mt-1 text-base text-ink-muted'>{project.scope}</p>
          <p className='mt-4 text-base leading-relaxed text-ink-muted'>
            <LinkedText>{project.summary}</LinkedText>
          </p>
          {project.apps && project.apps.length > 0 && (
            <WorkAppSections
              apps={project.apps}
              projectSlug={project.slug}
              company={project.company}
            />
          )}
          {project.highlights && project.highlights.length > 0 && (
            <WorkHighlightList
              items={project.highlights}
              className={
                project.apps && project.apps.length > 0
                  ? 'mt-8 border-t border-line/5 pt-8'
                  : 'mt-5'
              }
            />
          )}
          {project.stack && project.stack.length > 0 && (
            <div className='mt-5 flex flex-wrap gap-2'>
              {project.stack.map((s) => (
                <span key={s} className='chip'>
                  {s}
                </span>
              ))}
            </div>
          )}
          {hasProjectShots && (
            <WorkWalkthroughSection
              shots={shots}
              viewerTitle={project.company}
              panelId={`work-${project.slug}-walkthrough`}
              index={index}
              isOpen={isWalkthroughOpen}
              onToggle={() => setIsWalkthroughOpen((open) => !open)}
            />
          )}
        </motion.article>
      </div>
    </div>
  );
};

export default WorkProject;
