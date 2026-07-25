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
    status: "conic",
    statusText: {
      ru: "Склейка двух коник",
      en: "Fiber product of two conics",
    },
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
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
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
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
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
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
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
      ru: "Две прогрессии с общим центром E и жёлтая связь.",
      en: "Two progressions with common center E and a yellow relation.",
    },
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
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
      ru: "Две прогрессии через E и независимая гауссова норма.",
      en: "Two progressions through E and an independent Gaussian norm.",
    },
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
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
      ru: "Квартика рода 1 и якобиан",
      en: "Genus-one quartic and Jacobian",
    },
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
    status: "system",
    statusText: {
      ru: "Каноническая система",
      en: "Canonical system",
    },
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
    status: "family",
    statusText: {
      ru: "Поверхность Лежандра и семейство",
      en: "Legendre surface and family",
    },
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
  },
];
