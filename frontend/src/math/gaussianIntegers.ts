export type FactorKind =
  | "two"
  | "split"
  | "inert-even"
  | "inert-odd";

export interface PrimeFactor {
  prime: number;
  exponent: number;
  kind: FactorKind;
}

export interface GaussianInteger {
  re: number;
  im: number;
}

export interface GaussianFactorRow {
  id: string;
  prime: number;
  copy: number;
  kind: Exclude<FactorKind, "inert-odd">;
  left: GaussianInteger;
  right: GaussianInteger;
  swappable: boolean;
}

export interface SquareRepresentation {
  x: number;
  y: number;
}

export function factorInteger(value: number): PrimeFactor[] {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError("factorInteger requires a positive integer");
  }

  let remaining = value;
  const factors: PrimeFactor[] = [];
  for (let prime = 2; prime * prime <= remaining; prime += prime === 2 ? 1 : 2) {
    if (remaining % prime !== 0) continue;
    let exponent = 0;
    while (remaining % prime === 0) {
      remaining /= prime;
      exponent += 1;
    }
    factors.push({
      prime,
      exponent,
      kind:
        prime === 2
          ? "two"
          : prime % 4 === 1
            ? "split"
            : exponent % 2 === 0
              ? "inert-even"
              : "inert-odd",
    });
  }

  if (remaining > 1) {
    factors.push({
      prime: remaining,
      exponent: 1,
      kind:
        remaining === 2
          ? "two"
          : remaining % 4 === 1
            ? "split"
            : "inert-odd",
    });
  }

  return factors;
}

export function isSumOfTwoSquaresFactorization(
  factors: readonly PrimeFactor[],
): boolean {
  return factors.every((factor) => factor.kind !== "inert-odd");
}

export function squareRepresentations(value: number): SquareRepresentation[] {
  if (!Number.isInteger(value) || value < 1) return [];
  const representations: SquareRepresentation[] = [];
  for (let x = 0; 2 * x * x <= value; x += 1) {
    const remaining = value - x * x;
    const y = Math.trunc(Math.sqrt(remaining));
    if (y * y === remaining) representations.push({ x, y });
  }
  return representations;
}

export function primeOneModFourRepresentation(
  prime: number,
): GaussianInteger | null {
  if (!Number.isInteger(prime) || prime <= 2 || prime % 4 !== 1) return null;
  for (let a = 1; a * a <= prime; a += 1) {
    const bSquared = prime - a * a;
    const b = Math.trunc(Math.sqrt(bSquared));
    if (b > 0 && b * b === bSquared) {
      return a <= b ? { re: a, im: b } : { re: b, im: a };
    }
  }
  return null;
}

export function gaussianFactorRows(
  factors: readonly PrimeFactor[],
): GaussianFactorRow[] {
  const rows: GaussianFactorRow[] = [];

  for (const factor of factors) {
    if (factor.kind === "two") {
      for (let copy = 0; copy < factor.exponent; copy += 1) {
        rows.push({
          id: `${factor.prime}-${copy}`,
          prime: factor.prime,
          copy,
          kind: "two",
          left: { re: 1, im: 1 },
          right: { re: 1, im: -1 },
          swappable: true,
        });
      }
      continue;
    }

    if (factor.kind === "split") {
      const representation = primeOneModFourRepresentation(factor.prime);
      if (!representation) {
        throw new Error(`Missing two-square representation for ${factor.prime}`);
      }
      for (let copy = 0; copy < factor.exponent; copy += 1) {
        rows.push({
          id: `${factor.prime}-${copy}`,
          prime: factor.prime,
          copy,
          kind: "split",
          left: representation,
          right: { re: representation.re, im: -representation.im },
          swappable: true,
        });
      }
      continue;
    }

    const pairedCopies = Math.floor(factor.exponent / 2);
    for (let copy = 0; copy < pairedCopies; copy += 1) {
      rows.push({
        id: `${factor.prime}-${copy}`,
        prime: factor.prime,
        copy,
        kind: "inert-even",
        left: { re: factor.prime, im: 0 },
        right: { re: factor.prime, im: 0 },
        swappable: false,
      });
    }
  }

  return rows;
}

export function multiplyGaussian(
  left: GaussianInteger,
  right: GaussianInteger,
): GaussianInteger {
  return {
    re: left.re * right.re - left.im * right.im,
    im: left.re * right.im + left.im * right.re,
  };
}

export function gaussianProduct(
  values: readonly GaussianInteger[],
): GaussianInteger {
  return values.reduce<GaussianInteger>(
    (product, value) => multiplyGaussian(product, value),
    { re: 1, im: 0 },
  );
}

export function normalizedRepresentation(
  value: GaussianInteger,
): SquareRepresentation {
  const coordinates = [Math.abs(value.re), Math.abs(value.im)].sort(
    (left, right) => left - right,
  );
  return { x: coordinates[0], y: coordinates[1] };
}

export function gaussianNorm(value: GaussianInteger): number {
  return value.re * value.re + value.im * value.im;
}
