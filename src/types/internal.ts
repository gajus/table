import type {
  BorderConfig,
  ColumnUserConfig, DrawVerticalLine, HeaderUserConfig, Indexable, StreamUserConfig, TableUserConfig,
} from './api';

/**
 * @internal
 */
export type Cell = string;

/**
 * @internal
 */
export type Row = Cell[];

/**
 * @internal
 */
export type TopBorderConfig = Pick<BorderConfig, 'topBody' | 'topJoin' | 'topLeft' | 'topRight'>;

/**
 * @internal
 */
export type BottomBorderConfig = Pick<BorderConfig, 'bottomBody' | 'bottomJoin' | 'bottomLeft' | 'bottomRight'>;

/**
 * @internal
 */
export type BodyBorderConfig = Pick<BorderConfig, 'bodyJoin' | 'bodyLeft' | 'bodyRight'>;

/**
 * @internal
 */
export type JoinBorderConfig = Pick<BorderConfig, 'joinBody' | 'joinJoin' | 'joinLeft' | 'joinRight'>;

/**
 * @internal
 */
export type ColumnConfig = Required<ColumnUserConfig>;

/**
 * @internal
 */
export type HeaderConfig = Required<HeaderUserConfig>;

/**
 * @internal
 */
export type TableConfig = Required<Omit<TableUserConfig, 'border' | 'columnDefault' | 'columns' | 'header'>> & {
  readonly border: BorderConfig,
  readonly columns: ColumnConfig[],
  readonly header?: HeaderConfig,
};

/**
 * @internal
 */
export type StreamConfig = Required<Omit<StreamUserConfig, 'border' | 'columnDefault' | 'columns'>> & {
  readonly border: BorderConfig,
  readonly columns: Indexable<ColumnConfig>,
};

/**
 * @internal
 */
export type BaseConfig = {
  readonly border: BorderConfig,
  readonly columns: Indexable<ColumnConfig>,
  readonly drawVerticalLine: DrawVerticalLine,
};

/**
 * @internal
 */
export type SeparatorGetter = (index: number, size: number) => string;
