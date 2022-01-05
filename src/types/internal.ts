import type {
  SpanningCellManager,
} from '../spanningCellManager';
import type {
  BorderConfig,
  ColumnUserConfig,
  DrawHorizontalLine,
  DrawVerticalLine,
  StreamUserConfig,
  TableUserConfig,
  CellUserConfig,
} from './api';

/** @internal */
export type Cell = string;

/** @internal */
export type Row = Cell[];

/** @internal */
export type TopBorderConfig = Pick<BorderConfig, 'topBody' | 'topJoin' | 'topLeft' | 'topRight'>;

/** @internal */
export type BottomBorderConfig = Pick<BorderConfig, 'bottomBody' | 'bottomJoin' | 'bottomLeft' | 'bottomRight'>;

/** @internal */
export type BodyBorderConfig = Pick<BorderConfig, 'bodyJoin' | 'bodyLeft' | 'bodyRight'>;

/** @internal */
export type JoinBorderConfig = Pick<BorderConfig, 'joinBody' | 'joinJoin' | 'joinLeft' | 'joinRight'>;

/** @internal */
export type ColumnConfig = Required<ColumnUserConfig>;

/** @internal */
export type TableConfig = Required<Omit<TableUserConfig, 'border' | 'columnDefault' | 'columns' | 'header' | 'spanningCells'>> & {
  readonly border: BorderConfig,
  readonly columns: ColumnConfig[],
  readonly spanningCellManager: SpanningCellManager,
};

/** @internal */
export type StreamConfig = Required<Omit<StreamUserConfig, 'border' | 'columnDefault' | 'columns'>> & {
  readonly border: BorderConfig,
  readonly columns: ColumnConfig[],
};

/** @internal */
export type BaseConfig = {
  readonly border: BorderConfig,
  readonly columns: ColumnConfig[],
  readonly drawVerticalLine: DrawVerticalLine,
  readonly drawHorizontalLine?: DrawHorizontalLine,
  readonly spanningCellManager?: SpanningCellManager,
};

/** @internal */
export type SeparatorGetter = (index: number, size: number) => string;

/** @internal */
export type CellCoordinates = {
  row: number,
  col: number,
};

/** @internal */
export type RangeCoordinate = {
  topLeft: CellCoordinates,
  bottomRight: CellCoordinates,
};

/** @internal */
export type RangeConfig = RangeCoordinate & Required<CellUserConfig>;

/** @internal */
export type ResolvedRangeConfig = RangeConfig & {
  height: number,
  width: number,
  extractCellContent: (rowIndex: number) => string[],
  extractBorderContent: (borderIndex: number) => string,
};
