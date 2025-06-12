export const DEFAULT_GRID_SETTINGS: Readonly<GridSettings> = {
  grayScale: 50,
  gridSize: 10,
};

export type GridSettings = {
  grayScale: number;
  gridSize: number;
};
