import type {
  DrawVerticalLine,
} from './types/api';

type Separator = {
  readonly left: string,
  readonly right: string,
  readonly join: string,
};

export default function drawHorizontalContent (contents: string[],
  config: {separator: Separator, drawVerticalLine: DrawVerticalLine, }): string {
  const {separator, drawVerticalLine} = config;
  const contentSize = contents.length;
  const result: string[] = [];

  result.push(drawVerticalLine(0, contentSize) ? separator.left : '');

  contents.forEach((content, index) => {
    result.push(content);

    // Only append the join separator if it is not the last content
    if (index + 1 < contentSize) {
      result.push(drawVerticalLine(index + 1, contentSize) ? separator.join : '');
    }
  });

  result.push(drawVerticalLine(contentSize, contentSize) ? separator.right : '');

  return result.join('') + '\n';
}

