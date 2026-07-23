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
  entriesDistinct: boolean;
}

export const FACTORIZATION_LIMIT = 1_000_000_000_000n;

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

export function isNondegenerateCoordinates([
  ,
  x,
  y,
]: Coordinates): boolean {
  return [
    x,
    y,
    x - y,
    x + y,
    x - 2n * y,
    x + 2n * y,
    2n * x - y,
    2n * x + y,
  ].every((factor) => factor !== 0n);
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
    entriesDistinct: isNondegenerateCoordinates(coordinates),
  };
}

export function formatInteger(value: bigint): string {
  const sign = value < 0n ? "−" : "";
  const digits = (value < 0n ? -value : value).toString();
  return `${sign}${digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f")}`;
}

export function greatestCommonDivisor(...values: readonly bigint[]): bigint {
  let divisor = 0n;

  for (const value of values) {
    let remainder = value < 0n ? -value : value;
    while (remainder !== 0n) {
      const next = divisor % remainder;
      divisor = remainder;
      remainder = next;
    }
  }

  return divisor;
}

export function minimizeCoordinates(coordinates: Coordinates): Coordinates {
  const divisor = greatestCommonDivisor(...coordinates);
  if (divisor === 0n || divisor === 1n) return coordinates;
  return coordinates.map((value) => value / divisor) as unknown as Coordinates;
}

export function divideCoordinates(
  coordinates: Coordinates,
  divisor: bigint,
): Coordinates {
  if (divisor <= 0n) {
    throw new Error("Coordinate divisor must be positive");
  }
  if (coordinates.some((value) => value % divisor !== 0n)) {
    throw new Error("Coordinate divisor must divide every coordinate");
  }
  return coordinates.map((value) => value / divisor) as unknown as Coordinates;
}

export function greatestSquareDivisor(value: bigint): bigint | null {
  let remainder = value < 0n ? -value : value;
  if (remainder < 2n) return 1n;
  if (isPerfectSquare(remainder)) return remainder;
  if (remainder > FACTORIZATION_LIMIT) return null;

  let squareDivisor = 1n;
  let candidate = 2n;
  while (candidate * candidate <= remainder) {
    let power = 0;
    while (remainder % candidate === 0n) {
      remainder /= candidate;
      power += 1;
    }
    const evenPower = power - (power % 2);
    if (evenPower > 0) {
      squareDivisor *= candidate ** BigInt(evenPower);
    }
    candidate = candidate === 2n ? 3n : candidate + 2n;
  }
  return squareDivisor;
}

const SUPERSCRIPT = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"] as const;

function superscript(value: number): string {
  return String(value)
    .split("")
    .map((digit) => SUPERSCRIPT[Number(digit)])
    .join("");
}

export function factorInteger(value: bigint): string | null {
  if (value === 0n) return "0";
  if (value === 1n) return "1";
  if (value === -1n) return "−1";

  let remainder = value < 0n ? -value : value;
  if (remainder > FACTORIZATION_LIMIT) return null;

  const factors: string[] = [];
  let candidate = 2n;
  while (candidate * candidate <= remainder) {
    let power = 0;
    while (remainder % candidate === 0n) {
      remainder /= candidate;
      power += 1;
    }
    if (power > 0) {
      factors.push(`${candidate}${power > 1 ? superscript(power) : ""}`);
    }
    candidate = candidate === 2n ? 3n : candidate + 2n;
  }
  if (remainder > 1n) factors.push(remainder.toString());

  return `${value < 0n ? "−" : ""}${factors.join(" · ")}`;
}
