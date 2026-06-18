import type { ReactNode } from 'react';

type AlignCardFrameProps = {
  children: ReactNode;
  dragging: boolean;
};

/** Static shell — drop target stays at the aligned layout position while the card moves. */
const AlignCardFrame = ({ children, dragging }: AlignCardFrameProps) => (
  <div className='align-card-shell relative'>
    {dragging && (
      <div
        aria-hidden
        className='align-drop-target pointer-events-none absolute inset-0 z-0 rounded-2xl border-2 border-dashed border-accent/55 bg-accent/[0.05] shadow-[inset_0_0_0_1px_rgb(196_92_66/0.12)]'
      />
    )}
    <div className='relative z-[1]'>{children}</div>
  </div>
);

export default AlignCardFrame;
