import stripAnsi from "strip-ansi";

/**
 * Calculates height of cell content in regard to its width and word wrapping.
 */
export const calculateCellHeight = (value: string, columnWidth: number, useWrapWord = false): number => {
  if (value.length === 0) {
    return 1;
  }
  const strippedValue = stripAnsi(value);
  const size = Math.max(1, columnWidth);

  const pattern = useWrapWord ?
    new RegExp(`(.{0,${size - 1}}(?:(?:.\\s|[\\\\\\/_\\.,;-]|.$))|.{0,${size}}\\s?)`, 'g') :
    new RegExp(`(.{0,${size}}\\s*)`, 'g');

  let count = 0;
  let match;

  while ((match = pattern.exec(strippedValue)) !== null) {
    if (match[0] || match.index === strippedValue.length && strippedValue.endsWith('\n')) {
      count++;
    }

    if (match.index === pattern.lastIndex) {
      pattern.lastIndex++;
    }
  }

  return count || 1;
};
