import type {
  SpanningCellManager,
} from './spanningCellManager';
import type {
  CellCoordinates,
} from './types/internal';

/**
 * Shared function to draw horizontal borders, rows or the entire table
 */

 type DrawContentParameters = {
   contents: string[],
   drawSeparator: (index: number, size: number) => boolean,
   separatorGetter: (index: number, size: number) => string,
   spanningCellManager?: SpanningCellManager,
   rowIndex?: number,
   elementType?: 'border' | 'cell' | 'row', };

export const drawContent = (parameters: DrawContentParameters): string => {
  const {contents, separatorGetter, drawSeparator, spanningCellManager, rowIndex, elementType} = parameters;
  const contentSize = contents.length;
  const result: string[] = [];

  if (drawSeparator(0, contentSize)) {
    result.push(separatorGetter(0, contentSize));
  }

  contents.forEach((content, contentIndex) => {
    if (!elementType || elementType === 'border' || elementType === 'row') {
      result.push(content);
    }

    if (elementType === 'cell' && rowIndex === undefined) {
      result.push(content);
    }

    if (elementType === 'cell' && rowIndex !== undefined) {
      /* istanbul ignore next */
      const containingRange = spanningCellManager?.getContainingRange({col: contentIndex,
        row: rowIndex});

      // when drawing content row, just add a cell when it is a normal cell
      // or belongs to first column of spanning cell
      if (!containingRange || contentIndex === containingRange.topLeft.col) {
        result.push(content);
      }
    }

    // Only append the middle separator if the content is not the last
    if (contentIndex + 1 < contentSize && drawSeparator(contentIndex + 1, contentSize)) {
      const separator = separatorGetter(contentIndex + 1, contentSize);

      if (elementType === 'cell' && rowIndex !== undefined) {
        const currentCell: CellCoordinates = {col: contentIndex + 1,
          row: rowIndex};
        /* istanbul ignore next */
        const containingRange = spanningCellManager?.getContainingRange(currentCell);
        if (!containingRange || containingRange.topLeft.col === currentCell.col) {
          result.push(separator);
        }
      } else {
        result.push(separator);
      }
    }
  });

  if (drawSeparator(contentSize, contentSize)) {
    result.push(separatorGetter(contentSize, contentSize));
  }

  return result.join('');
};
