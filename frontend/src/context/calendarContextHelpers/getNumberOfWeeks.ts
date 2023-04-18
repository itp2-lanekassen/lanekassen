export default function getNumberOfWeeks(w: number) {
  if (w <= 425) return 1;

  if (w <= 768) return 2;

  if (w <= 1024) return 3;

  return 4;
}
