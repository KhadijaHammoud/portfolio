import { motion } from 'framer-motion';
import { AlignHorizontalJustifyCenter, RotateCcw } from 'lucide-react';
import {
  ButtonGroup,
  TextButton,
  TextButtonSize,
  TextButtonVariant,
} from '../../components/shared';
import { COMPACT_HUD_ROW_CLASS, COMPACT_MOTION_PROPS } from './alignHud.const';

type AlignHudCompactCompleteProps = {
  onScrambleAgain: () => void;
  reduceMotion: boolean | null;
};

const AlignHudCompactComplete = ({
  onScrambleAgain,
  reduceMotion,
}: AlignHudCompactCompleteProps) => (
  <motion.div
    key='progress'
    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
    {...COMPACT_MOTION_PROPS}
  >
    <div className={COMPACT_HUD_ROW_CLASS}>
      <div className='flex min-h-10 items-center gap-2.5 px-2 py-1.5'>
        <span className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent'>
          <AlignHorizontalJustifyCenter className='h-3.5 w-3.5' aria-hidden />
        </span>
        <p className='whitespace-nowrap text-sm font-medium text-ink'>
          Everything&apos;s in place. Nice eye.
        </p>
      </div>
      <ButtonGroup className='shrink-0 border-l border-line/10 pl-2'>
        <TextButton
          icon={<RotateCcw aria-hidden />}
          onClick={onScrambleAgain}
          size={TextButtonSize.Sm}
          variant={TextButtonVariant.Ghost}
        >
          Scramble again
        </TextButton>
      </ButtonGroup>
    </div>
  </motion.div>
);

export default AlignHudCompactComplete;
