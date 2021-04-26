import stringWidth from 'string-width';
import type {
  ColumnUserConfig,
} from './types/api';

const alignLeft = (subject: string, width: number): string => {
  return subject + ' '.repeat(width);
};

const alignRight = (subject: string, width: number): string => {
  return ' '.repeat(width) + subject;
};

const alignCenter = (subject: string, width: number): string => {
  let halfWidth;

  halfWidth = width / 2;

  if (width % 2 === 0) {
    return ' '.repeat(halfWidth) + subject + ' '.repeat(halfWidth);
  } else {
    halfWidth = Math.floor(halfWidth);

    return ' '.repeat(halfWidth) + subject + ' '.repeat(halfWidth + 1);
  }
};

/**
 * Pads a string to the left and/or right to position the subject
 * text in a desired alignment within a container.
 */
export const alignString = (subject: string, containerWidth: number, alignment: ColumnUserConfig['alignment']): string => {
  const subjectWidth = stringWidth(subject);

  if (subjectWidth > containerWidth) {
    throw new Error('Subject parameter value width cannot be greater than the container width.');
  }

  if (subjectWidth === 0) {
    return ' '.repeat(containerWidth);
  }

  const availableWidth = containerWidth - subjectWidth;

  if (alignment === 'left') {
    return alignLeft(subject, availableWidth);
  }

  if (alignment === 'right') {
    return alignRight(subject, availableWidth);
  }

  return alignCenter(subject, availableWidth);
};
