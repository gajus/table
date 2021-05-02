import stringWidth from 'string-width';
import type {
  Alignment,
} from './types/api';
import {
  countSpaceSequence, distributeUnevenly,
} from './utils';

const alignLeft = (subject: string, width: number): string => {
  return subject + ' '.repeat(width);
};

const alignRight = (subject: string, width: number): string => {
  return ' '.repeat(width) + subject;
};

const alignCenter = (subject: string, width: number): string => {
  return ' '.repeat(Math.floor(width / 2)) + subject + ' '.repeat(Math.ceil(width / 2));
};

const alignJustify = (subject: string, width: number): string => {
  const spaceSequenceCount = countSpaceSequence(subject);

  if (spaceSequenceCount === 0) {
    return alignLeft(subject, width);
  }

  const addingSpaces = distributeUnevenly(width, spaceSequenceCount);

  if (Math.max(...addingSpaces) > 3) {
    return alignLeft(subject, width);
  }

  let spaceSequenceIndex = 0;

  return subject.replace(/\s+/g, (groupSpace) => {
    return groupSpace + ' '.repeat(addingSpaces[spaceSequenceIndex++]);
  });
};

/**
 * Pads a string to the left and/or right to position the subject
 * text in a desired alignment within a container.
 */
export const alignString = (subject: string, containerWidth: number, alignment: Alignment): string => {
  const subjectWidth = stringWidth(subject);

  if (subjectWidth === containerWidth) {
    return subject;
  }

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

  if (alignment === 'justify') {
    return alignJustify(subject, availableWidth);
  }

  return alignCenter(subject, availableWidth);
};
