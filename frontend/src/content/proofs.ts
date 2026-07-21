import type { CommonProofId } from "../lib/families";
import type { Locale } from "../i18n";

export interface CommonProof {
  id: CommonProofId;
  title: string;
  titleEn: string;
  colorLabel: string;
  colorLabelEn: string;
  summary: string;
  summaryEn: string;
  formulas: readonly string[];
  conclusion: string;
  conclusionEn: string;
}

export const MAGIC3_LATEX = String.raw`\mathcal M(E,x,y)=\begin{pmatrix}
E+x & E-x+y & E-y\\
E-x-y & E & E+x+y\\
E+y & E+x-y & E-x
\end{pmatrix}`;

export const COMMON_PROOFS: readonly CommonProof[] = [
  {
    id: "arithmetic-progression",
    title: "Красная лемма: три квадрата в арифметической прогрессии",
    titleEn: "Red lemma: three squares in arithmetic progression",
    colorLabel: "красная опора",
    colorLabelEn: "red support",
    summary:
      "Красная тройка означает линейное условие U + W = 2V на трёх клетках, значения которых одновременно являются квадратами.",
    summaryEn:
      "A red triple means the linear condition U + W = 2V on three cells whose values are all perfect squares.",
    formulas: [
      String.raw`r=-a^2+2ab+b^2,\qquad s=a^2+b^2,\qquad t=a^2+2ab-b^2`,
      String.raw`r^2+t^2=2s^2`,
      String.raw`(U,V,W)=(k^2r^2,\,k^2s^2,\,k^2t^2)\Longrightarrow U+W=2V`,
    ],
    conclusion:
      "После подстановки тройки в соответствующие позиции Magic3 линейное равенство восстанавливает общие координаты E, x, y.",
    conclusionEn:
      "Substituting the triple into the corresponding Magic3 positions turns this linear equality into the required common coordinates E, x, and y.",
  },
  {
    id: "two-square-norm",
    title: "Жёлтая лемма: равенство двух сумм квадратов",
    titleEn: "Yellow lemma: equality of two sums of squares",
    colorLabel: "жёлтая опора",
    colorLabelEn: "yellow support",
    summary:
      "Жёлтая четвёрка получается из композиции гауссовой нормы и даёт равенство двух попарных сумм клеток.",
    summaryEn:
      "A yellow four-cell support comes from composition of the Gaussian norm and gives an equality between two pairwise cell sums.",
    formulas: [
      String.raw`u=ac+bd,\quad v=ad-bc,\quad w=ac-bd,\quad z=ad+bc`,
      String.raw`u^2+v^2=w^2+z^2=(a^2+b^2)(c^2+d^2)`,
      String.raw`(U,V,W,Z)=(u^2,v^2,w^2,z^2)\Longrightarrow U+V=W+Z`,
    ],
    conclusion:
      "Конкретная перестановка U, V, W, Z указана в доказательстве семейства; цветом отмечены ровно участвующие клетки.",
    conclusionEn:
      "Each family proof specifies the exact permutation of U, V, W, and Z; the color marks precisely the participating cells.",
  },
  {
    id: "sqrt-minus-two-norm",
    title: "Голубая лемма: норма в Q(√−2)",
    titleEn: "Blue lemma: the norm in Q(√−2)",
    colorLabel: "голубая опора",
    colorLabelEn: "blue support",
    summary:
      "Голубая четвёрка кодирует взвешенное равенство квадратов, полученное композицией нормы u² + 2v².",
    summaryEn:
      "A blue four-cell support encodes a weighted equality of squares obtained by composing the norm u² + 2v².",
    formulas: [
      String.raw`u=ac+2bd,\quad v=ad-bc,\quad w=ac-2bd,\quad z=ad+bc`,
      String.raw`u^2+2v^2=w^2+2z^2=(a^2+2b^2)(c^2+2d^2)`,
      String.raw`(U,V,W,Z)=(u^2,v^2,w^2,z^2)\Longrightarrow U+2V=W+2Z`,
    ],
    conclusion:
      "Коэффициенты 1 и 2 объясняют, почему голубая опора не совпадает с обычным равенством двух сумм.",
    conclusionEn:
      "The coefficients 1 and 2 explain why a blue support differs from an ordinary equality of two sums of squares.",
  },
  {
    id: "weighted-conic",
    title: "Коричневая лемма: взвешенная коника",
    titleEn: "Brown lemma: a weighted conic",
    colorLabel: "коричневая опора",
    colorLabelEn: "brown support",
    summary:
      "Коричневая четвёрка ABCG подчиняется отдельному взвешенному соотношению; в семействе ABCDG оно совмещено с жёлтой нормой.",
    summaryEn:
      "The brown support ABCG satisfies a separate weighted relation; the ABCDG family combines it with a yellow norm relation.",
    formulas: [
      String.raw`2A+2B=C+3G`,
      String.raw`A=a^2,\quad B=b^2,\quad C=c^2,\quad G=g^2`,
      String.raw`2a^2+2b^2-c^2-3g^2=0`,
    ],
    conclusion:
      "Полиномиальная параметризация этой коники и её совместимость с B+C=D+G закреплены сертификатом yellow_brown_abcdg_square_mask.",
    conclusionEn:
      "The polynomial parametrization of this conic and its compatibility with B+C=D+G are certified by yellow_brown_abcdg_square_mask.",
  },
  {
    id: "diagonal-quadric-projection",
    title: "Проекционная лемма для диагональной квадрики",
    titleEn: "Projection lemma for a diagonal quadric",
    colorLabel: "зелёные, коричневые и серые опоры",
    colorLabelEn: "green, brown, and gray supports",
    summary:
      "Любая невырожденная четырёхчленная диагональная квадрика с суммой коэффициентов ноль покрывается четырьмя знаковыми проекционными картами.",
    summaryEn:
      "Every nondegenerate four-term diagonal quadric whose coefficients sum to zero is covered by four signed projection charts.",
    formulas: [
      String.raw`Q(q)=k_1q_1^2+k_2q_2^2+k_3q_3^2+k_4q_4^2,\qquad \sum_{i=1}^4k_i=0`,
      String.raw`H=\begin{pmatrix}1&1&1&1\\1&1&-1&-1\\1&-1&1&-1\\1&-1&-1&1\end{pmatrix},\qquad \det H=-16`,
      String.raw`\varepsilon\in\operatorname{rows}(H),\quad D=\sum k_iu_i^2,\quad L_\varepsilon=\sum k_i\varepsilon_i u_i,\quad q_i=D\varepsilon_i-2L_\varepsilon u_i`,
      String.raw`Q(q)=D^2Q(\varepsilon)-4DL_\varepsilon^2+4L_\varepsilon^2D=0`,
      String.raw`Q(q^*)=0:\quad H(k_1q_1^*,\ldots,k_4q_4^*)^T\ne0\Longrightarrow\exists\varepsilon:\ L_\varepsilon(q^*)\ne0`,
      String.raw`u=q^*\Longrightarrow D=0,\qquad q=-2L_\varepsilon(q^*)q^*`,
    ],
    conclusion:
      "Четыре строки H дают конечное покрытие всех ненулевых рациональных точек при kᵢ ≠ 0. Общий знаменатель очищается однородным масштабированием корней; случай нулевого коэффициента выделяется в красную конику со свободным корнем.",
    conclusionEn:
      "The four rows of H cover every nonzero rational point when kᵢ ≠ 0. A common denominator is cleared by homogeneous root scaling; a zero coefficient is handled separately as the red conic with one free root.",
  },
];

export function localizeCommonProof(
  proof: CommonProof,
  locale: Locale,
): CommonProof {
  if (locale === "ru") return proof;
  return {
    ...proof,
    title: proof.titleEn,
    colorLabel: proof.colorLabelEn,
    summary: proof.summaryEn,
    conclusion: proof.conclusionEn,
  };
}

export function commonProofs(locale: Locale): readonly CommonProof[] {
  return COMMON_PROOFS.map((proof) => localizeCommonProof(proof, locale));
}

export function commonProofById(
  id: string | undefined,
  locale: Locale = "ru",
): CommonProof | undefined {
  const proof = COMMON_PROOFS.find((candidate) => candidate.id === id);
  return proof ? localizeCommonProof(proof, locale) : undefined;
}
