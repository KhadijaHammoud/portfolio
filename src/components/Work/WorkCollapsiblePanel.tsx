import { useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { cn } from '../../utils';

type WorkCollapsiblePanelProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

const WorkCollapsiblePanel = ({
  id,
  title,
  description,
  children,
}: WorkCollapsiblePanelProps) => {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const triggerId = `${id}-trigger`;

  return (
    <div className='rounded-xl border border-line/5 bg-line/[0.02]'>
      <button
        type='button'
        id={triggerId}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={id}
        className='flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-line/[0.03] md:px-5 md:py-5'
      >
        <div className='min-w-0'>
          <h4 className='text-lg font-semibold tracking-tight text-ink md:text-xl'>
            {title}
          </h4>
          {description && (
            <p className='mt-1 text-sm text-ink-muted'>{description}</p>
          )}
        </div>
        <ChevronDown
          aria-hidden
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        id={id}
        role='region'
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={cn(
          'grid',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          !reduceMotion &&
            'transition-[grid-template-rows] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        )}
      >
        <div
          className='min-h-0 overflow-hidden'
          inert={isOpen ? undefined : true}
        >
          <div className='border-t border-line/5 px-4 pb-5 pt-4 md:px-5 md:pb-6'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCollapsiblePanel;
