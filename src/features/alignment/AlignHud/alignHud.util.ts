export function formatAlignProgress(
  cardAligned: number,
  cardTotal: number,
  chipGroupAligned: number,
  chipGroupTotal: number,
): string {
  const cards = `${cardAligned}/${cardTotal} cards`;
  if (chipGroupTotal === 0) return cards;
  return `${cards} · ${chipGroupAligned}/${chipGroupTotal} chip groups`;
}

export function minimizedStatusLabel(remaining: number): string {
  if (remaining === 1) return '1 thing still crooked';
  return `${remaining} still crooked`;
}
