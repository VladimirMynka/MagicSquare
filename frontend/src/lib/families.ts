import type { Coordinates, Position } from "./magicSquare";

export type ParameterStrings = readonly [string, string, string, string];
export type FamilyGroup =
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
  | "brown";
export type CommonProofId =
  | "arithmetic-progression"
  | "two-square-norm"
  | "sqrt-minus-two-norm"
  | "weighted-conic";

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
  group: FamilyGroup;
  groupLabel: string;
  title: string;
  summary: string;
  theorem: string;
  proofStatus: "proof-core" | "legacy-formula";
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

const commonDefaults: ParameterStrings = ["2", "1", "3", "1"];

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
  "red-red": "Красно-красные",
  "red-yellow": "Красно-жёлтые",
  "red-blue": "Красно-голубые",
  "yellow-blue": "Жёлто-голубые",
  "blue-blue": "Голубо-голубые",
  "yellow-brown": "Жёлто-коричневые",
};

type FamilyInput = Omit<FamilyDefinition, "mask" | "groupLabel"> & {
  mask?: string;
};

function family(input: FamilyInput): FamilyDefinition {
  return {
    ...input,
    mask: input.mask ?? input.title,
    groupLabel: groupLabels[input.group],
  };
}

export const FAMILIES: readonly FamilyDefinition[] = [
  family({
    id: "acegj", title: "ACEGJ", positions: ["A", "C", "E", "G", "J"], group: "red-red",
    summary: "Две арифметические прогрессии квадратов пересекаются в центре E.", theorem: "legacy_red_red_acegj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,G-E)`, defaults: commonDefaults, generate: redRedAcegj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("ceg", RED, "red-dark", ["C", "E", "G"], "C+G=2E", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdefh", title: "BDEFH", positions: ["B", "D", "E", "F", "H"], group: "red-red",
    summary: "Горизонтальная и вертикальная прогрессии квадратов с общим центром E.", theorem: "legacy_red_red_bdefh", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(E,\,\frac{F-B}{2},\,\frac{B-D}{2}\right)`, defaults: commonDefaults, generate: redRedBdefh,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("beh", RED, "red-dark", ["B", "E", "H"], "B+H=2E", "arithmetic-progression"),
    ],
  }),
  family({
    id: "abehj", title: "ABEHJ", positions: ["A", "B", "E", "H", "J"], group: "red-red",
    summary: "Две красные прогрессии AEJ и BEH; семейство содержит известные усиления 6/9 и 7/9.", theorem: "legacy_red_red_abehj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,A-H)`, defaults: ["9", "2", "3", "4"], generate: redRedAbehj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("beh", RED, "red-dark", ["B", "E", "H"], "B+H=2E", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdefj", title: "BDEFJ", positions: ["B", "D", "E", "F", "J"], group: "red-red",
    summary: "Прогрессии DEF и BDJ согласованы одним четырёхпараметрическим генератором.", theorem: "legacy_red_red_bdefj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,E-J,\,B-J)`, defaults: commonDefaults, generate: redRedBdefj,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("bdj", RED, "red-dark", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdfgj", title: "BDFGJ", positions: ["B", "D", "F", "G", "J"], group: "red-red",
    summary: "Две смещённые прогрессии BDJ и BGF пересекаются в клетке B.", theorem: "legacy_red_red_bdfgj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,G-B,\,B-J\right)`, defaults: commonDefaults, generate: redRedBdfgj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("bgf", RED, "red-dark", ["B", "G", "F"], "B+F=2G", "arithmetic-progression"),
    ],
  }),
  family({
    id: "abdej", title: "ABDEJ", positions: ["A", "B", "D", "E", "J"], group: "red-red",
    summary: "Прогрессии AEJ и BDJ имеют общую нижнюю угловую клетку J.", theorem: "legacy_red_red_abdej", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,E-J,\,B-J)`, defaults: commonDefaults, generate: redRedAbdej,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("bdj", RED, "red-dark", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
    ],
  }),
  family({
    id: "bdfhj", title: "BDFHJ", positions: ["B", "D", "F", "H", "J"], group: "red-yellow",
    summary: "Красная прогрессия BDJ и жёлтый прямоугольник BDFH.", theorem: "legacy_red_yellow_bdfhj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,\frac{F-B}{2},\,B-J\right)`, defaults: commonDefaults, generate: redYellowBdfhj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("bdfh", YELLOW, "yellow", ["B", "D", "F", "H"], "B+H=D+F", "two-square-norm"),
    ],
  }),
  family({
    id: "abdfj", title: "ABDFJ", positions: ["A", "B", "D", "F", "J"], group: "red-yellow",
    summary: "Прогрессия BDJ пересекает равенство A+B=F+J.", theorem: "legacy_red_yellow_abdfj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,\frac{F-B}{2},\,B-J\right)`, defaults: commonDefaults, generate: redYellowAbdfj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("abfj", YELLOW, "yellow", ["A", "B", "F", "J"], "A+B=F+J", "two-square-norm"),
    ],
  }),
  family({
    id: "acehj", title: "ACEHJ", positions: ["A", "C", "E", "H", "J"], group: "red-yellow",
    summary: "Прогрессия AEJ согласована с равенством C+E=H+J.", theorem: "legacy_red_yellow_acehj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: commonDefaults, generate: redYellowAcehj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("cehj", YELLOW, "yellow", ["C", "E", "H", "J"], "C+E=H+J", "two-square-norm"),
    ],
  }),
  family({
    id: "acdeg", title: "ACDEG", positions: ["A", "C", "D", "E", "G"], group: "red-yellow",
    summary: "Прогрессия CEG и жёлтое равенство A+D=C+E.", theorem: "legacy_red_yellow_acdeg", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,G-E)`, defaults: commonDefaults, generate: redYellowAcdeg,
    justifications: [
      support("ceg", RED, "red-light", ["C", "E", "G"], "C+G=2E", "arithmetic-progression"),
      support("acde", YELLOW, "yellow", ["A", "C", "D", "E"], "A+D=C+E", "two-square-norm"),
    ],
  }),
  family({
    id: "abceh", title: "ABCEH", positions: ["A", "B", "C", "E", "H"], group: "red-yellow",
    summary: "Прогрессия BEH и равенство A+C=E+H делят две клетки.", theorem: "legacy_red_yellow_abceh", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: commonDefaults, generate: redYellowAbceh,
    justifications: [
      support("beh", RED, "red-light", ["B", "E", "H"], "B+H=2E", "arithmetic-progression"),
      support("aceh", YELLOW, "yellow", ["A", "C", "E", "H"], "A+C=E+H", "two-square-norm"),
    ],
  }),
  family({
    id: "acdef", title: "ACDEF", positions: ["A", "C", "D", "E", "F"], group: "red-yellow",
    summary: "Прогрессия DEF соединена с жёлтым равенством ACDE.", theorem: "legacy_red_yellow_acdef", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: commonDefaults, generate: redYellowAcdef,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("acde", YELLOW, "yellow", ["A", "C", "D", "E"], "A+D=C+E", "two-square-norm"),
    ],
  }),
  family({
    id: "abefj", title: "ABEFJ", positions: ["A", "B", "E", "F", "J"], group: "red-yellow",
    summary: "Прогрессия AEJ пересекает жёлтую четвёрку ABFJ.", theorem: "legacy_red_yellow_abefj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,B-J)`, defaults: commonDefaults, generate: redYellowAbefj,
    justifications: [
      support("aej", RED, "red-light", ["A", "E", "J"], "A+J=2E", "arithmetic-progression"),
      support("abfj", YELLOW, "yellow", ["A", "B", "F", "J"], "A+B=F+J", "two-square-norm"),
    ],
  }),
  family({
    id: "abfgj", title: "ABFGJ", positions: ["A", "B", "F", "G", "J"], group: "red-yellow",
    summary: "Прогрессия BGF и равенство A+B=F+J образуют маску ABFGJ.", theorem: "legacy_red_yellow_abfgj", proofStatus: "legacy-formula",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{A+J}{2},\,\frac{A-J}{2},\,B-J\right)`, defaults: commonDefaults, generate: redYellowAbfgj,
    justifications: [
      support("bgf", RED, "red-light", ["B", "G", "F"], "B+F=2G", "arithmetic-progression"),
      support("abfj", YELLOW, "yellow", ["A", "B", "F", "J"], "A+B=F+J", "two-square-norm"),
    ],
  }),
  family({
    id: "abcdh", title: "ABCDH", positions: ["A", "B", "C", "D", "H"], group: "red-blue",
    summary: "AP-тройка CDH, согласованная с нормой x² + 2y² на ABDH.", theorem: "red_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=(A-H+C,\,H-C,\,A-H)`, defaults: commonDefaults, generate: redBlueAbcdh,
    justifications: [
      support("cdh", RED, "red-light", ["C", "D", "H"], "D+H=2C", "arithmetic-progression"),
      support("abdh", BLUE, "blue-light", ["A", "B", "D", "H"], "B+2H=D+2A", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcdj", title: "ABCDJ", positions: ["A", "B", "C", "D", "J"], group: "red-blue",
    summary: "Прогрессия BDJ и голубая четвёрка ACDJ с целочисленным центром.", theorem: "red_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{A+J}{2},\,\frac{A-J}{2},\,J-D\right)`, defaults: commonDefaults, generate: redBlueAbcdj,
    justifications: [
      support("bdj", RED, "red-light", ["B", "D", "J"], "B+D=2J", "arithmetic-progression"),
      support("acdj", BLUE, "blue-light", ["A", "C", "D", "J"], "A+2D=J+2C", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abdef", title: "ABDEF", positions: ["A", "B", "D", "E", "F"], group: "red-blue",
    summary: "Прогрессия DEF и голубая норма на клетках ABDF.", theorem: "red_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,F-A)`, defaults: commonDefaults, generate: redBlueAbdef,
    justifications: [
      support("def", RED, "red-light", ["D", "E", "F"], "D+F=2E", "arithmetic-progression"),
      support("abdf", BLUE, "blue-light", ["A", "B", "D", "F"], "B+2A=D+2F", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcgj", title: "ABCGJ", positions: ["A", "B", "C", "G", "J"], group: "yellow-blue",
    summary: "Равенство A+J=C+G согласовано с голубой нормой BCGJ.", theorem: "yellow_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{A+J}{2},\,\frac{A-J}{2},\,\frac{A+J}{2}-C\right)`, defaults: ["1", "2", "1", "2"], generate: yellowBlueAbcgj,
    justifications: [
      support("acgj", YELLOW, "yellow", ["A", "C", "G", "J"], "A+J=C+G", "two-square-norm"),
      support("bcgj", BLUE, "blue-light", ["B", "C", "G", "J"], "C+2B=G+2J", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcgh", title: "ABCGH", positions: ["A", "B", "C", "G", "H"], group: "yellow-blue",
    summary: "Жёлтая четвёрка BCGH и голубая четвёрка ACGH.", theorem: "yellow_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{C+G}{2},\,A-\frac{C+G}{2},\,\frac{G-C}{2}\right)`, defaults: commonDefaults, generate: yellowBlueAbcgh,
    justifications: [
      support("bcgh", YELLOW, "yellow", ["B", "C", "G", "H"], "B+H=C+G", "two-square-norm"),
      support("acgh", BLUE, "blue-light", ["A", "C", "G", "H"], "G+2H=C+2A", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcde", title: "ABCDE", positions: ["A", "B", "C", "D", "E"], group: "yellow-blue",
    summary: "Гауссова норма и норма x² + 2y² без делений во время исполнения.", theorem: "yellow_blue_five_square_masks", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=(E,\,A-E,\,E-C)`, defaults: commonDefaults, generate: yellowBlueAbcde,
    justifications: [
      support("acde", YELLOW, "yellow", ["A", "C", "D", "E"], "A+D=C+E", "two-square-norm"),
      support("bcde", BLUE, "blue-light", ["B", "C", "D", "E"], "B+2C=D+2E", "sqrt-minus-two-norm"),
    ],
  }),
  family({
    id: "abcdf", title: "ABCDF", positions: ["A", "B", "C", "D", "F"], group: "blue-blue",
    summary: "Две независимые голубые нормы на ABDF и ACDF.", theorem: "blue_blue_abcdf_square_mask", proofStatus: "proof-core",
    reconstructionLatex: String.raw`(E,x,y)=\left(\frac{D+F}{2},\,C-D,\,F-A\right)`, defaults: commonDefaults, generate: blueBlueAbcdf,
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

export function familyById(id: string | null): FamilyDefinition {
  return FAMILIES.find((candidate) => candidate.id === id) ?? FAMILIES[0];
}

export function findFamilyById(id: string | undefined): FamilyDefinition | undefined {
  return FAMILIES.find((candidate) => candidate.id === id);
}
