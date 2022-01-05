import {
  expect,
} from 'chai';
import {
  alignVerticalRangeContent,
  wrapRangeContent,
} from '../src/alignSpanningCell';
import type {
  RangeConfig,
} from '../src/types/internal';
import {
  baseCellConfig, baseSpanningCellContext,
} from './spanningCellFixtures';

describe('wrapRangeContent', () => {
  const baseRangeConfig: RangeConfig = {
    ...baseCellConfig,
    bottomRight: {col: 1,
      row: 0},
    topLeft: {col: 0,
      row: 0},
  };
  it('base', () => {
    const result = wrapRangeContent(baseRangeConfig, 20, baseSpanningCellContext);

    expect(result).to.deep.equal([
      ' ECMAScript (or ES) ',
      ' is a               ',
      ' general-purpose    ',
      ' programming        ',
      ' language,          ',
      ' standardised by    ',
      ' Ecma International ',
      ' according to the   ',
      ' document ECMA-262. ',
    ]);
  });

  it('truncation', () => {
    const result = wrapRangeContent({...baseRangeConfig,
      truncate: 40}, 20, baseSpanningCellContext);

    expect(result).to.deep.equal([
      ' ECMAScript (or ES) ',
      ' is a               ',
      ' general-purpose…   ',
    ]);
  });

  it('paddings', () => {
    const result = wrapRangeContent({...baseRangeConfig,
      paddingLeft: 2,
      paddingRight: 3}, 20, baseSpanningCellContext);

    expect(result).to.deep.equal([
      '  ECMAScript (or    ',
      '  ES) is a          ',
      '  general-purpose   ',
      '  programming       ',
      '  language,         ',
      '  standardised by   ',
      '  Ecma              ',
      '  International     ',
      '  according to      ',
      '  the document      ',
      '  ECMA-262.         ',
    ]);
  });

  it('wrapWord=false', () => {
    const result = wrapRangeContent({...baseRangeConfig,
      wrapWord: false}, 20, baseSpanningCellContext);

    expect(result).to.deep.equal([
      ' ECMAScript (or ES) ',
      ' is a general-purpo ',
      ' se programming lan ',
      ' guage, standardise ',
      ' d by Ecma Internat ',
      ' ional according to ',
      ' the document ECMA- ',
      ' 262.               ',
    ]);
  });

  it('alignment = center', () => {
    const result = wrapRangeContent({...baseRangeConfig,
      alignment: 'center'}, 20, baseSpanningCellContext);

    expect(result).to.deep.equal([
      ' ECMAScript (or ES) ',
      '        is a        ',
      '  general-purpose   ',
      '    programming     ',
      '     language,      ',
      '  standardised by   ',
      ' Ecma International ',
      '  according to the  ',
      ' document ECMA-262. ',
    ]);
  });

  it('alignment = right', () => {
    const result = wrapRangeContent({...baseRangeConfig,
      alignment: 'right'}, 20, baseSpanningCellContext);

    expect(result).to.deep.equal([
      ' ECMAScript (or ES) ',
      '               is a ',
      '    general-purpose ',
      '        programming ',
      '          language, ',
      '    standardised by ',
      ' Ecma International ',
      '   according to the ',
      ' document ECMA-262. ',
    ]);
  });

  it('alignment = justify', () => {
    const result = wrapRangeContent({...baseRangeConfig,
      alignment: 'justify'}, 20, baseSpanningCellContext);

    expect(result).to.deep.equal([
      ' ECMAScript (or ES) ',
      ' is a               ',
      ' general-purpose    ',
      ' programming        ',
      ' language,          ',
      ' standardised    by ',
      ' Ecma International ',
      ' according  to  the ',
      ' document ECMA-262. ',
    ]);
  });
});

describe('alignVerticalRangeContent', () => {
  const baseRangeConfig: RangeConfig = {
    ...baseCellConfig,
    bottomRight: {col: 1,
      row: 0},
    topLeft: {col: 0,
      row: 0},
  };

  const baseContent: string[] = [
    ' ECMAScript (or ES) ',
    ' is a               ',
    ' general-purpose    ',
    ' programming        ',
    ' language,          ',
    ' standardised by    ',
    ' Ecma International ',
    ' according to the   ',
    ' document ECMA-262. ',
  ];

  it('base', () => {
    const result = alignVerticalRangeContent(baseRangeConfig, baseContent, {...baseSpanningCellContext,
      rowHeights: [12]});

    expect(result).to.deep.equal([
      ' ECMAScript (or ES) ',
      ' is a               ',
      ' general-purpose    ',
      ' programming        ',
      ' language,          ',
      ' standardised by    ',
      ' Ecma International ',
      ' according to the   ',
      ' document ECMA-262. ',
      '                    ',
      '                    ',
      '                    ',
    ]);
  });

  it('verticalAlignment = middle', () => {
    const result = alignVerticalRangeContent({...baseRangeConfig,
      verticalAlignment: 'middle'}, baseContent, {...baseSpanningCellContext,
      rowHeights: [12]});

    expect(result).to.deep.equal([
      '                    ',
      ' ECMAScript (or ES) ',
      ' is a               ',
      ' general-purpose    ',
      ' programming        ',
      ' language,          ',
      ' standardised by    ',
      ' Ecma International ',
      ' according to the   ',
      ' document ECMA-262. ',
      '                    ',
      '                    ',
    ]);
  });

  it('verticalAlignment = bottom', () => {
    const result = alignVerticalRangeContent({...baseRangeConfig,
      verticalAlignment: 'bottom'}, baseContent, {...baseSpanningCellContext,
      rowHeights: [12]});

    expect(result).to.deep.equal([
      '                    ',
      '                    ',
      '                    ',
      ' ECMAScript (or ES) ',
      ' is a               ',
      ' general-purpose    ',
      ' programming        ',
      ' language,          ',
      ' standardised by    ',
      ' Ecma International ',
      ' according to the   ',
      ' document ECMA-262. ',
    ]);
  });

  describe('rowSpan = 2', () => {
    it('base', () => {
      const result = alignVerticalRangeContent({...baseRangeConfig,
        bottomRight: {col: 0,
          row: 1}}, baseContent, {...baseSpanningCellContext,
        rowHeights: [5, 7]});

      expect(result).to.deep.equal([
        ' ECMAScript (or ES) ',
        ' is a               ',
        ' general-purpose    ',
        ' programming        ',
        ' language,          ',
        ' standardised by    ',
        ' Ecma International ',
        ' according to the   ',
        ' document ECMA-262. ',
        '                    ',
        '                    ',
        '                    ',
        '                    ',
      ]);
    });

    it('hidden border', () => {
      const result = alignVerticalRangeContent({...baseRangeConfig,
        bottomRight: {col: 0,
          row: 1}}, baseContent, {...baseSpanningCellContext,
        drawHorizontalLine: (index) => {
          return index !== 1;
        },
        rowHeights: [5, 7]});

      expect(result).to.deep.equal([
        ' ECMAScript (or ES) ',
        ' is a               ',
        ' general-purpose    ',
        ' programming        ',
        ' language,          ',
        ' standardised by    ',
        ' Ecma International ',
        ' according to the   ',
        ' document ECMA-262. ',
        '                    ',
        '                    ',
        '                    ',
      ]);
    });
  });
});
