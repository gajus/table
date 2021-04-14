import type {
  BorderUserConfig,
  ColumnUserConfig, DrawVerticalLine, Indexable, StreamUserConfig, TableUserConfig,
} from './api';

/** @internal */
export type Cell = string;

/** @internal */
export type Row = Cell[];

/** @internal */
export type BorderConfig = Required<BorderUserConfig>;

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
export type TableConfig = Required<Omit<TableUserConfig, 'columnDefault'>> & {
  readonly border: BorderConfig,
  readonly columns: Indexable<ColumnConfig>,
};

/** @internal */
export type StreamConfig = Required<Omit<StreamUserConfig, 'columnDefault'>> & {
  readonly border: BorderConfig,
  readonly columns: Indexable<ColumnConfig>,
};

/** @internal */
export type BaseConfig = {
  readonly border: BorderConfig,
  readonly columns: Indexable<ColumnConfig>,
  readonly drawVerticalLine: DrawVerticalLine,
};
