import React from 'react';
import { cn } from '../../utils';

type ImpactTagsProps = {
  tags?: readonly string[];
  className?: string;
};

const ImpactTags: React.FC<ImpactTagsProps> = ({ tags, className = '' }) => {
  if (!tags?.length) return null;

  return (
    <ul
      className={cn('inline-flex flex-wrap items-center gap-2', className)}
      aria-label='Impact highlights'
    >
      {tags.map((tag) => (
        <li key={tag}>
          <span className='chip-tagline'>{tag}</span>
        </li>
      ))}
    </ul>
  );
};

export default ImpactTags;
