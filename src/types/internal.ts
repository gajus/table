import type {
  BorderConfig,
  ColumnUserConfig, DrawVerticalLine, HeaderUserConfig, StreamUserConfig, TableUserConfig,
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
export type ColumnConfig = Required<ColumnUserConfig> & {
  width: number,
};

/** @internal */
export type HeaderConfig = Required<HeaderUserConfig>;

/** @internal */
export type TableConfig = Required<Omit<TableUserConfig, 'columnDefault' | 'header'>> & {
  readonly border: BorderConfig,
  readonly columns: ColumnConfig[],
  readonly header?: HeaderConfig,
};

/** @internal */
export type StreamConfig = Required<Omit<StreamUserConfig, 'columnDefault' >> & {
  readonly border: BorderConfig,
  readonly columns: ColumnConfig[],
};

/** @internal */
export type BaseConfig = {
  readonly border: BorderConfig,
  readonly columns: ColumnConfig[],
  readonly drawVerticalLine: DrawVerticalLine,
};

/** @internal */
export type SeparatorGetter = (index: number, size: number) => string;
