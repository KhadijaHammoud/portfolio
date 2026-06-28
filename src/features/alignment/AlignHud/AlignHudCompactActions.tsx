import { BrushCleaning, ScanSearch } from 'lucide-react';
import {
  ButtonGroup,
  ButtonSize,
  ButtonVariant,
  IconButton,
  TooltipPlacement,
} from '../../../components/shared';
import { cn } from '../../../utils';
import { FIND_CROOKED_LABEL } from './alignHud.const';

type AlignHudCompactActionsProps = {
  canSweep: boolean;
  sweeping: boolean;
  onFindCrooked: () => void;
  onSweep: () => void;
};

const AlignHudCompactActions = ({
  canSweep,
  sweeping,
  onFindCrooked,
  onSweep,
}: AlignHudCompactActionsProps) => (
  <ButtonGroup className='shrink-0 border-l border-line/10 pl-2'>
    <IconButton
      icon={<ScanSearch aria-hidden />}
      label={FIND_CROOKED_LABEL}
      size={ButtonSize.SM}
      tooltipPlacement={TooltipPlacement.TOP}
      onClick={onFindCrooked}
    />
    {canSweep && (
      <IconButton
        disabled={sweeping}
        icon={
          <BrushCleaning
            aria-hidden
            className={cn(sweeping && 'broom-sweeping')}
          />
        }
        label='Sweep all into place'
        size={ButtonSize.SM}
        tooltipPlacement={TooltipPlacement.TOP}
        variant={ButtonVariant.ACCENT}
        onClick={onSweep}
      />
    )}
  </ButtonGroup>
);

export default AlignHudCompactActions;
