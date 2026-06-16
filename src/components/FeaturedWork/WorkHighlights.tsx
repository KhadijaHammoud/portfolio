import { LinkedText } from '../shared';

interface WorkHighlightListProps {
  items: readonly string[];
  className?: string;
}

const WorkHighlightList: React.FC<WorkHighlightListProps> = ({
  items,
  className = '',
}) => (
  <ul className={`space-y-2.5 ${className}`}>
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
