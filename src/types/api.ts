export type DrawLinePredicate = (index: number, size: number) => boolean;
export type DrawVerticalLine = DrawLinePredicate;
export type DrawHorizontalLine = DrawLinePredicate;

export type BorderUserConfig = {
  readonly topLeft?: string,
  readonly topRight?: string,
  readonly topBody?: string,
  readonly topJoin?: string,

  readonly bottomLeft?: string,
  readonly bottomRight?: string,
  readonly bottomBody?: string,
  readonly bottomJoin?: string,

  readonly bodyRight?: string,
  readonly bodyLeft?: string,
  readonly bodyJoin?: string,

  readonly joinLeft?: string,
  readonly joinRight?: string,
  readonly joinBody?: string,
  readonly joinJoin?: string,
};

export type BorderConfig = Required<BorderUserConfig>;

export type ColumnUserConfig = {

  /**
   * Cell content horizontal alignment (default: left)
   */
  readonly alignment?: 'center' | 'left' | 'right',

  /**
   * Column width (default: auto calculation based on the cell content)
   */
  readonly width?: number,

  /**
   * Number of characters are which the content will be truncated (default: Infinity)
   */
  readonly truncate?: number,

  /**
   * Cell content padding width left (default: 1)
   */
  readonly paddingLeft?: number,

  /**
   * Cell content padding width right (default: 1)
   */
  readonly paddingRight?: number,

  /**
   * If true, the text is broken at the nearest space or one of the special characters: "\|/_.,;-"
   */
  readonly wrapWord?: boolean,
};

export type BaseUserConfig = {

  /**
   * Custom border
   */
  readonly border?: BorderUserConfig,

  /**
   * Default values for all columns. Column specific settings overwrite the default values.
   */
  readonly columnDefault?: ColumnUserConfig,

  /**
   * Column specific configuration.
   */
  readonly columns?: Indexable<ColumnUserConfig>,

  /**
   * Used to tell whether to draw a vertical line.
   * This callback is called for each non-content line of the table.
   * The default behavior is to always return true.
   */
  readonly drawVerticalLine?: DrawVerticalLine,
};

export type TableUserConfig = BaseUserConfig & {

  /**
   * Used to tell whether to draw a horizontal line.
   * This callback is called for each non-content line of the table.
   * The default behavior is to always return true.
   */
  readonly drawHorizontalLine?: DrawHorizontalLine,

  /**
   * Horizontal lines inside the table are not drawn.
   */
  readonly singleLine?: boolean,
};

export type StreamUserConfig = BaseUserConfig & {

  /**
   * The number of columns
   */
  readonly columnCount: number,

  /**
   * Default values for all columns. Column specific settings overwrite the default values.
   */
  readonly columnDefault: ColumnUserConfig & {

    /**
     * The default width for each column
     */
    readonly width: number,
  },
};

export type WritableStream = {
  readonly write: (rows: string[]) => void,
};

export type Indexable<T> = {
  readonly [index: number]: T,
};

