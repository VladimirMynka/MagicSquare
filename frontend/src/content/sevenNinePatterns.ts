export type SevenNineRelationKind = "red" | "yellow";

export interface LocalizedSevenNineText {
  ru: string;
  en: string;
}

export interface SevenNineRelation {
  id: string;
  kind: SevenNineRelationKind;
  support: string;
  latex: string;
}

export interface SevenNinePattern {
  mask: string;
  complement: string;
  orbitSize: number;
  complementShape: LocalizedSevenNineText;
  relations: readonly [
    SevenNineRelation,
    SevenNineRelation,
    SevenNineRelation,
    SevenNineRelation,
  ];
  normalizationLatex: string;
  rootsLatex: string;
  trigEquationLatex: string;
  coordinateEquationLatex: string;
  derivation: LocalizedSevenNineText;
  knownIntegralClass?: boolean;
}

export const SEVEN_NINE_PATTERNS: readonly SevenNinePattern[] = [
  {
    mask: "CDEFGHJ",
    complement: "AB",
    orbitSize: 8,
    complementShape: {
      ru: "соседние угловая и боковая клетки",
      en: "an adjacent corner and edge cell",
    },
    relations: [
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
      { id: "EFGJ", kind: "yellow", support: "EFGJ", latex: "e^2+g^2=f^2+j^2" },
      { id: "DEF", kind: "red", support: "DEF", latex: "d^2+f^2=2e^2" },
    ],
    normalizationLatex: String.raw`e=1`,
    rootsLatex: String.raw`
\begin{aligned}
c&=L_u,&g&=R_u,\\
d&=L_uL_v,&h&=L_uR_v,\\
f&=C_w-S_wR_u,&j&=S_w+C_wR_u,
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\begin{gathered}
(1-\sin4\alpha)(1-\sin4\beta)\\
+\bigl[\cos2\gamma-\sin2\gamma
(\sin2\alpha+\cos2\alpha)\bigr]^2=2
\end{gathered}}`,
    coordinateEquationLatex: String.raw`
\boxed{\ (L_uL_v)^2+(C_w-S_wR_u)^2=2\ }`,
    derivation: {
      ru: "CEG задаёт первую прогрессию, CDH — вторую с центром c². Жёлтая норма EFGJ поворачивает рациональный вектор (1,Rᵤ) в (f,j). После этого неиспользованной остаётся ровно прогрессия DEF.",
      en: "CEG gives the first progression, and CDH the second one centered at c². The yellow norm EFGJ rotates the rational vector (1,Rᵤ) to (f,j). The only unused condition is then the DEF progression.",
    },
  },
  {
    mask: "BDEFGHJ",
    complement: "AC",
    orbitSize: 4,
    complementShape: {
      ru: "два угла одной стороны",
      en: "the two corners of one side",
    },
    relations: [
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "BEH", kind: "red", support: "BEH", latex: "b^2+h^2=2e^2" },
      { id: "BFG", kind: "red", support: "BFG", latex: "b^2+f^2=2g^2" },
      { id: "DEF", kind: "red", support: "DEF", latex: "d^2+f^2=2e^2" },
    ],
    normalizationLatex: String.raw`j=1`,
    rootsLatex: String.raw`
\begin{aligned}
b&=L_u,&d&=R_u,\\
e&=\frac{L_u}{L_v},&h&=\frac{L_uR_v}{L_v},\\
g&=\frac{L_u}{L_w},&f&=\frac{L_uR_w}{L_w},
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\begin{gathered}
\bigl(1-2\sin4\alpha+\sin4\alpha\sin4\beta\bigr)\sin4\gamma\\
=\sin4\beta-\sin4\alpha
\end{gathered}}`,
    coordinateEquationLatex: String.raw`
\boxed{\ R_u^2+\left(\frac{L_uR_w}{L_w}\right)^2
=2\left(\frac{L_u}{L_v}\right)^2\ }`,
    derivation: {
      ru: "BDJ фиксирует b и d при j=1. В BEH и BFG известный корень b используется как левый конец двух новых прогрессий; поэтому их масштабы равны Lᵤ/Lᵥ и Lᵤ/L𝑤. Совместимость замыкается прогрессией DEF.",
      en: "BDJ fixes b and d after j=1. In BEH and BFG the known root b is used as the left endpoint of two new progressions, giving scales Lᵤ/Lᵥ and Lᵤ/L𝑤. The DEF progression closes the compatibility cycle.",
    },
  },
  {
    mask: "BCDFGHJ",
    complement: "AE",
    orbitSize: 4,
    complementShape: {
      ru: "угол и центр",
      en: "a corner and the center",
    },
    relations: [
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "BFG", kind: "red", support: "BFG", latex: "b^2+f^2=2g^2" },
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
      { id: "BCGH", kind: "yellow", support: "BCGH", latex: "c^2+g^2=b^2+h^2" },
    ],
    normalizationLatex: String.raw`j=1`,
    rootsLatex: String.raw`
\begin{aligned}
b&=L_u,&d&=R_u,\\
g&=\frac{L_u}{L_v},&f&=\frac{L_uR_v}{L_v},\\
c&=\frac{R_u}{L_w},&h&=\frac{R_uR_w}{L_w},
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\begin{gathered}
\bigl(1+\sin4\alpha-2\sin4\alpha\sin4\beta\bigr)\sin4\gamma\\
=\sin4\beta(1-\sin4\alpha)
\end{gathered}}`,
    coordinateEquationLatex: String.raw`
\boxed{\ \left(\frac{R_u}{L_w}\right)^2+
\left(\frac{L_u}{L_v}\right)^2
=L_u^2+\left(\frac{R_uR_w}{L_w}\right)^2\ }`,
    derivation: {
      ru: "BDJ даёт два общих конца для независимых прогрессий BFG и CDH. Три красных коники тем самым выражают все семь корней через u,v,w. Оставшаяся гауссова норма BCGH становится единственным уравнением.",
      en: "BDJ supplies the two shared endpoints for the independent BFG and CDH progressions. The three red conics therefore express all seven roots through u,v,w. The remaining Gaussian norm BCGH becomes the single equation.",
    },
  },
  {
    mask: "BCDEGHJ",
    complement: "AF",
    orbitSize: 8,
    complementShape: {
      ru: "пара клеток на ходе коня",
      en: "a knight-move pair",
    },
    relations: [
      { id: "BDJ", kind: "red", support: "BDJ", latex: "b^2+d^2=2j^2" },
      { id: "BEH", kind: "red", support: "BEH", latex: "b^2+h^2=2e^2" },
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
    ],
    normalizationLatex: String.raw`j=1`,
    rootsLatex: String.raw`
\begin{aligned}
b&=L_u,&d&=R_u,\\
e&=\frac{L_u}{L_v},&h&=\frac{L_uR_v}{L_v},\\
c&=\frac{L_uL_w}{L_v},&g&=\frac{L_uR_w}{L_v},
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\ (1-\sin4\alpha)\sin4\gamma
=-\sin4\alpha(1-\sin4\beta)\ }`,
    coordinateEquationLatex: String.raw`
\boxed{\ R_u^2+\left(\frac{L_uR_v}{L_v}\right)^2
=2\left(\frac{L_uL_w}{L_v}\right)^2\ }`,
    derivation: {
      ru: "BDJ строит первую dir-линию. Через общий корень b прогрессия BEH определяет масштаб e, а CEG с тем же центром e² вводит c и g. Четвёртая dir-линия CDH даёт итоговое уравнение. Именно в этой D₄-орбите лежит известный квадрат Бремнера—Сэллоуза с маской ABCDEHJ.",
      en: "BDJ constructs the first dir line. Through the shared root b, BEH determines the scale e, while CEG with the same center e² introduces c and g. The fourth dir line CDH gives the final equation. This is the D4 orbit containing the known Bremner–Sallows square with pattern ABCDEHJ.",
    },
    knownIntegralClass: true,
  },
  {
    mask: "BCDEFGH",
    complement: "AJ",
    orbitSize: 2,
    complementShape: {
      ru: "противоположные углы",
      en: "opposite corners",
    },
    relations: [
      { id: "BEH", kind: "red", support: "BEH", latex: "b^2+h^2=2e^2" },
      { id: "BFG", kind: "red", support: "BFG", latex: "b^2+f^2=2g^2" },
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
    ],
    normalizationLatex: String.raw`e=1`,
    rootsLatex: String.raw`
\begin{aligned}
b&=L_u,&h&=R_u,\\
g&=\frac{L_u}{L_v},&f&=\frac{L_uR_v}{L_v},\\
c&=\frac{R_u}{R_w},&d&=\frac{R_uL_w}{R_w},
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\ (1+\sin4\alpha-2\sin4\beta)\sin4\gamma
=\sin4\beta(1-\sin4\alpha)\ }`,
    coordinateEquationLatex: String.raw`
\boxed{\ \left(\frac{R_u}{R_w}\right)^2+
\left(\frac{L_u}{L_v}\right)^2=2\ }`,
    derivation: {
      ru: "BEH задаёт b и h вокруг нормированного центра e=1. Эти два конца независимо продолжаются по BFG и CDH. Последняя центральная прогрессия CEG требует, чтобы полученные c² и g² имели средним e²=1.",
      en: "BEH gives b and h around the normalized center e=1. Those two endpoints extend independently through BFG and CDH. The final central progression CEG requires the resulting c² and g² to have midpoint e²=1.",
    },
  },
  {
    mask: "ACEFGHJ",
    complement: "BD",
    orbitSize: 4,
    complementShape: {
      ru: "две соседние боковые клетки у угла",
      en: "two edge cells adjacent to one corner",
    },
    relations: [
      { id: "AEJ", kind: "red", support: "AEJ", latex: "a^2+j^2=2e^2" },
      { id: "AFH", kind: "red", support: "AFH", latex: "f^2+h^2=2a^2" },
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
      { id: "ACEH", kind: "yellow", support: "ACEH", latex: "a^2+c^2=e^2+h^2" },
    ],
    normalizationLatex: String.raw`e=1`,
    rootsLatex: String.raw`
\begin{aligned}
a&=L_u,&j&=R_u,\\
f&=L_uL_v,&h&=L_uR_v,\\
c&=L_w,&g&=R_w,
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\ \sin4\gamma=-(1-\sin4\alpha)\sin4\beta\ }`,
    coordinateEquationLatex: String.raw`
\boxed{\ L_u^2+L_w^2=1+(L_uR_v)^2\ }`,
    derivation: {
      ru: "AEJ и CEG — две прогрессии с общим центром e². Прогрессия AFH использует a² как новый центр. После трёх полных параметризаций остаётся только равенство норм ACEH.",
      en: "AEJ and CEG are two progressions with the common center e². The AFH progression uses a² as its new center. After parametrizing all three conics, only the norm equality ACEH remains.",
    },
  },
  {
    mask: "ACDFGHJ",
    complement: "BE",
    orbitSize: 4,
    complementShape: {
      ru: "боковая клетка и центр",
      en: "an edge cell and the center",
    },
    relations: [
      { id: "AFH", kind: "red", support: "AFH", latex: "f^2+h^2=2a^2" },
      { id: "CDH", kind: "red", support: "CDH", latex: "d^2+h^2=2c^2" },
      { id: "ACGJ", kind: "yellow", support: "ACGJ", latex: "a^2+j^2=c^2+g^2" },
      { id: "ADHJ", kind: "yellow", support: "ADHJ", latex: "a^2+d^2=h^2+j^2" },
    ],
    normalizationLatex: String.raw`a=1`,
    rootsLatex: String.raw`
\begin{aligned}
h&=L_u,&f&=R_u,\\
c&=\frac{L_u}{R_v},&d&=\frac{L_uL_v}{R_v},\\
j&=\frac{C_w-L_u/R_v}{S_w},&
g&=S_w+C_wj,
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\begin{gathered}
\left(
\frac{\displaystyle\cos2\gamma-
\frac{\sin2\alpha-\cos2\alpha}{\sin2\beta+\cos2\beta}}
{\displaystyle\sin2\gamma}
\right)^2\\
=\frac{1-\sin4\beta+2\sin4\alpha\sin4\beta}
{1+\sin4\beta}
\end{gathered}}`,
    coordinateEquationLatex: String.raw`
\boxed{\ 1+\left(\frac{L_uL_v}{R_v}\right)^2
=L_u^2+\left(\frac{C_w-L_u/R_v}{S_w}\right)^2\ }`,
    derivation: {
      ru: "Это единственная орбита с оптимальным профилем RRYY. AFH и CDH дают f,h,c,d. Норма ACGJ задаётся рациональным поворотом (1,j)↦(c,g); известная первая координата c определяет j. Вторая норма ADHJ остаётся уравнением совместимости.",
      en: "This is the only orbit whose optimal profile is RRYY. AFH and CDH produce f,h,c,d. The norm ACGJ is represented by the rational rotation (1,j)↦(c,g); the known first coordinate c determines j. The second norm ADHJ remains as the compatibility equation.",
    },
  },
  {
    mask: "ACDEFGJ",
    complement: "BH",
    orbitSize: 2,
    complementShape: {
      ru: "противоположные боковые клетки",
      en: "opposite edge cells",
    },
    relations: [
      { id: "AEJ", kind: "red", support: "AEJ", latex: "a^2+j^2=2e^2" },
      { id: "CEG", kind: "red", support: "CEG", latex: "c^2+g^2=2e^2" },
      { id: "DEF", kind: "red", support: "DEF", latex: "d^2+f^2=2e^2" },
      { id: "ACDE", kind: "yellow", support: "ACDE", latex: "a^2+d^2=c^2+e^2" },
    ],
    normalizationLatex: String.raw`e=1`,
    rootsLatex: String.raw`
\begin{aligned}
a&=L_u,&j&=R_u,\\
c&=L_v,&g&=R_v,\\
d&=L_w,&f&=R_w,
\end{aligned}`,
    trigEquationLatex: String.raw`
\boxed{\ \sin4\gamma=\sin4\beta-\sin4\alpha\ }`,
    coordinateEquationLatex: String.raw`
\boxed{\ L_u^2+L_w^2=L_v^2+1\ }`,
    derivation: {
      ru: "Три прогрессии AEJ, CEG и DEF имеют один центр e² и независимо параметризуются тремя углами. Жёлтая квадрика ACDE — единственное соотношение между ними, поэтому здесь итоговое уравнение принимает самый короткий вид.",
      en: "The three progressions AEJ, CEG, and DEF share the center e² and are independently parametrized by three angles. The yellow quadric ACDE is their only compatibility relation, so this orbit has the shortest final equation.",
    },
  },
] as const;

export function sevenNineProfile(pattern: SevenNinePattern): string {
  const redCount = pattern.relations.filter(
    (relation) => relation.kind === "red",
  ).length;
  return `${"R".repeat(redCount)}${"Y".repeat(pattern.relations.length - redCount)}`;
}
