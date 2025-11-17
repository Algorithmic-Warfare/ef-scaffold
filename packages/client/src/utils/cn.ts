// Simple className combiner similar to clsx, retained for parity
export function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}
