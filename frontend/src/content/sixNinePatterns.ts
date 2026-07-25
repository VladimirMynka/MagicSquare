export type SixNineConditionKind =
  | "red"
  | "yellow"
  | "blue"
  | "green"
  | "brown";
export type SixNineResearchStatus =
  | "system"
  | "conic"
  | "elliptic"
  | "family"
  | "tfmn";
export type SixNineShapeClass = "triangle" | "rectangle";

export interface LocalizedSixNineText {
  ru: string;
  en: string;
}

export interface SixNineCondition {
  id: string;
  kind: SixNineConditionKind;
  support: string;
  latex: string;
}

export interface SixNinePattern {
  mask: string;
  complement: string;
  progressions: readonly string[];
  conditions: readonly SixNineCondition[];
  note: LocalizedSixNineText;
  status: SixNineResearchStatus;
  statusText: LocalizedSixNineText;
  theoryPath?: string;
}

export const SIX_NINE_SHAPE_LABELS: Readonly<
  Record<SixNineShapeClass, LocalizedSixNineText>
> = {
  triangle: { ru: "Треугольный", en: "Triangular" },
  rectangle: { ru: "Прямоугольный", en: "Rectangular" },
};

export function sixNineShapeClass(
  pattern: SixNinePattern,
): SixNineShapeClass | null {
  const red = pattern.conditions.filter((condition) => condition.kind === "red").length;
  const yellow = pattern.conditions.filter(
    (condition) => condition.kind === "yellow",
  ).length;
  if (red === 3) return "triangle";
  if (red === 2 && yellow === 1) return "rectangle";
  return null;
}

export const SIX_NINE_PATTERNS: readonly SixNinePattern[] = [
  {
    mask: "ABCDEF",
    complement: "GHJ",
    progressions: ["DEF"],
    conditions: [
      { id: "DEF", kind: "red", support: "DEF", latex: "d^2+f^2=2e^2" },
      { id: "ACDE", kind: "yellow", support: "ACDE", latex: "a^2+d^2=c^2+e^2" },
      { id: "BCDE", kind: "blue", support: "BCDE", latex: "b^2+2c^2=d^2+2e^2" },
    ],
    note: {
      ru: "Одна прогрессия и две квадрики на общем блоке C,D,E.",
      en: "One progression and two quadrics on the shared C,D,E block.",
    },
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
  },
  {
    mask: "ABCDEG",
    complement: "FHJ",
    progressions: ["CEG"],
    conditions: [
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
      { id: "ACDE", kind: "yellow", support: "ACDE", latex: "a^2+d^2=c^2+e^2" },
      { id: "ABEG", kind: "yellow", support: "ABEG", latex: "a^2+b^2=e^2+g^2" },
    ],
    note: {
      ru: "Прогрессия CEG и две независимые гауссовы нормы.",
      en: "The CEG progression and two independent Gaussian norms.",
    },
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
  },
  {
    mask: "ABCDEH",
    complement: "FGJ",
    progressions: ["BEH", "CDH"],
    conditions: [
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
      { id: "BEH", kind: "red", support: "BEH", latex: "b^2+h^2=2e^2" },
      { id: "ACEH", kind: "yellow", support: "ACEH", latex: "a^2+c^2=e^2+h^2" },
    ],
    note: {
      ru: "Пересекающийся red–red–yellow с общей клеткой H.",
      en: "An intersecting red-red-yellow type with shared entry H.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 2I₄+8I₂; 2≤rank≤4",
      en: "K3: 2I₄+8I₂; 2≤rank≤4",
    },
    theoryPath: "/theory/6-9/abcdeh",
  },
  {
    mask: "ABCDEJ",
    complement: "FGH",
    progressions: ["AEJ", "BDJ"],
    conditions: [
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "AEJ", kind: "red", support: "AEJ", latex: "a^2+j^2=2e^2" },
      { id: "ACDE", kind: "yellow", support: "ACDE", latex: "a^2+d^2=c^2+e^2" },
    ],
    note: {
      ru: "Две пересекающиеся прогрессии и жёлтая склейка.",
      en: "Two intersecting progressions and a yellow compatibility relation.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 2I₄+8I₂; 1≤rank≤4",
      en: "K3: 2I₄+8I₂; 1≤rank≤4",
    },
    theoryPath: "/theory/6-9/abcdej",
  },
  {
    mask: "ABCDFG",
    complement: "EHJ",
    progressions: ["BFG"],
    conditions: [
      { id: "BFG", kind: "red", support: "BFG", latex: "b^2+f^2=2g^2" },
      { id: "BCDG", kind: "yellow", support: "BCDG", latex: "b^2+c^2=d^2+g^2" },
      { id: "ACFG", kind: "blue", support: "ACFG", latex: "2a^2+g^2=c^2+2f^2" },
    ],
    note: {
      ru: "Прогрессия, гауссова норма и норма x²+2y² без центральной клетки.",
      en: "A progression, a Gaussian norm, and an x²+2y² norm without the center.",
    },
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
  },
  {
    mask: "ABCDFH",
    complement: "EGJ",
    progressions: ["AFH", "CDH"],
    conditions: [
      { id: "AFH", kind: "red", support: "AFH", latex: "f^2+h^2=2a^2" },
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
      { id: "BDFH", kind: "yellow", support: "BDFH", latex: "b^2+h^2=d^2+f^2" },
    ],
    note: {
      ru: "Пересекающийся red–red–yellow с общей клеткой H.",
      en: "An intersecting red-red-yellow type with shared entry H.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 2I₄+8I₂; 1≤rank≤4",
      en: "K3: 2I₄+8I₂; 1≤rank≤4",
    },
    theoryPath: "/theory/6-9/abcdfh",
  },
  {
    mask: "ABCDGJ",
    complement: "EFH",
    progressions: ["BDJ"],
    conditions: [
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "ACGJ", kind: "yellow", support: "ACGJ", latex: "a^2+j^2=c^2+g^2" },
      { id: "BCDG", kind: "yellow", support: "BCDG", latex: "b^2+c^2=d^2+g^2" },
    ],
    note: {
      ru: "Одна прогрессия и две независимые гауссовы нормы.",
      en: "One progression and two independent Gaussian norms.",
    },
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
  },
  {
    mask: "ABCDHJ",
    complement: "EFG",
    progressions: ["BDJ", "CDH"],
    conditions: [
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
      { id: "ABHJ", kind: "yellow", support: "ABHJ", latex: "a^2+j^2=b^2+h^2" },
    ],
    note: {
      ru: "Пересекающаяся пара прогрессий с общей клеткой D.",
      en: "An intersecting pair of progressions with shared entry D.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 2I₄+8I₂; 1≤rank≤4",
      en: "K3: 2I₄+8I₂; 1≤rank≤4",
    },
    theoryPath: "/theory/6-9/abcdhj",
  },
  {
    mask: "ABCEGH",
    complement: "DFJ",
    progressions: ["BEH", "CEG"],
    conditions: [
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
      { id: "BEH", kind: "red", support: "BEH", latex: "b^2+h^2=2e^2" },
      { id: "ACEH", kind: "yellow", support: "ACEH", latex: "a^2+c^2=e^2+h^2" },
    ],
    note: {
      ru: "Та же квартика K3, что у ABCEGJ, с другим чтением клеток.",
      en: "The same K3 quartic as ABCEGJ, with a different cell interpretation.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 2I₄+8I₂; 2≤rank≤4",
      en: "K3: 2I₄+8I₂; 2≤rank≤4",
    },
    theoryPath: "/theory/6-9/abcegh-abcegj",
  },
  {
    mask: "ABCEGJ",
    complement: "DFH",
    progressions: ["AEJ", "CEG"],
    conditions: [
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
      { id: "AEJ", kind: "red", support: "AEJ", latex: "a^2+j^2=2e^2" },
      { id: "BEGJ", kind: "yellow", support: "BEGJ", latex: "b^2+e^2=g^2+j^2" },
    ],
    note: {
      ru: "Та же квартика K3, что у ABCEGH, с другим чтением клеток.",
      en: "The same K3 quartic as ABCEGH, with a different cell interpretation.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 2I₄+8I₂; 2≤rank≤4",
      en: "K3: 2I₄+8I₂; 2≤rank≤4",
    },
    theoryPath: "/theory/6-9/abcegh-abcegj",
  },
  {
    mask: "ABCGHJ",
    complement: "DEF",
    progressions: [],
    conditions: [
      { id: "ACGJ", kind: "yellow", support: "ACGJ", latex: "a^2+j^2=c^2+g^2" },
      { id: "ABHJ", kind: "yellow", support: "ABHJ", latex: "a^2+j^2=b^2+h^2" },
      { id: "ACHJ", kind: "blue", support: "ACHJ", latex: "a^2+2c^2=2h^2+j^2" },
    ],
    note: {
      ru: "Единственный бескрасный представитель: две гауссовы и одна голубая нормы.",
      en: "The unique pattern without a red progression: two Gaussian and one blue norm.",
    },
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
  },
  {
    mask: "ABDEFH",
    complement: "CGJ",
    progressions: ["AFH", "BEH", "DEF"],
    conditions: [
      { id: "AFH", kind: "red", support: "AFH", latex: "f^2+h^2=2a^2" },
      { id: "DEF", kind: "red", support: "DEF", latex: "d^2+f^2=2e^2" },
      { id: "BEH", kind: "red", support: "BEH", latex: "b^2+h^2=2e^2" },
    ],
    note: {
      ru: "Три красных условия с двумя общими центрами.",
      en: "Three red conditions with two shared centers.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 4I₄+4I₂; 1≤rank≤2",
      en: "K3: 4I₄+4I₂; 1≤rank≤2",
    },
    theoryPath: "/theory/6-9/abdefh",
  },
  {
    mask: "ABDEFJ",
    complement: "CGH",
    progressions: ["AEJ", "BDJ", "DEF"],
    conditions: [
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "DEF", kind: "red", support: "DEF", latex: "d^2+f^2=2e^2" },
      { id: "AEJ", kind: "red", support: "AEJ", latex: "a^2+j^2=2e^2" },
    ],
    note: {
      ru: "Другой топологический тип трёх красных условий.",
      en: "A different topology of three red conditions.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 4I₄+4I₂; 1≤rank≤2",
      en: "K3: 4I₄+4I₂; 1≤rank≤2",
    },
    theoryPath: "/theory/6-9/abdefj",
  },
  {
    mask: "ABDFHJ",
    complement: "CEG",
    progressions: ["AFH", "BDJ"],
    conditions: [
      { id: "AFH", kind: "red", support: "AFH", latex: "f^2+h^2=2a^2" },
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "BDFH", kind: "yellow", support: "BDFH", latex: "b^2+h^2=d^2+f^2" },
    ],
    note: {
      ru: "Параллельный red–red–yellow без центральной клетки.",
      en: "A parallel red-red-yellow type without the central entry.",
    },
    status: "tfmn",
    statusText: {
      ru: "tfmn-параметризация",
      en: "tfmn parametrization",
    },
    theoryPath: "/theory/fmn-tfmn",
  },
  {
    mask: "ABEFGH",
    complement: "CDJ",
    progressions: ["AFH", "BEH", "BFG"],
    conditions: [
      { id: "AFH", kind: "red", support: "AFH", latex: "f^2+h^2=2a^2" },
      { id: "BFG", kind: "red", support: "BFG", latex: "b^2+f^2=2g^2" },
      { id: "BEH", kind: "red", support: "BEH", latex: "b^2+h^2=2e^2" },
    ],
    note: {
      ru: "Треугольник из трёх попарных квадратных средних.",
      en: "A triangle of three pairwise square means.",
    },
    status: "elliptic",
    statusText: {
      ru: "K3: 4I₄+4I₂; 1≤rank≤2",
      en: "K3: 4I₄+4I₂; 1≤rank≤2",
    },
    theoryPath: "/theory/6-9/abefgh",
  },
  {
    mask: "ABEFGJ",
    complement: "CDH",
    progressions: ["AEJ", "BFG"],
    conditions: [
      { id: "BFG", kind: "red", support: "BFG", latex: "b^2+f^2=2g^2" },
      { id: "AEJ", kind: "red", support: "AEJ", latex: "a^2+j^2=2e^2" },
      { id: "ABFJ", kind: "yellow", support: "ABFJ", latex: "a^2+b^2=f^2+j^2" },
    ],
    note: {
      ru: "Параллельный red–red–yellow с центральной клеткой.",
      en: "A parallel red-red-yellow type containing the center.",
    },
    status: "tfmn",
    statusText: {
      ru: "tfmn-параметризация",
      en: "tfmn parametrization",
    },
    theoryPath: "/theory/fmn-tfmn",
  },
];
