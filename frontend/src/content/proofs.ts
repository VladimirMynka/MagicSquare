import type { CommonProofId } from "../lib/families";

export interface CommonProof {
  id: CommonProofId;
  title: string;
  colorLabel: string;
  summary: string;
  formulas: readonly string[];
  conclusion: string;
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
    colorLabel: "красная опора",
    summary:
      "Красная тройка означает линейное условие U + W = 2V на трёх клетках, значения которых одновременно являются квадратами.",
    formulas: [
      String.raw`r=-a^2+2ab+b^2,\qquad s=a^2+b^2,\qquad t=a^2+2ab-b^2`,
      String.raw`r^2+t^2=2s^2`,
      String.raw`(U,V,W)=(k^2r^2,\,k^2s^2,\,k^2t^2)\Longrightarrow U+W=2V`,
    ],
    conclusion:
      "После подстановки тройки в соответствующие позиции Magic3 линейное равенство восстанавливает общие координаты E, x, y.",
  },
  {
    id: "two-square-norm",
    title: "Жёлтая лемма: равенство двух сумм квадратов",
    colorLabel: "жёлтая опора",
    summary:
      "Жёлтая четвёрка получается из композиции гауссовой нормы и даёт равенство двух попарных сумм клеток.",
    formulas: [
      String.raw`u=ac+bd,\quad v=ad-bc,\quad w=ac-bd,\quad z=ad+bc`,
      String.raw`u^2+v^2=w^2+z^2=(a^2+b^2)(c^2+d^2)`,
      String.raw`(U,V,W,Z)=(u^2,v^2,w^2,z^2)\Longrightarrow U+V=W+Z`,
    ],
    conclusion:
      "Конкретная перестановка U, V, W, Z указана в доказательстве семейства; цветом отмечены ровно участвующие клетки.",
  },
  {
    id: "sqrt-minus-two-norm",
    title: "Голубая лемма: норма в Q(√−2)",
    colorLabel: "голубая опора",
    summary:
      "Голубая четвёрка кодирует взвешенное равенство квадратов, полученное композицией нормы u² + 2v².",
    formulas: [
      String.raw`u=ac+2bd,\quad v=ad-bc,\quad w=ac-2bd,\quad z=ad+bc`,
      String.raw`u^2+2v^2=w^2+2z^2=(a^2+2b^2)(c^2+2d^2)`,
      String.raw`(U,V,W,Z)=(u^2,v^2,w^2,z^2)\Longrightarrow U+2V=W+2Z`,
    ],
    conclusion:
      "Коэффициенты 1 и 2 объясняют, почему голубая опора не совпадает с обычным равенством двух сумм.",
  },
  {
    id: "weighted-conic",
    title: "Коричневая лемма: взвешенная коника",
    colorLabel: "коричневая опора",
    summary:
      "Коричневая четвёрка ABCG подчиняется отдельному взвешенному соотношению; в семействе ABCDG оно совмещено с жёлтой нормой.",
    formulas: [
      String.raw`2A+2B=C+3G`,
      String.raw`A=a^2,\quad B=b^2,\quad C=c^2,\quad G=g^2`,
      String.raw`2a^2+2b^2-c^2-3g^2=0`,
    ],
    conclusion:
      "Полиномиальная параметризация этой коники и её совместимость с B+C=D+G закреплены сертификатом yellow_brown_abcdg_square_mask.",
  },
];

export function commonProofById(
  id: string | undefined,
): CommonProof | undefined {
  return COMMON_PROOFS.find((proof) => proof.id === id);
}
