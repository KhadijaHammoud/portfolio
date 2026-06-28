type Point = {
  x: number;
  y: number;
};

export type WalkPath = {
  start: Point;
  end: Point;
};

export type PawStep = {
  index: number;
  left: string;
  top: string;
};
