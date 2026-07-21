export const POSITIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"] as const;

export type Position = (typeof POSITIONS)[number];
export type Coordinates = readonly [center: bigint, x: bigint, y: bigint];

export interface SquareCell {
  position: Position;
  value: bigint;
  isSquare: boolean;
}

export interface SquareSnapshot {
  cells: readonly SquareCell[];
  magicSum: bigint;
  squarePositions: readonly Position[];
  lineSumsAgree: boolean;
}

export function valuesFromCoordinates([
  center,
  x,
  y,
]: Coordinates): readonly bigint[] {
  return [
    center + x,
    center - x + y,
    center - y,
    center - x - y,
    center,
    center + x + y,
    center + y,
    center + x - y,
    center - x,
  ];
}

export function isPerfectSquare(value: bigint): boolean {
  if (value < 0n) return false;
  if (value < 2n) return true;

  let estimate = value;
  let next = (estimate + 1n) / 2n;

  while (next < estimate) {
    estimate = next;
    next = (estimate + value / estimate) / 2n;
  }

  return estimate * estimate === value;
}

export function createSnapshot(coordinates: Coordinates): SquareSnapshot {
  const values = valuesFromCoordinates(coordinates);
  const cells = POSITIONS.map((position, index) => ({
    position,
    value: values[index],
    isSquare: isPerfectSquare(values[index]),
  }));
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as const;
  const sums = lines.map(([a, b, c]) => values[a] + values[b] + values[c]);

  return {
    cells,
    magicSum: coordinates[0] * 3n,
    squarePositions: cells
      .filter((cell) => cell.isSquare)
      .map((cell) => cell.position),
    lineSumsAgree: sums.every((sum) => sum === sums[0]),
  };
}

export function formatInteger(value: bigint): string {
  const sign = value < 0n ? "−" : "";
  const digits = (value < 0n ? -value : value).toString();
  return `${sign}${digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f")}`;
}
