type SeparatorConfig = {
  drawSeparator: (index: number, size: number) => boolean,
  separatorGetter: (index: number, size: number) => string,
};

/**
 * Shared function to draw horizontal borders, rows or the entire table
 */

export const drawContent = (contents: string[], separatorConfig: SeparatorConfig): string => {
  const {separatorGetter, drawSeparator} = separatorConfig;
  const contentSize = contents.length;
  const result: string[] = [];

  if (drawSeparator(0, contentSize)) {
    result.push(separatorGetter(0, contentSize));
  }

  for (const [contentIndex, content] of contents.entries()) {
    result.push(content);

    // Only append the middle separator if the content is not the last
    if (contentIndex + 1 < contentSize && drawSeparator(contentIndex + 1, contentSize)) {
      result.push(separatorGetter(contentIndex + 1, contentSize));
    }
  }

  if (drawSeparator(contentSize, contentSize)) {
    result.push(separatorGetter(contentSize, contentSize));
  }

  return result.join('');
};
