import type { Coordinates, Position } from "./magicSquare";

export type ParameterStrings = readonly [string, string, string, string];
export type FamilyGroup =
  | "red-blue"
  | "yellow-blue"
  | "blue-blue"
  | "yellow-brown";

export interface FamilyDefinition {
  id: string;
  mask: string;
  positions: readonly Position[];
  group: FamilyGroup;
  groupLabel: string;
  title: string;
  summary: string;
  theorem: string;
  defaults: ParameterStrings;
  generate: (parameters: ParameterStrings) => Coordinates;
}

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

function sameParity(
  values: FiveValues,
  left: number,
  right: number,
): FiveValues {
  if ((values[left] - values[right]) % 2n === 0n) return values;
  return values.map((value) => value * 4n) as FiveValues;
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

export const FAMILIES: readonly FamilyDefinition[] = [
  {
    id: "abcdh",
    mask: "ABCDH",
    positions: ["A", "B", "C", "D", "H"],
    group: "red-blue",
    groupLabel: "Красно-голубые",
    title: "ABCDH",
    summary: "AP-тройка квадратов, согласованная с нормой x² − 2y².",
    theorem: "red_blue_five_square_masks",
    defaults: commonDefaults,
    generate: redBlueAbcdh,
  },
  {
    id: "abcdj",
    mask: "ABCDJ",
    positions: ["A", "B", "C", "D", "J"],
    group: "red-blue",
    groupLabel: "Красно-голубые",
    title: "ABCDJ",
    summary:
      "Вторая красно-голубая проекция с целочисленным восстановлением центра.",
    theorem: "red_blue_five_square_masks",
    defaults: commonDefaults,
    generate: redBlueAbcdj,
  },
  {
    id: "abdef",
    mask: "ABDEF",
    positions: ["A", "B", "D", "E", "F"],
    group: "red-blue",
    groupLabel: "Красно-голубые",
    title: "ABDEF",
    summary: "Красно-голубое семейство с квадратным центральным элементом E.",
    theorem: "red_blue_five_square_masks",
    defaults: commonDefaults,
    generate: redBlueAbdef,
  },
  {
    id: "abcde",
    mask: "ABCDE",
    positions: ["A", "B", "C", "D", "E"],
    group: "yellow-blue",
    groupLabel: "Жёлто-голубые",
    title: "ABCDE",
    summary: "Гауссова норма и норма x² + 2y² без делений во время исполнения.",
    theorem: "yellow_blue_five_square_masks",
    defaults: commonDefaults,
    generate: yellowBlueAbcde,
  },
  {
    id: "abcgj",
    mask: "ABCGJ",
    positions: ["A", "B", "C", "G", "J"],
    group: "yellow-blue",
    groupLabel: "Жёлто-голубые",
    title: "ABCGJ",
    summary:
      "Знаменатели норм сокращены символически до полиномиальных корней.",
    theorem: "yellow_blue_five_square_masks",
    defaults: ["1", "2", "1", "2"],
    generate: yellowBlueAbcgj,
  },
  {
    id: "abcgh",
    mask: "ABCGH",
    positions: ["A", "B", "C", "G", "H"],
    group: "yellow-blue",
    groupLabel: "Жёлто-голубые",
    title: "ABCGH",
    summary: "Замкнутая полиномиальная параметризация совместных норм.",
    theorem: "yellow_blue_five_square_masks",
    defaults: commonDefaults,
    generate: yellowBlueAbcgh,
  },
  {
    id: "abcdf",
    mask: "ABCDF",
    positions: ["A", "B", "C", "D", "F"],
    group: "blue-blue",
    groupLabel: "Голубо-голубые",
    title: "ABCDF",
    summary: "Совместные связи двух норм x² + 2y² и сокращённые миноры.",
    theorem: "blue_blue_abcdf_square_mask",
    defaults: commonDefaults,
    generate: blueBlueAbcdf,
  },
  {
    id: "abcdg",
    mask: "ABCDG",
    positions: ["A", "B", "C", "D", "G"],
    group: "yellow-brown",
    groupLabel: "Жёлто-коричневые",
    title: "ABCDG",
    summary:
      "Точное семейство с известным положительным попарно различным свидетелем.",
    theorem: "yellow_brown_abcdg_square_mask",
    defaults: ["2", "1", "1", "2"],
    generate: yellowBrownAbcdg,
  },
];

export function familyById(id: string | null): FamilyDefinition {
  return FAMILIES.find((family) => family.id === id) ?? FAMILIES[0];
}
