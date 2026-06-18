import { PawPrint } from 'lucide-react';
import { cn } from '../../utils';
import { PAW_DURATION, STEP_INTERVAL, type PawStep } from './pawWalk.util';

type AutonomousPawMarkerProps = {
  reduceMotion: boolean;
  rotate: number;
  step: PawStep;
};

const AutonomousPawMarker = ({
  reduceMotion,
  rotate,
  step,
}: AutonomousPawMarkerProps) => (
  <div
    className='absolute -translate-x-1/2 -translate-y-1/2'
    style={{ left: step.left, top: step.top }}
  >
    <div className='relative z-[1]' style={{ rotate: `${rotate}deg` }}>
      <div
        className={cn(
          'text-secondary',
          reduceMotion ? 'opacity-[0.12]' : 'animate-paw-print-step',
        )}
        style={
          reduceMotion
            ? undefined
            : {
                animationDelay: `${step.index * STEP_INTERVAL}s`,
                animationDuration: `${PAW_DURATION}s`,
              }
        }
      >
        <PawPrint
          aria-hidden
          fill='currentColor'
          stroke='currentColor'
          strokeWidth={1.25}
          className='paw-print-filled h-9 w-9 sm:h-11 sm:w-11'
        />
      </div>
    </div>
  </div>
);

export default AutonomousPawMarker;
