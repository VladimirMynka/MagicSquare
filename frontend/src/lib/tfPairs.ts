import {
  greatestCommonDivisor,
  integerSquareRoot,
  type Coordinates,
} from "./magicSquare";

export interface TfPair {
  readonly m: bigint;
  readonly n: bigint;
}

export interface TfPairInfo {
  readonly pair: TfPair;
  readonly f: bigint;
  readonly tf: bigint | null;
  readonly squareMultiplier: bigint | null;
  readonly error: "degenerate" | "factorization-limit" | null;
}

export interface Rational {
  readonly numerator: bigint;
  readonly denominator: bigint;
}

export interface CongruentPoint {
  readonly x: Rational;
  readonly y: Rational;
}

export interface F4Seed {
  readonly u: bigint;
  readonly v: bigint;
  readonly w: bigint;
  readonly tf: bigint;
}

export type ParallelSixNineKind = "ACEFGH" | "ABDFHJ";

const FACTOR_INPUT_LIMIT = 1_000_000_000n;

function absolute(value: bigint): bigint {
  return value < 0n ? -value : value;
}

function gcd(left: bigint, right: bigint): bigint {
  return greatestCommonDivisor(left, right);
}

export function normalizePair(pair: TfPair): TfPair {
  if (pair.m === 0n && pair.n === 0n) return pair;
  const divisor = gcd(pair.m, pair.n);
  let m = divisor === 0n ? pair.m : pair.m / divisor;
  let n = divisor === 0n ? pair.n : pair.n / divisor;
  if (n < 0n || (n === 0n && m < 0n)) {
    m = -m;
    n = -n;
  }
  return { m, n };
}

export function fValue(pair: TfPair): bigint {
  return pair.m * pair.n * (pair.m - pair.n) * (pair.m + pair.n);
}

function togglePrimeParity(
  parity: Map<bigint, boolean>,
  prime: bigint,
  power: number,
) {
  if (power % 2 === 0) return;
  parity.set(prime, !parity.get(prime));
}

function factorParity(value: bigint, parity: Map<bigint, boolean>): boolean {
  let remainder = absolute(value);
  if (remainder > FACTOR_INPUT_LIMIT) return false;
  let candidate = 2n;
  while (candidate * candidate <= remainder) {
    let power = 0;
    while (remainder % candidate === 0n) {
      remainder /= candidate;
      power += 1;
    }
    togglePrimeParity(parity, candidate, power);
    candidate = candidate === 2n ? 3n : candidate + 2n;
  }
  if (remainder > 1n) togglePrimeParity(parity, remainder, 1);
  return true;
}

export function inspectTfPair(rawPair: TfPair): TfPairInfo {
  const pair = normalizePair(rawPair);
  const factors = [pair.m, pair.n, pair.m - pair.n, pair.m + pair.n];
  if (factors.some((factor) => factor === 0n)) {
    return {
      pair,
      f: 0n,
      tf: null,
      squareMultiplier: null,
      error: "degenerate",
    };
  }

  const parity = new Map<bigint, boolean>();
  if (!factors.every((factor) => factorParity(factor, parity))) {
    return {
      pair,
      f: fValue(pair),
      tf: null,
      squareMultiplier: null,
      error: "factorization-limit",
    };
  }

  const f = fValue(pair);
  let tf = f < 0n ? -1n : 1n;
  for (const [prime, odd] of parity) {
    if (odd) tf *= prime;
  }
  const square = f / tf;
  const root = integerSquareRoot(square);
  if (root * root !== square) {
    throw new Error("The squarefree decomposition is inconsistent");
  }
  return {
    pair,
    f,
    tf,
    squareMultiplier: root,
    error: null,
  };
}

function rational(numerator: bigint, denominator = 1n): Rational {
  if (denominator === 0n) throw new Error("Rational denominator is zero");
  const divisor = gcd(numerator, denominator);
  let nextNumerator = numerator / divisor;
  let nextDenominator = denominator / divisor;
  if (nextDenominator < 0n) {
    nextNumerator = -nextNumerator;
    nextDenominator = -nextDenominator;
  }
  return { numerator: nextNumerator, denominator: nextDenominator };
}

function subtractRational(left: Rational, right: Rational): Rational {
  return rational(
    left.numerator * right.denominator - right.numerator * left.denominator,
    left.denominator * right.denominator,
  );
}

function multiplyRational(left: Rational, right: Rational): Rational {
  return rational(
    left.numerator * right.numerator,
    left.denominator * right.denominator,
  );
}

function divideRational(left: Rational, right: Rational): Rational {
  return rational(
    left.numerator * right.denominator,
    left.denominator * right.numerator,
  );
}

function negateRational(value: Rational): Rational {
  return { numerator: -value.numerator, denominator: value.denominator };
}

function equalRational(left: Rational, right: Rational): boolean {
  return (
    left.numerator === right.numerator &&
    left.denominator === right.denominator
  );
}

export function pairToCongruentPoint(
  info: TfPairInfo,
  sign: 1 | -1,
): CongruentPoint | null {
  if (
    info.error ||
    info.tf === null ||
    info.tf <= 0n ||
    info.squareMultiplier === null ||
    info.pair.n === 0n
  ) {
    return null;
  }
  const { m, n } = info.pair;
  const tf = info.tf;
  return {
    x: rational(tf * m, n),
    y: rational(
      BigInt(sign) * tf * tf * info.squareMultiplier,
      n * n,
    ),
  };
}

export function addCongruentPoints(
  left: CongruentPoint | null,
  right: CongruentPoint | null,
  tf: bigint,
): CongruentPoint | null {
  return addShortWeierstrassPoints(left, right, -(tf * tf));
}

function addShortWeierstrassPoints(
  left: CongruentPoint | null,
  right: CongruentPoint | null,
  linearCoefficient: bigint,
): CongruentPoint | null {
  if (left === null) return right;
  if (right === null) return left;

  if (
    equalRational(left.x, right.x) &&
    equalRational(left.y, negateRational(right.y))
  ) {
    return null;
  }

  let slope: Rational;
  if (equalRational(left.x, right.x) && equalRational(left.y, right.y)) {
    if (left.y.numerator === 0n) return null;
    const threeXSquare = multiplyRational(
      rational(3n),
      multiplyRational(left.x, left.x),
    );
    slope = divideRational(
      addIntegerToRational(threeXSquare, linearCoefficient),
      multiplyRational(rational(2n), left.y),
    );
  } else {
    slope = divideRational(
      subtractRational(right.y, left.y),
      subtractRational(right.x, left.x),
    );
  }

  const x = subtractRational(
    subtractRational(multiplyRational(slope, slope), left.x),
    right.x,
  );
  const y = subtractRational(
    multiplyRational(slope, subtractRational(left.x, x)),
    left.y,
  );
  return { x, y };
}

function addIntegerToRational(
  value: Rational,
  integer: bigint,
): Rational {
  return rational(
    value.numerator + integer * value.denominator,
    value.denominator,
  );
}

export function negateCongruentPoint(
  point: CongruentPoint | null,
): CongruentPoint | null {
  return point === null
    ? null
    : { x: point.x, y: negateRational(point.y) };
}

export function congruentPointToPair(
  point: CongruentPoint | null,
  tf: bigint,
): TfPair | null {
  if (point === null) return null;
  return normalizePair({
    m: point.x.numerator,
    n: tf * point.x.denominator,
  });
}

export function f4PairsFromParameters(
  u: bigint,
  v: bigint,
  w: bigint,
): readonly [TfPairInfo, TfPairInfo] | null {
  const left = inspectTfPair({ m: u, n: v });
  const right = inspectTfPair({ m: u, n: w });
  if (
    left.error ||
    right.error ||
    left.tf === null ||
    right.tf !== left.tf ||
    (left.pair.m === right.pair.m && left.pair.n === right.pair.n)
  ) {
    return null;
  }
  return [left, right];
}

const f4CatalogCache = new Map<number, readonly F4Seed[]>();

export function f4SeedCatalog(limit = 64): readonly F4Seed[] {
  const cached = f4CatalogCache.get(limit);
  if (cached) return cached;
  const seeds: F4Seed[] = [];
  for (let u = 3n; u <= BigInt(limit); u += 1n) {
    const byTf = new Map<bigint, TfPairInfo[]>();
    for (let v = 1n; v < u; v += 1n) {
      if (gcd(u, v) !== 1n) continue;
      const info = inspectTfPair({ m: u, n: v });
      if (info.error || info.tf === null || info.tf <= 0n) continue;
      const bucket = byTf.get(info.tf) ?? [];
      bucket.push(info);
      byTf.set(info.tf, bucket);
    }
    for (const [tf, bucket] of byTf) {
      for (let left = 0; left < bucket.length; left += 1) {
        for (let right = left + 1; right < bucket.length; right += 1) {
          if (absolute(bucket[left].f) === absolute(bucket[right].f)) continue;
          seeds.push({
            u,
            v: bucket[left].pair.n,
            w: bucket[right].pair.n,
            tf,
          });
        }
      }
    }
  }
  f4CatalogCache.set(limit, seeds);
  return seeds;
}

export function f9PairsFromMultiple(
  multiple: number,
): readonly [TfPairInfo, TfPairInfo] | null {
  if (!Number.isSafeInteger(multiple) || multiple === 0) return null;
  let coefficient = Math.abs(multiple);
  let addend: CongruentPoint | null = {
    x: rational(2n),
    y: rational(multiple < 0 ? -2n : 2n),
  };
  let point: CongruentPoint | null = null;
  while (coefficient > 0) {
    if (coefficient % 2 === 1) {
      point = addShortWeierstrassPoints(point, addend, -2n);
    }
    coefficient = Math.floor(coefficient / 2);
    if (coefficient > 0) {
      addend = addShortWeierstrassPoints(addend, addend, -2n);
    }
  }
  if (point === null) return null;
  const first = normalizePair({
    m: point.x.numerator,
    n: point.x.denominator,
  });
  const second = normalizePair({
    m:
      point.x.numerator * point.x.numerator -
      point.x.denominator * point.x.denominator,
    n: point.x.denominator * point.x.denominator,
  });
  const left = inspectTfPair(first);
  const right = inspectTfPair(second);
  if (
    left.error ||
    right.error ||
    left.tf === null ||
    right.tf !== left.tf
  ) {
    return null;
  }
  return [left, right];
}

function squareSumSquare(pair: TfPair): bigint {
  const sum = pair.m * pair.m + pair.n * pair.n;
  return sum * sum;
}

export function parallelSixNineCoordinates(
  left: TfPairInfo,
  right: TfPairInfo,
  kind: ParallelSixNineKind,
): Coordinates | null {
  if (
    left.error ||
    right.error ||
    left.tf === null ||
    right.tf === null ||
    left.tf !== right.tf
  ) {
    return null;
  }
  const f1 = left.f;
  const f2 = right.f;
  const divisor = gcd(f1, f2);
  if (divisor === 0n) return null;
  const sum1 = squareSumSquare(left.pair);
  const sum2 = squareSumSquare(right.pair);
  const commonY = (4n * f1 * f2) / divisor;

  if (kind === "ACEFGH") {
    const center = (f1 * sum2) / divisor;
    const cellA = (f2 * sum1) / divisor;
    return [center, cellA - center, commonY];
  }

  let cellB = (f2 * sum1) / divisor;
  let cellA = (f1 * sum2) / divisor;
  let y = commonY;
  if ((cellA + cellB) % 2n !== 0n) {
    cellA *= 4n;
    cellB *= 4n;
    y *= 4n;
  }
  return [(cellA + cellB) / 2n, (cellA - cellB) / 2n, y];
}
