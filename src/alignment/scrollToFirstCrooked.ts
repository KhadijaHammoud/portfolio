/** Smooth-scroll to the first misaligned card or chip group on the page. */
export function scrollToFirstCrooked() {
  const target = document.querySelector('[data-aligned="false"]');
  if (!target) return;

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}
