import type { Coordinates, Position } from "./magicSquare";
import type { Locale } from "../i18n";

export type ParameterStrings = readonly [string, string, string, string];
export type FamilyLevel = 4 | 5;
export type FamilyGroup =
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "brown"
  | "dark-gray"
  | "light-gray"
  | "red-red"
  | "red-yellow"
  | "red-blue"
  | "yellow-blue"
  | "blue-blue"
  | "yellow-brown";
export type ProofColor =
  | "red-light"
  | "red-dark"
  | "yellow"
  | "blue-light"
  | "blue-dark"
  | "brown"
  | "green"
  | "gray-dark"
  | "gray-light";
export type CommonProofId =
  | "arithmetic-progression"
  | "two-square-norm"
  | "sqrt-minus-two-norm"
  | "weighted-conic"
  | "diagonal-quadric-projection";

export interface ProofJustification {
  id: string;
  label: string;
  color: ProofColor;
  positions: readonly Position[];
  relationLatex: string;
  commonProofId: CommonProofId;
}

export interface FamilyDefinition {
  id: string;
  mask: string;
  positions: readonly Position[];
  level: FamilyLevel;
  group: FamilyGroup;
  groupLabel: string;
  title: string;
  summary: string;
  theorem: string;
  proofStatus: "proof-core" | "legacy-formula" | "browser-certificate";
  coverageStatus:
    | "complete-up-to-equivalence"
    | "algorithmic-up-to-equivalence"
    | "parametric-subfamily";
  orbitDescription?: string;
  relationCoefficients?: readonly number[];
  integralityScale?: number;
  parametrizationKind?: "red-conic" | "quadric-projection";
  reconstructionLatex: string;
  justifications: readonly ProofJustification[];
  defaults: ParameterStrings;
  generate: (parameters: ParameterStrings) => Coordinates;
}

type FourValues = [bigint, bigint, bigint, bigint];
type FiveValues = [bigint, bigint, bigint, bigint, bigint];

function bigInts(values: ParameterStrings): [bigint, bigint, bigint, bigint] {
  return values.map((value) => BigInt(value)) as [
    bigint,
    bigint,
    bigint,
    bigint,
  ];
}

function squares(values: readonly bigint[]): bigint[] {
  return values.map((value) => value * value);
}

function gcd(left: bigint, right: bigint): bigint {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function sameParity(
  values: FiveValues,
  left: number,
  right: number,
): FiveValues {
  if ((values[left] - values[right]) % 2n === 0n) return values;
  return values.map((value) => value * 4n) as FiveValues;
}

function red(a: bigint, b: bigint, c: bigint): FourValues {
  const ab = a * b;
  const difference = a * a - b * b;
  return squares([
    (2n * ab - difference) * c,
    (a * a + b * b) * c,
    (2n * ab + difference) * c,
    0n,
  ]) as FourValues;
}

function yellow(a: bigint, b: bigint, c: bigint, d: bigint): FourValues {
  return squares([
    a * c + b * d,
    a * d - b * c,
    a * c - b * d,
    a * d + b * c,
  ]) as FourValues;
}

function redRed(parameters: ParameterStrings): FiveValues {
  const [a, b, c, d] = bigInts(parameters);
  const k1 = a * a + b * b;
  const k2 = c * c + d * d;
  const [A, , J] = red(a, b, k2);
  const [B, E, H] = red(c, d, k1);
  return [E, A, J, B, H];
}

function redRed2(parameters: ParameterStrings): FiveValues {
  const [a, b, c, d] = bigInts(parameters);
  const k1 = a * a - b * b + 2n * a * b;
  const k2 = c * c - d * d + 2n * c * d;
  const [, J, B] = red(b, a, k2);
  const [D, E, F] = red(d, c, k1);
  return [D, E, J, F, B];
}

function redRed3(parameters: ParameterStrings): FiveValues {
  const [a, b, c, d] = bigInts(parameters);
  const k1 = a * a - b * b + 2n * a * b;
  const k2 = c * c + d * d;
  const [A, E] = red(a, b, k2);
  const [D, J, B] = red(c, d, k1);
  return [J, E, A, D, B];
}

function redYellow(parameters: ParameterStrings): FiveValues {
  const [a, b, rawC, rawD] = bigInts(parameters);
  const c = gcd(2n * a * b, rawC);
  const d = gcd(a * a - b * b, rawD);
  const A = (2n * a * b) / c;
  const B = (a * a - b * b) / d;
  const E = a * a + b * b;
  return [E * E, ...yellow(A, B, c, d)];
}

function redYellow2(parameters: ParameterStrings): FiveValues {
  const [a, b, rawC, rawD] = bigInts(parameters);
  const c = gcd(b * (a + b), rawC);
  const d = gcd(a * (a - b), rawD);
  const A = (b * (a + b)) / c;
  const B = (a * (a - b)) / d;
  const J = a * a - b * b + 2n * a * b;
  return [J * J, ...yellow(A, B, c, d)];
}

function swapped(parameters: ParameterStrings): ParameterStrings {
  return [parameters[1], parameters[0], parameters[2], parameters[3]];
}

function redRedAcegj(parameters: ParameterStrings): Coordinates {
  const [E, , A, , G] = redRed(parameters);
  return [E, A - E, G - E];
}

function redRedBdefh(parameters: ParameterStrings): Coordinates {
  let values = redRed(parameters);
  values = sameParity(values, 3, 1);
  const [E, D, F, B] = values;
  return [E, (F - B) / 2n, (B - D) / 2n];
}

function redRedAbehj(parameters: ParameterStrings): Coordinates {
  const [E, , A, , H] = redRed(parameters);
  return [E, A - E, A - H];
}

function redRedBdefj(parameters: ParameterStrings): Coordinates {
  const [, E, J, , B] = redRed2(parameters);
  return [E, E - J, B - J];
}

function redRedBdfgj(parameters: ParameterStrings): Coordinates {
  let values = redRed2(parameters);
  values = sameParity(values, 3, 4);
  const [B, G, J, D, F] = values;
  return [(D + F) / 2n, G - B, B - J];
}

function redRedAbdej(parameters: ParameterStrings): Coordinates {
  const [J, E, , B] = redRed3(parameters);
  return [E, E - J, B - J];
}

function redYellowBdfhj(parameters: ParameterStrings): Coordinates {
  let values = redYellow(swapped(parameters));
  values = sameParity(values, 3, 4);
  const [J, B, , D, F] = values;
  return [(D + F) / 2n, (F - B) / 2n, B - J];
}

function redYellowAbdfj(parameters: ParameterStrings): Coordinates {
  let values = redYellow2(swapped(parameters));
  values = sameParity(values, 0, 2);
  const [D, J, F, B] = values;
  return [(D + F) / 2n, (F - B) / 2n, B - J];
}

function redYellowAcehj(parameters: ParameterStrings): Coordinates {
  const [A, E, C] = redYellow2(swapped(parameters));
  return [E, A - E, E - C];
}

function redYellowAcdeg(parameters: ParameterStrings): Coordinates {
  const [a, b, c, d] = bigInts(parameters);
  const { r, s, t } = redSeed(a, b);
  const N = c * c + d * d;
  const P = d * d - c * c;
  const Q = 2n * c * d;
  const A = P * r - Q * s;
  const E = N * s;
  const G = N * t;
  return [E * E, A * A - E * E, G * G - E * E];
}

function redYellowAbceh(parameters: ParameterStrings): Coordinates {
  const [a, b, c, d] = bigInts(parameters);
  const { s, t } = redSeed(a, b);
  const N = c * c + d * d;
  const P = d * d - c * c;
  const Q = 2n * c * d;
  const A = P * s - Q * t;
  const C = Q * s + P * t;
  const E = N * s;
  return [E * E, A * A - E * E, E * E - C * C];
}

function redYellowAcdef(parameters: ParameterStrings): Coordinates {
  const [, E, C, , A] = redYellow2(swapped(parameters));
  return [E, A - E, E - C];
}

function redYellowAbefj(parameters: ParameterStrings): Coordinates {
  const [E, A, B, J] = redYellow(swapped(parameters));
  return [E, A - E, B - J];
}

function redYellowAbfgj(parameters: ParameterStrings): Coordinates {
  let values = redYellow(swapped(parameters));
  values = sameParity(values, 2, 4);
  const [, B, A, , J] = values;
  return [(A + J) / 2n, (A - J) / 2n, B - J];
}

function redYellowBefgj(parameters: ParameterStrings): Coordinates {
  const [a, b, c, d] = bigInts(parameters);
  const { r, s, t } = redSeed(a, b);
  const K = t * t - s * s;
  const scale = 2n * c * d;
  const bRoot = scale * r;
  const fRoot = scale * t;
  const gRoot = scale * s;
  const eRoot = K * d * d + c * c;
  const jRoot = K * d * d - c * c;
  const E = eRoot * eRoot;
  const G = gRoot * gRoot;
  const J = jRoot * jRoot;
  if (J + G - E !== bRoot * bRoot || E + G - J !== fRoot * fRoot) {
    throw new Error("BEFGJ polynomial certificate failed");
  }
  return [E, E - J, G - E];
}

function redSeed(a: bigint, b: bigint) {
  return {
    r: -a * a + 2n * a * b + b * b,
    s: a * a + b * b,
    t: a * a + 2n * a * b - b * b,
  };
}

function redBlueParams(c: bigint, d: bigint) {
  return {
    P: c * c + 2n * d * d,
    Q: 2n * c * d,
    M: c * c - 2n * d * d,
  };
}

function redBlueAbcdh(parameters: ParameterStrings): Coordinates {
  const [a, b, c, d] = bigInts(parameters);
  const { r, s, t } = redSeed(a, b);
  const { P, Q, M } = redBlueParams(c, d);
  const [A, , C, , H] = squares([
    Q * t + P * r,
    P * t + 2n * Q * r,
    M * s,
    M * t,
    M * r,
  ]);
  return [A - H + C, H - C, A - H];
}

function redBlueAbcdj(parameters: ParameterStrings): Coordinates {
  const [a, b, c, d] = bigInts(parameters);
  const { r, s, t } = redSeed(a, b);
  const { P, Q, M } = redBlueParams(c, d);
  let values = squares([
    P * s + 2n * Q * t,
    M * r,
    Q * s + P * t,
    M * t,
    M * s,
  ]) as FiveValues;
  values = sameParity(values, 0, 4);
  const [A, , , D, J] = values;
  return [(A + J) / 2n, (A - J) / 2n, J - D];
}

function redBlueAbdef(parameters: ParameterStrings): Coordinates {
  const [a, b, c, d] = bigInts(parameters);
  const { r, s, t } = redSeed(a, b);
  const { P: N, Q, M: P } = redBlueParams(c, d);
  const [A, , , E, F] = squares([
    P * r + Q * t,
    P * t - 2n * Q * r,
    N * t,
    N * s,
    N * r,
  ]);
  return [E, A - E, F - A];
}

function normParams(parameters: ParameterStrings) {
  const [a, b, c, d] = bigInts(parameters);
  return {
    P: a * a - b * b,
    Q: 2n * a * b,
    N: a * a + b * b,
    U: c * c - 2n * d * d,
    V: 2n * c * d,
    M: c * c + 2n * d * d,
  };
}

function yellowBlueAbcde(parameters: ParameterStrings): Coordinates {
  const { P, Q, N, U, V, M } = normParams(parameters);
  const [A, , C, , E] = squares([
    -P * U + Q * M - N * V,
    -P * U + 2n * N * V - Q * M,
    -N * U - P * V,
    -P * M - Q * U,
    Q * V - N * M,
  ]);
  return [E, A - E, E - C];
}

function yellowBlueAbcgj(parameters: ParameterStrings): Coordinates {
  const { P, Q, N, U, V, M } = normParams(parameters);
  let values = squares([
    N * (2n * P * V - N * U),
    N * (Q * M - N * V - P * U),
    N * (-M * Q + 2n * N * V - P * U),
    N * (Q * U - M * P),
    N * (-M * N + 2n * Q * V),
  ]) as FiveValues;
  values = sameParity(values, 0, 4);
  const [A, , C, , J] = values;
  return [(A + J) / 2n, (A - J) / 2n, (A + J) / 2n - C];
}

function yellowBlueAbcgh(parameters: ParameterStrings): Coordinates {
  const { P, Q, N, U, V, M } = normParams(parameters);
  let values = squares([
    -Q * M - N * V - P * U,
    Q * M + 2n * N * V - P * U,
    2n * P * V - N * U,
    -2n * Q * V - N * M,
    -P * M - Q * U,
  ]) as FiveValues;
  values = sameParity(values, 2, 3);
  const [A, , C, G] = values;
  return [(C + G) / 2n, A - (C + G) / 2n, (G - C) / 2n];
}

function blueParameters(a: bigint, b: bigint) {
  return {
    U: a * a - 2n * b * b,
    V: 2n * a * b,
    M: a * a + 2n * b * b,
  };
}

function blueBlueAbcdf(parameters: ParameterStrings): Coordinates {
  const [a, b, c, d] = bigInts(parameters);
  const { U: U1, V: V1, M: M1 } = blueParameters(a, b);
  const { U: U2, V: V2, M: M2 } = blueParameters(c, d);
  let values = squares([
    M2 * (U1 * U2 + V1 * M2),
    M2 * (U1 * M2 - 2n * U2 * V1 - 2n * M1 * V2),
    M2 * (M2 * U1 + U2 * V1 - M1 * V2),
    M2 * (M1 * M2 - 2n * U1 * V2),
    M2 * (M1 * U2 + 2n * V1 * V2),
  ]) as FiveValues;
  values = sameParity(values, 3, 4);
  const [A, , C, D, F] = values;
  return [(D + F) / 2n, C - D, F - A];
}

function yellowBrownAbcdg(parameters: ParameterStrings): Coordinates {
  const [m, n, mu, nu] = bigInts(parameters);
  const r = -m * m + 2n * m * n + n * n;
  const s = m * m + n * n;
  const u = m * m + 2n * m * n - n * n;
  const K = 2n * r * r - s * s;
  const P = K * mu * mu - nu * nu;
  const Q = 2n * u * mu * nu;
  const aRoot = u * (K * mu * mu + nu * nu);
  const gRoot = Q * r - P * s;
  const center = P * P * s * s + Q * Q * r * r;
  const A = aRoot * aRoot;
  const G = gRoot * gRoot;
  return [center, A - center, G - center];
}

function support(
  id: string,
  label: string,
  color: ProofColor,
  positions: readonly Position[],
  relationLatex: string,
  commonProofId: CommonProofId,
): ProofJustification {
  return { id, label, color, positions, relationLatex, commonProofId };
}

const RED = "Красная арифметическая прогрессия";
const YELLOW = "Жёлтое равенство двух сумм";
const BLUE = "Голубая норма x² + 2y²";

const groupLabels: Record<FamilyGroup, string> = {
  red: "Красные 4/9",
  yellow: "Жёлтые 4/9",
  blue: "Голубые 4/9",
  green: "Зелёные 4/9",
  brown: "Коричневые 4/9",
  "dark-gray": "Тёмно-серые 4/9",
  "light-gray": "Светло-серые 4/9",
  "red-red": "Красно-красные",
  "red-yellow": "Красно-жёлтые",
  "red-blue": "Красно-голубые",
  "yellow-blue": "Жёлто-голубые",
  "blue-blue": "Голубо-голубые",
  "yellow-brown": "Жёлто-коричневые",
};

type FamilyInput = Omit<
  FamilyDefinition,
  "mask" | "groupLabel" | "level" | "coverageStatus"
> & {
  mask?: string;
  level?: FamilyLevel;
  coverageStatus?: FamilyDefinition["coverageStatus"];
};

function family(input: FamilyInput): FamilyDefinition {
  return {
    ...input,
    mask: input.mask ?? input.title,
    level: input.level ?? 5,
    coverageStatus: input.coverageStatus ?? "parametric-subfamily",
    groupLabel: groupLabels[input.group],
  };
}

type CellForm = readonly [center: number, x: number, y: number];

const CELL_FORMS: Readonly<Record<Position, CellForm>> = {
  A: [1, 1, 0],
  B: [1, -1, 1],
  C: [1, 0, -1],
  D: [1, -1, -1],
  E: [1, 0, 0],
  F: [1, 1, 1],
  G: [1, 0, 1],
  H: [1, 1, -1],
  J: [1, -1, 0],
};

function determinant3(matrix: readonly CellForm[]): number {
  const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

function numberGcd(left: number, right: number): number {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function primitiveRelation(positions: readonly Position[]): readonly number[] {
  const matrix = positions.map((position) => CELL_FORMS[position]);
  let coefficients = matrix.map((_, index) => {
    const minor = matrix.filter((__, candidate) => candidate !== index);
    return (index % 2 === 0 ? 1 : -1) * determinant3(minor);
  });
  const divisor = coefficients.reduce(numberGcd, 0) || 1;
  coefficients = coefficients.map((coefficient) => coefficient / divisor);
  const first = coefficients.find((coefficient) => coefficient !== 0) ?? 1;
  if (first < 0) coefficients = coefficients.map((coefficient) => -coefficient);
  return coefficients;
}

function independentTriple(positions: readonly Position[]): readonly [number, number, number] {
  const triples = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ] as const;
  const result = triples.find(
    (indices) =>
      determinant3(indices.map((index) => CELL_FORMS[positions[index]])) !== 0,
  );
  if (!result) throw new Error(`Rank below three for mask ${positions.join("")}`);
  return result;
}

function determinant3BigInt(matrix: readonly (readonly bigint[])[]): bigint {
  const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

function replaceColumn(
  matrix: readonly (readonly bigint[])[],
  column: number,
  values: readonly bigint[],
): readonly (readonly bigint[])[] {
  return matrix.map((row, rowIndex) =>
    row.map((value, candidate) => (candidate === column ? values[rowIndex] : value)),
  );
}

function reconstructFourCoordinates(
  positions: readonly Position[],
  values: readonly bigint[],
): Coordinates {
  const indices = independentTriple(positions);
  const matrix = indices.map((index) =>
    CELL_FORMS[positions[index]].map(BigInt),
  );
  const selected = indices.map((index) => values[index]);
  const determinant = determinant3BigInt(matrix);
  return [0, 1, 2].map(
    (column) => determinant3BigInt(replaceColumn(matrix, column, selected)) / determinant,
  ) as unknown as Coordinates;
}

function fourFamilyGenerator(
  positions: readonly Position[],
  coefficients: readonly number[],
  kind: "red-conic" | "quadric-projection",
): (parameters: ParameterStrings) => Coordinates {
  return (parameters) => {
    const [a, b, c, d] = bigInts(parameters);
    let roots: bigint[];
    if (kind === "red-conic") {
      const { r, s, t } = redSeed(a, b);
      const zeroIndex = coefficients.findIndex((coefficient) => coefficient === 0);
      const middleIndex = coefficients.findIndex(
        (coefficient) => Math.abs(coefficient) === 2,
      );
      const endIndexes = coefficients
        .map((coefficient, index) => ({ coefficient, index }))
        .filter(({ coefficient }) => Math.abs(coefficient) === 1)
        .map(({ index }) => index);
      roots = Array.from({ length: 4 }, () => 0n);
      roots[zeroIndex] = c * d;
      roots[middleIndex] = s * d;
      roots[endIndexes[0]] = r * d;
      roots[endIndexes[1]] = t * d;
    } else {
      const [k1, k2, k3] = coefficients.map(BigInt);
      const D = k1 * a * a + k2 * b * b + k3 * c * c;
      const L = k1 * a + k2 * b + k3 * c;
      roots = [D - 2n * L * a, D - 2n * L * b, D - 2n * L * c, D].map(
        (root) => root * d,
      );
    }
    const indices = independentTriple(positions);
    const determinant = BigInt(
      Math.abs(determinant3(indices.map((index) => CELL_FORMS[positions[index]]))),
    );
    const values = roots.map((root) => (root * determinant) ** 2n);
    return reconstructFourCoordinates(positions, values);
  };
}

function relationLatex(
  positions: readonly Position[],
  coefficients: readonly number[],
): string {
  const side = (positive: boolean) =>
    positions
      .map((position, index) => ({ position, coefficient: coefficients[index] }))
      .filter(({ coefficient }) => (positive ? coefficient > 0 : coefficient < 0))
      .map(({ position, coefficient }) => {
        const absolute = Math.abs(coefficient);
        return `${absolute === 1 ? "" : absolute}${position}`;
      })
      .join("+");
  return `${side(true)}=${side(false)}`;
}

function reconstructionLatex(positions: readonly Position[]): string {
  const indices = independentTriple(positions);
  const numeric = indices.map((index) => CELL_FORMS[positions[index]]);
  const matrix = numeric.map((row) => row.map(BigInt));
  let denominator = determinant3BigInt(matrix);
  const symbols = indices.map((index) => positions[index]);
  const expressions = [0, 1, 2].map((column) =>
    symbols.map((_, source) => {
      const unit = symbols.map((__, index) => BigInt(index === source));
      return determinant3BigInt(replaceColumn(matrix, column, unit));
    }),
  );
  if (denominator < 0n) {
    denominator = -denominator;
    expressions.forEach((row) => row.forEach((value, index) => (row[index] = -value)));
  }
  const format = (coefficients: readonly bigint[]) => {
    const divisor = coefficients
      .reduce((current, value) => gcd(current, value), denominator) || 1n;
    const reducedDenominator = denominator / divisor;
    const terms = coefficients
      .map((value, index) => ({ value: value / divisor, symbol: symbols[index] }))
      .filter(({ value }) => value !== 0n)
      .map(({ value, symbol }, index) => {
        const sign = value < 0n ? "-" : index === 0 ? "" : "+";
        const absolute = value < 0n ? -value : value;
        return `${sign}${absolute === 1n ? "" : absolute}${symbol}`;
      })
      .join("");
    return reducedDenominator === 1n
      ? terms
      : String.raw`\frac{${terms}}{${reducedDenominator}}`;
  };
  return String.raw`(E,x,y)=\left(${expressions.map(format).join(",\,")}\right)`;
}

const fourProofMetadata: Record<
  Extract<FamilyGroup, "red" | "yellow" | "blue" | "green" | "brown" | "dark-gray" | "light-gray">,
  { label: string; color: ProofColor; commonProofId: CommonProofId }
> = {
  red: { label: RED, color: "red-light", commonProofId: "arithmetic-progression" },
  yellow: { label: YELLOW, color: "yellow", commonProofId: "two-square-norm" },
  blue: { label: BLUE, color: "blue-light", commonProofId: "sqrt-minus-two-norm" },
  green: { label: "Зелёная диагональная квадрика", color: "green", commonProofId: "diagonal-quadric-projection" },
  brown: { label: "Коричневая взвешенная квадрика", color: "brown", commonProofId: "diagonal-quadric-projection" },
  "dark-gray": { label: "Тёмно-серая диагональная квадрика", color: "gray-dark", commonProofId: "diagonal-quadric-projection" },
  "light-gray": { label: "Светло-серая диагональная квадрика", color: "gray-light", commonProofId: "diagonal-quadric-projection" },
};

type FourGroup = keyof typeof fourProofMetadata;

const fourDefaults: Readonly<Record<string, ParameterStrings>> = {
  aceg: ["1", "4", "18", "1"],
  bdef: ["1", "2", "2", "1"],
  abce: ["1", "5", "4", "1"],
  aceh: ["2", "3", "4", "1"],
  acde: ["4", "1", "2", "1"],
  abej: ["1", "3", "1", "1"],
  abde: ["3", "1", "2", "1"],
  bdej: ["1", "2", "6", "1"],
  bcde: ["1", "2", "6", "1"],
  abeh: ["1", "2", "2", "1"],
  bdfh: ["1", "2", "4", "1"],
  acgj: ["1", "5", "7", "1"],
  bdfg: ["2", "1", "2", "1"],
  abcg: ["1", "2", "5", "1"],
  acfg: ["1", "2", "7", "1"],
  abdf: ["1", "2", "3", "1"],
  acdf: ["1", "2", "7", "1"],
  abch: ["1", "2", "7", "1"],
  abcd: ["1", "2", "7", "1"],
  abdj: ["1", "2", "6", "1"],
  abfj: ["1", "2", "4", "1"],
  abhj: ["1", "4", "2", "1"],
  acdh: ["1", "2", "2", "1"],
};

function fourOrbit(
  id: string,
  positions: readonly Position[],
  group: FourGroup,
  orbitDescription: string,
): FamilyDefinition {
  const coefficients = primitiveRelation(positions);
  const metadata = fourProofMetadata[group];
  const kind = group === "red" ? "red-conic" : "quadric-projection";
  const relation = relationLatex(positions, coefficients);
  const supportPositions = positions.filter((_, index) => coefficients[index] !== 0);
  const triple = independentTriple(positions);
  const integralityScale = Math.abs(
    determinant3(triple.map((index) => CELL_FORMS[positions[index]])),
  );
  return family({
    id,
    title: positions.join(""),
    positions,
    level: 4,
    group,
    summary: `${orbitDescription}. Единственная совместимость после исключения E, x, y: ${relation}.`,
    theorem: `four_of_nine_${id}_orbit`,
    proofStatus: "browser-certificate",
    coverageStatus:
      group === "red"
        ? "complete-up-to-equivalence"
        : "algorithmic-up-to-equivalence",
    orbitDescription,
    relationCoefficients: coefficients,
    integralityScale,
    parametrizationKind: kind,
    reconstructionLatex: reconstructionLatex(positions),
    defaults: fourDefaults[id],
    generate: fourFamilyGenerator(positions, coefficients, kind),
    justifications: [
      support(id, metadata.label, metadata.color, supportPositions, relation, metadata.commonProofId),
    ],
  });
}

export const FOUR_FAMILIES: readonly FamilyDefinition[] = [
  fourOrbit("aceg", ["A", "C", "E", "G"], "red", "Центр и три угла"),
  fourOrbit("bdef", ["B", "D", "E", "F"], "red", "Центр и три стороны"),
  fourOrbit("abce", ["A", "B", "C", "E"], "green", "Центр, соседние углы и сторона между ними"),
  fourOrbit("aceh", ["A", "C", "E", "H"], "yellow", "Центр, соседние углы и противоположная сторона"),
  fourOrbit("acde", ["A", "C", "D", "E"], "yellow", "Центр, соседние углы и сторона при одном из них"),
  fourOrbit("abej", ["A", "B", "E", "J"], "red", "Центр, противоположные углы и сторона"),
  fourOrbit("abde", ["A", "B", "D", "E"], "dark-gray", "Центр, соседние стороны и угол между ними"),
  fourOrbit("bdej", ["B", "D", "E", "J"], "red", "Центр, соседние стороны и противоположный угол"),
  fourOrbit("bcde", ["B", "C", "D", "E"], "blue", "Центр, соседние стороны и угол при одной из них"),
  fourOrbit("abeh", ["A", "B", "E", "H"], "red", "Центр, противоположные стороны и угол"),
  fourOrbit("bdfh", ["B", "D", "F", "H"], "yellow", "Четыре стороны"),
  fourOrbit("acgj", ["A", "C", "G", "J"], "yellow", "Четыре угла"),
  fourOrbit("bdfg", ["B", "D", "F", "G"], "red", "Три стороны и внешний угол"),
  fourOrbit("abcg", ["A", "B", "C", "G"], "brown", "Три угла и внутренняя сторона"),
  fourOrbit("acfg", ["A", "C", "F", "G"], "blue", "Три угла и внешняя сторона"),
  fourOrbit("abdf", ["A", "B", "D", "F"], "blue", "Три стороны и внутренний угол"),
  fourOrbit("acdf", ["A", "C", "D", "F"], "blue", "Соседние углы и не общие стороны при них"),
  fourOrbit("abch", ["A", "B", "C", "H"], "brown", "Соседние углы, общая сторона и противоположная сторона"),
  fourOrbit("abcd", ["A", "B", "C", "D"], "light-gray", "Соседние углы и две стороны при одном из них"),
  fourOrbit("abdj", ["A", "B", "D", "J"], "red", "Противоположные углы и стороны при одном из них"),
  fourOrbit("abfj", ["A", "B", "F", "J"], "yellow", "Противоположные углы и соседние стороны при них"),
  fourOrbit("abhj", ["A", "B", "H", "J"], "yellow", "Противоположные углы и противоположные стороны"),
  fourOrbit("acdh", ["A", "C", "D", "H"], "red", "Соседние углы и соседние стороны при невыбранном угле"),
];

export const FIVE_FAMILIES: readonly FamilyDefinition[] = [
  family({
    id: "acegj", title: "ACEGJ", positions: ["A", "C", "E", "G", "J"], group: "red-red",
    summary: "Две арифметические прогрессии квадратов пересекаются в центре E.", theorem: "legacy_red_red_acegj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,G-E)`, defaults: ["3", "4", "4", "5"], generate: redRedAcegj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("ceg", RED, "red-dark", ["C", "E", "G"], "C+G=2E", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdefh", title: "BDEFH", positions: ["B", "D", "E", "F", "H"], group: "red-red",
    summary: "Горизонтальная и вертикальная прогрессии квадратов с общим центром E.", theorem: "legacy_red_red_bdefh", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(E,\,\frac{F-B}{2},\,\frac{B-D}{2}\right)`, defaults: ["1", "2", "2", "3"], generate: redRedBdefh,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("beh", RED, "red-dark", ["B", "E", "H"], "B+H=2E", "arithmetic-progression"),
    ],
  }),
  family({
    id: "abehj", title: "ABEHJ", positions: ["A", "B", "E", "H", "J"], group: "red-red",
    summary: "Две красные прогрессии AEJ и BEH; семейство содержит известные усиления 6/9 и 7/9.", theorem: "legacy_red_red_abehj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,A-H)`, defaults: ["2", "3", "1", "2"], generate: redRedAbehj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("beh", RED, "red-dark", ["B", "E", "H"], "B+H=2E", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdefj", title: "BDEFJ", positions: ["B", "D", "E", "F", "J"], group: "red-red",
    summary: "Прогрессии DEF и BDJ согласованы одним четырёхпараметрическим генератором.", theorem: "legacy_red_red_bdefj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,E-J,\,B-J)`, defaults: ["1", "2", "2", "5"], generate: redRedBdefj,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("bdj", RED, "red-dark", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdfgj", title: "BDFGJ", positions: ["B", "D", "F", "G", "J"], group: "red-red",
    summary: "Две смещённые прогрессии BDJ и BGF пересекаются в клетке B.", theorem: "legacy_red_red_bdfgj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,G-B,\,B-J\right)`, defaults: ["1", "2", "2", "5"], generate: redRedBdfgj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("bgf", RED, "red-dark", ["B", "G", "F"], "B+F=2G", "arithmetic-progression"),
    ],
  }),
  family({
    id: "abdej", title: "ABDEJ", positions: ["A", "B", "D", "E", "J"], group: "red-red",
    summary: "Прогрессии AEJ и BDJ имеют общую нижнюю угловую клетку J.", theorem: "legacy_red_red_abdej", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,E-J,\,B-J)`, defaults: ["1", "2", "1", "2"], generate: redRedAbdej,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("bdj", RED, "red-dark", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdfhj", title: "BDFHJ", positions: ["B", "D", "F", "H", "J"], group: "red-yellow",
    summary: "Красная прогрессия BDJ и жёлтый прямоугольник BDFH.", theorem: "legacy_red_yellow_bdfhj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,\frac{F-B}{2},\,B-J\right)`, defaults: ["1", "2", "1", "3"], generate: redYellowBdfhj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("bdfh", YELLOW, "yellow", ["B", "D", "F", "H"], "B+H=D+F", "two-square-norm"),
    ],
  }),
  family({
    id: "abdfj", title: "ABDFJ", positions: ["A", "B", "D", "F", "J"], group: "red-yellow",
    summary: "Прогрессия BDJ пересекает равенство A+B=F+J.", theorem: "legacy_red_yellow_abdfj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,\frac{F-B}{2},\,B-J\right)`, defaults: ["1", "4", "1", "3"], generate: redYellowAbdfj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("abfj", YELLOW, "yellow", ["A", "B", "F", "J"], "A+B=F+J", "two-square-norm"),
    ],
  }),
  family({
    id: "acehj", title: "ACEHJ", positions: ["A", "C", "E", "H", "J"], group: "red-yellow",
    summary: "Прогрессия AEJ согласована с равенством C+E=H+J.", theorem: "legacy_red_yellow_acehj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: ["3", "2", "3", "1"], generate: redYellowAcehj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("cehj", YELLOW, "yellow", ["C", "E", "H", "J"], "C+E=H+J", "two-square-norm"),
    ],
  }),
  family({
    id: "acdeg", title: "ACDEG", positions: ["A", "C", "D", "E", "G"], group: "red-yellow",
    summary: "Прогрессия CEG и жёлтое равенство A+D=C+E.", theorem: "legacy_red_yellow_acdeg", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,G-E)`, defaults: ["3", "2", "2", "1"], generate: redYellowAcdeg,
    justifications: [
      support("ceg", RED, "red-light", ["C", "E", "G"], "C+G=2E", "arithmetic-progression"),
      support("acde", YELLOW, "yellow", ["A", "C", "D", "E"], "A+D=C+E", "two-square-norm"),
    ],
  }),
  family({
    id: "abceh", title: "ABCEH", positions: ["A", "B", "C", "E", "H"], group: "red-yellow",
    summary: "Прогрессия BEH и равенство A+C=E+H делят две клетки.", theorem: "legacy_red_yellow_abceh", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: ["1", "2", "1", "2"], generate: redYellowAbceh,
    justifications: [
      support("beh", RED, "red-light", ["B", "E", "H"], "B+H=2E", "arithmetic-progression"),
      support("aceh", YELLOW, "yellow", ["A", "C", "E", "H"], "A+C=E+H", "two-square-norm"),
    ],
  }),
  family({
    id: "acdef", title: "ACDEF", positions: ["A", "C", "D", "E", "F"], group: "red-yellow",
    summary: "Прогрессия DEF соединена с жёлтым равенством ACDE.", theorem: "legacy_red_yellow_acdef", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: ["1", "3", "1", "2"], generate: redYellowAcdef,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("acde", YELLOW, "yellow", ["A", "C", "D", "E"], "A+D=C+E", "two-square-norm"),
    ],
  }),
  family({
    id: "abefj", title: "ABEFJ", positions: ["A", "B", "E", "F", "J"], group: "red-yellow",
    summary: "Прогрессия AEJ пересекает жёлтую четвёрку ABFJ.", theorem: "legacy_red_yellow_abefj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,B-J)`, defaults: ["2", "3", "2", "1"], generate: redYellowAbefj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("abfj", YELLOW, "yellow", ["A", "B", "F", "J"], "A+B=F+J", "two-square-norm"),
    ],
  }),
  family({
    id: "abfgj", title: "ABFGJ", positions: ["A", "B", "F", "G", "J"], group: "red-yellow",
    summary: "Прогрессия BGF и равенство A+B=F+J образуют маску ABFGJ.", theorem: "legacy_red_yellow_abfgj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{A+J}{2},\,\frac{A-J}{2},\,B-J\right)`, defaults: ["1", "2", "2", "1"], generate: redYellowAbfgj,
    justifications: [
      support("bgf", RED, "red-light", ["B", "G", "F"], "B+F=2G", "arithmetic-progression"),
      support("abfj", YELLOW, "yellow", ["A", "B", "F", "J"], "A+B=F+J", "two-square-norm"),
    ],
  }),
  family({
    id: "befgj", title: "BEFGJ", positions: ["B", "E", "F", "G", "J"], group: "red-yellow",
    summary: "Пропущенная в исходном PDF орбита: прогрессия BGF и жёлтое равенство B+E=G+J.", theorem: "red_yellow_befgj_square_mask", proofStatus: "browser-certificate",
    coverageStatus: "algorithmic-up-to-equivalence",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,E-J,\,G-E)`, defaults: ["2", "1", "1", "1"], generate: redYellowBefgj,
    justifications: [
      support("bgf", RED, "red-light", ["B", "G", "F"], "B+F=2G", "arithmetic-progression"),
      support("begj", YELLOW, "yellow", ["B", "E", "G", "J"], "B+E=G+J", "two-square-norm"),
    ],
  }),
  family({
    id: "abcdh", title: "ABCDH", positions: ["A", "B", "C", "D", "H"], group: "red-blue",
    summary: "AP-тройка CDH, согласованная с нормой x² + 2y² на ABDH.", theorem: "red_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=(A-H+C,\,H-C,\,A-H)`, defaults: ["2", "1", "1", "1"], generate: redBlueAbcdh,
    justifications: [
      support("cdh", RED, "red-light", ["C", "D", "H"], "D+H=2C", "arithmetic-progression"),
      support("abdh", BLUE, "blue-light", ["A", "B", "D", "H"], "B+2H=D+2A", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcdj", title: "ABCDJ", positions: ["A", "B", "C", "D", "J"], group: "red-blue",
    summary: "Прогрессия BDJ и голубая четвёрка ACDJ с целочисленным центром.", theorem: "red_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{A+J}{2},\,\frac{A-J}{2},\,J-D\right)`, defaults: ["1", "2", "1", "1"], generate: redBlueAbcdj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("acdj", BLUE, "blue-light", ["A", "C", "D", "J"], "A+2D=J+2C", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abdef", title: "ABDEF", positions: ["A", "B", "D", "E", "F"], group: "red-blue",
    summary: "Прогрессия DEF и голубая норма на клетках ABDF.", theorem: "red_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,F-A)`, defaults: ["2", "1", "1", "1"], generate: redBlueAbdef,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("abdf", BLUE, "blue-light", ["A", "B", "D", "F"], "B+2A=D+2F", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcgj", title: "ABCGJ", positions: ["A", "B", "C", "G", "J"], group: "yellow-blue",
    summary: "Равенство A+J=C+G согласовано с голубой нормой BCGJ.", theorem: "yellow_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{A+J}{2},\,\frac{A-J}{2},\,\frac{A+J}{2}-C\right)`, defaults: ["1", "2", "1", "3"], generate: yellowBlueAbcgj,
    justifications: [
      support("acgj", YELLOW, "yellow", ["A", "C", "G", "J"], "A+J=C+G", "two-square-norm"),
      support("bcgj", BLUE, "blue-light", ["B", "C", "G", "J"], "C+2B=G+2J", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcgh", title: "ABCGH", positions: ["A", "B", "C", "G", "H"], group: "yellow-blue",
    summary: "Жёлтая четвёрка BCGH и голубая четвёрка ACGH.", theorem: "yellow_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{C+G}{2},\,A-\frac{C+G}{2},\,\frac{G-C}{2}\right)`, defaults: ["1", "3", "1", "1"], generate: yellowBlueAbcgh,
    justifications: [
      support("bcgh", YELLOW, "yellow", ["B", "C", "G", "H"], "B+H=C+G", "two-square-norm"),
      support("acgh", BLUE, "blue-light", ["A", "C", "G", "H"], "G+2H=C+2A", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcde", title: "ABCDE", positions: ["A", "B", "C", "D", "E"], group: "yellow-blue",
    summary: "Гауссова норма и норма x² + 2y² без делений во время исполнения.", theorem: "yellow_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: ["4", "3", "1", "1"], generate: yellowBlueAbcde,
    justifications: [
      support("acde", YELLOW, "yellow", ["A", "C", "D", "E"], "A+D=C+E", "two-square-norm"),
      support("bcde", BLUE, "blue-light", ["B", "C", "D", "E"], "B+2C=D+2E", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcdf", title: "ABCDF", positions: ["A", "B", "C", "D", "F"], group: "blue-blue",
    summary: "Две независимые голубые нормы на ABDF и ACDF.", theorem: "blue_blue_abcdf_square_mask", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,C-D,\,F-A\right)`, defaults: ["3", "2", "1", "1"], generate: blueBlueAbcdf,
    justifications: [
      support("abdf", BLUE, "blue-light", ["A", "B", "D", "F"], "B+2A=D+2F", "sqrt-minus-two-norm"),
      support("acdf", BLUE, "blue-dark", ["A", "C", "D", "F"], "D+2A=F+2C", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcdg", title: "ABCDG", positions: ["A", "B", "C", "D", "G"], group: "yellow-brown",
    summary: "Жёлтая четвёрка BCDG и взвешенная коричневая коника ABCG.", theorem: "yellow_brown_abcdg_square_mask", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,G-E)`, defaults: ["2", "1", "1", "2"], generate: yellowBrownAbcdg,
    justifications: [
      support("bcdg", YELLOW, "yellow", ["B", "C", "D", "G"], "B+C=D+G", "two-square-norm"),
      support("abcg", "Коричневая взвешенная коника", "brown", ["A", "B", "C", "G"], "2A+2B=C+3G", "weighted-conic"),
    ],
  }),
];

export const FAMILIES: readonly FamilyDefinition[] = [
  ...FOUR_FAMILIES,
  ...FIVE_FAMILIES,
];

export function familyById(id: string | null): FamilyDefinition {
  return FAMILIES.find((candidate) => candidate.id === id) ?? FAMILIES[0];
}

export function findFamilyById(id: string | undefined): FamilyDefinition | undefined {
  return FAMILIES.find((candidate) => candidate.id === id);
}

const GROUP_LABELS_EN: Readonly<Record<FamilyGroup, string>> = {
  red: "Red 4/9",
  yellow: "Yellow 4/9",
  blue: "Blue 4/9",
  green: "Green 4/9",
  brown: "Brown 4/9",
  "dark-gray": "Dark-gray 4/9",
  "light-gray": "Light-gray 4/9",
  "red-red": "Red–red",
  "red-yellow": "Red–yellow",
  "red-blue": "Red–blue",
  "yellow-blue": "Yellow–blue",
  "blue-blue": "Blue–blue",
  "yellow-brown": "Yellow–brown",
};

const FOUR_ORBIT_DESCRIPTIONS_EN: Readonly<Record<string, string>> = {
  aceg: "The center and three corners",
  bdef: "The center and three edge cells",
  abce: "The center, two adjacent corners, and the edge between them",
  aceh: "The center, two adjacent corners, and the opposite edge",
  acde: "The center, two adjacent corners, and an edge incident to one of them",
  abej: "The center, two opposite corners, and one edge",
  abde: "The center, two adjacent edges, and the corner between them",
  bdej: "The center, two adjacent edges, and the opposite corner",
  bcde: "The center, two adjacent edges, and a corner incident to one of them",
  abeh: "The center, two opposite edges, and one corner",
  bdfh: "All four edge cells",
  acgj: "All four corners",
  bdfg: "Three edge cells and an outer corner",
  abcg: "Three corners and the inner edge",
  acfg: "Three corners and the outer edge",
  abdf: "Three edge cells and the inner corner",
  acdf: "Two adjacent corners and the two noncommon incident edges",
  abch: "Two adjacent corners, their common edge, and the opposite edge",
  abcd: "Two adjacent corners and two edges incident to one corner",
  abdj: "Two opposite corners and two edges incident to one of them",
  abfj: "Two opposite corners and adjacent edges incident to them",
  abhj: "Two opposite corners and two opposite edges",
  acdh: "Two adjacent corners and two adjacent edges at the unselected corner",
};

const FIVE_SUMMARIES_EN: Readonly<Record<string, string>> = {
  acegj: "Two arithmetic progressions of squares meet at the center E.",
  bdefh: "Horizontal and vertical progressions of squares share the center E.",
  abehj: "The red progressions AEJ and BEH; this family contains known 6/9 and 7/9 enhancements.",
  bdefj: "The progressions DEF and BDJ are coordinated by one four-parameter generator.",
  bdfgj: "Two shifted progressions, BDJ and BGF, meet at cell B.",
  abdej: "The progressions AEJ and BDJ share the lower corner J.",
  bdfhj: "The red progression BDJ and the yellow rectangle BDFH.",
  abdfj: "The progression BDJ meets the equality A+B=F+J.",
  acehj: "The progression AEJ is compatible with C+E=H+J.",
  acdeg: "The progression CEG and the yellow equality A+D=C+E.",
  abceh: "The progression BEH and the equality A+C=E+H share two cells.",
  acdef: "The progression DEF joined to the yellow relation ACDE.",
  abefj: "The progression AEJ meets the yellow four-cell support ABFJ.",
  abfgj: "The progression BGF and A+B=F+J form the ABFGJ mask.",
  befgj: "The orbit omitted from the original PDF: progression BGF together with B+E=G+J.",
  abcdh: "The arithmetic-progression triple CDH, compatible with an x²+2y² norm on ABDH.",
  abcdj: "The progression BDJ and the blue support ACDJ, with an integral center.",
  abdef: "The progression DEF and the blue norm on ABDF.",
  abcgj: "The equality A+J=C+G is compatible with the blue norm on BCGJ.",
  abcgh: "The yellow support BCGH and the blue support ACGH.",
  abcde: "A Gaussian norm and an x²+2y² norm, with no runtime division.",
  abcdf: "Two independent blue norms on ABDF and ACDF.",
  abcdg: "The yellow support BCDG and the weighted brown conic ABCG.",
};

export function familyGroupLabel(
  family: FamilyDefinition,
  locale: Locale,
): string {
  return locale === "ru" ? family.groupLabel : GROUP_LABELS_EN[family.group];
}

export function familyOrbitDescription(
  family: FamilyDefinition,
  locale: Locale,
): string | undefined {
  if (locale === "ru") return family.orbitDescription;
  return FOUR_ORBIT_DESCRIPTIONS_EN[family.id];
}

export function familySummary(
  family: FamilyDefinition,
  locale: Locale,
): string {
  if (locale === "ru") return family.summary;
  if (family.level === 4) {
    const description = FOUR_ORBIT_DESCRIPTIONS_EN[family.id];
    const relation = family.justifications[0]?.relationLatex;
    return `${description}. The unique compatibility relation after eliminating E, x, and y is ${relation}.`;
  }
  return FIVE_SUMMARIES_EN[family.id];
}

export function justificationLabel(
  justification: ProofJustification,
  locale: Locale,
): string {
  if (locale === "ru") return justification.label;
  if (justification.commonProofId === "arithmetic-progression") {
    return justification.color === "red-dark"
      ? "Dark-red arithmetic progression"
      : "Light-red arithmetic progression";
  }
  if (justification.commonProofId === "two-square-norm") {
    return "Yellow equality of two sums of squares";
  }
  if (justification.commonProofId === "sqrt-minus-two-norm") {
    return "Blue x² + 2y² norm";
  }
  if (justification.commonProofId === "weighted-conic") {
    return "Weighted brown conic";
  }
  const colorNames: Partial<Record<ProofColor, string>> = {
    green: "Green",
    brown: "Brown",
    "gray-dark": "Dark-gray",
    "gray-light": "Light-gray",
    yellow: "Yellow",
    "blue-light": "Blue",
  };
  return `${colorNames[justification.color] ?? "Diagonal"} quadric relation`;
}
