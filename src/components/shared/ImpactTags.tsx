import React from 'react';

type ImpactTagsProps = {
  tags?: readonly string[];
  className?: string;
};

export const ImpactTags: React.FC<ImpactTagsProps> = ({
  tags,
  className = '',
}) => {
  if (!tags?.length) return null;

  return (
    <ul
      className={`inline-flex flex-wrap items-center gap-2 ${className}`.trim()}
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
