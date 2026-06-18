import { LinkedText, cn } from '../shared';

type WorkHighlightListProps = {
  items: readonly string[];
  className?: string;
};

const WorkHighlightList = ({
  className = '',
  items,
}: WorkHighlightListProps) => (
  <ul className={cn('space-y-2.5', className)}>
    {items.map((h) => (
      <li
        key={h}
        className='relative pl-5 text-base leading-relaxed text-ink-muted'
      >
        <span className='absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-accent/60' />
        <LinkedText>{h}</LinkedText>
      </li>
    ))}
  </ul>
);

export default WorkHighlightList;
