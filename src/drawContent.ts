type SeparatorConfig = {
  drawSeparator: (index: number, size: number) => boolean,
  startSeparator: string,
  middleSeparator: string,
  endSeparator: string,
};

/**
 * Shared function to draw horizontal borders, rows or the entire table
 */

export default function drawContent (contents: string[], separatorConfig: SeparatorConfig): string {
  const {startSeparator, middleSeparator, endSeparator, drawSeparator} = separatorConfig;
  const contentSize = contents.length;
  const result: string[] = [];

  if (drawSeparator(0, contentSize)) {
    result.push(startSeparator);
  }

  contents.forEach((content, index) => {
    result.push(content);

    // Only append the middle separator if the content is not the last
    if (index + 1 < contentSize && drawSeparator(index + 1, contentSize)) {
      result.push(middleSeparator);
    }
  });

  if (drawSeparator(contentSize, contentSize)) {
    result.push(endSeparator);
  }

  return result.join('');
}
