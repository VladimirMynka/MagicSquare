import type { FamilyDefinition } from "../lib/families";
import type { Locale } from "../i18n";

export interface FamilyProofText {
  assumptions: string;
  cellSystem?: string;
  definitions: readonly string[];
  squareValues: string;
  identityDerivation: string;
  identities: readonly string[];
  parityClearance?: boolean;
  integralityClearance?: string;
  parameterDerivation?: string;
  coverageText?: string;
  coverage?: FamilyCoverageText;
}

export interface FamilyCoverageText {
  status: "complete" | "conditional";
  guaranteedSubset: string;
  conditions: readonly string[];
  inverseArgument: string;
  exceptionalLocus: string;
  exceptionalConditions: readonly string[];
  conclusion: string;
}

function proof(
  assumptions: string,
  definitions: readonly string[],
  squareValues: string,
  identityDerivation: string,
  identities: readonly string[],
  parityClearance = false,
): FamilyProofText {
  return {
    assumptions,
    definitions,
    squareValues,
    identityDerivation,
    identities,
    parityClearance,
  };
}

function quadraticRelation(
  positions: readonly string[],
  coefficients: readonly number[],
): string {
  const term = (position: string, coefficient: number) => {
    const absolute = Math.abs(coefficient);
    return `${absolute === 1 ? "" : absolute}q_${position}^2`;
  };
  const side = (positive: boolean) =>
    positions
      .map((position, index) => ({ position, coefficient: coefficients[index] }))
      .filter(({ coefficient }) => (positive ? coefficient > 0 : coefficient < 0))
      .map(({ position, coefficient }) => term(position, coefficient))
      .join("+");
  return `${side(true)}=${side(false)}`;
}

function choose(locale: Locale, ru: string, en: string): string {
  return locale === "ru" ? ru : en;
}

function fourFamilyProof(
  family: FamilyDefinition,
  locale: Locale,
): FamilyProofText {
  const positions = family.positions;
  const coefficients = family.relationCoefficients;
  if (!coefficients || !family.parametrizationKind) {
    throw new Error(`No structured 4/9 proof data for ${family.id}`);
  }
  const roots = positions.map((position) => `q_${position}`);
  const delta = family.integralityScale ?? 1;
  const relation = quadraticRelation(positions, coefficients);
  let definitions: readonly string[];
  let identityDerivation: string;
  let parameterDerivation: string;

  if (family.parametrizationKind === "red-conic") {
    const zeroIndex = coefficients.findIndex((coefficient) => coefficient === 0);
    const middleIndex = coefficients.findIndex(
      (coefficient) => Math.abs(coefficient) === 2,
    );
    const ends = coefficients
      .map((coefficient, index) => ({ coefficient, index }))
      .filter(({ coefficient }) => Math.abs(coefficient) === 1)
      .map(({ index }) => index);
    definitions = [
      String.raw`r=-a^2+2ab+b^2,\qquad s=a^2+b^2,\qquad t=a^2+2ab-b^2`,
      String.raw`r^2+t^2=2s^2`,
      String.raw`q_${positions[ends[0]]}=${delta}dr,\quad q_${positions[middleIndex]}=${delta}ds,\quad q_${positions[ends[1]]}=${delta}dt,\quad q_${positions[zeroIndex]}=${delta}cd`,
    ];
    identityDerivation =
      choose(
        locale,
        "Раскрытие скобок в первой строке даёт полную рациональную параметризацию коники трёх квадратов в арифметической прогрессии. Четвёртый корень не входит в единственную связь и потому остаётся свободным.",
        "Expanding the first line gives the complete rational parametrization of the conic of three squares in arithmetic progression. The fourth root does not occur in the unique relation and therefore remains free.",
      );
    parameterDerivation =
      choose(
        locale,
        "Обратно, рациональную точку красной коники соединяем прямой с точкой (1,1,1). Наклон прямой даёт отношение a:b, общий множитель переходит в d, а свободный четвёртый корень — в c. После очистки знаменателей получаются именно выписанные r, s, t. Поэтому параметризация полна с точностью до знаков корней и общего масштаба.",
        "Conversely, join a rational point of the red conic to (1,1,1). The line slope gives the ratio a:b, its common factor is absorbed by d, and the free fourth root by c. Clearing denominators gives exactly the displayed r, s, and t. Hence the parametrization is complete up to root signs and common scaling.",
      );
  } else {
    const [k1, k2, k3, k4] = coefficients;
    definitions = [
      String.raw`(k_1,k_2,k_3,k_4)=(${k1},${k2},${k3},${k4}),\qquad k_1+k_2+k_3+k_4=0`,
      String.raw`D=k_1a^2+k_2b^2+k_3c^2,\qquad L=k_1a+k_2b+k_3c`,
      String.raw`(${roots.join(",")})=${delta}d\,(D-2La,\,D-2Lb,\,D-2Lc,\,D)`,
    ];
    identityDerivation =
      choose(
        locale,
        "Это проекция диагональной квадрики из рациональной точки (1,1,1,1). Подстановка корней сокращается тождественно: член D² исчезает по сумме коэффициентов, смешанный член равен −4DL², а квадратичный — +4L²D.",
        "This is projection of the diagonal quadric from the rational point (1,1,1,1). Substitution cancels identically: the D² term vanishes because the coefficients sum to zero, the mixed term is −4DL², and the quadratic term is +4L²D.",
      );
    parameterDerivation =
      choose(
        locale,
        "Для полноты берём четыре строки ε матрицы Адамара H из общей леммы и однородную знаковую формулу qᵢ=Dεᵢ−2Lεuᵢ. Все kᵢ здесь ненулевые. Для ненулевой рациональной точки q* вектор (kᵢqᵢ*) ненулевой, а det H=−16, поэтому хотя бы для одной строки Lε(q*)≠0. Подстановка u=q* даёт D=0 и новый вектор корней −2Lε(q*)q*, то есть ту же проективную точку. Отображаемая формула — аффинная карта ε=(1,1,1,1), u₄=0; остальные три знаковые карты закрывают её исключительные образующие. Знаменатели очищаются общим множителем d.",
        "For completeness, use the four rows ε of the Hadamard matrix H from the general lemma and the homogeneous signed formula qᵢ=Dεᵢ−2Lεuᵢ. Every kᵢ is nonzero here. For a nonzero rational point q*, the vector (kᵢqᵢ*) is nonzero; since det H=−16, at least one row has Lε(q*)≠0. Setting u=q* gives D=0 and the new root vector −2Lε(q*)q*, the same projective point. The displayed generator is the affine chart ε=(1,1,1,1), u₄=0; the other three signed charts cover its exceptional rulings. A common factor d clears denominators.",
      );
  }

  return {
    assumptions:
      choose(
        locale,
        "Параметры a, b, c, d — целые числа. Никаких условий положительности или различности для теоремы не требуется: утверждается наличие как минимум четырёх квадратных клеток.",
        "The parameters a, b, c, and d are integers. The theorem requires neither positivity nor distinctness: it asserts that at least the four declared cells are perfect squares.",
      ),
    definitions,
    squareValues: String.raw`(${positions.join(",")})=(${roots.map((root) => `${root}^2`).join(",")})`,
    identityDerivation,
    identities: [relation],
    integralityClearance: choose(
      locale,
      `Множитель δ=${delta} равен модулю ненулевого минора матрицы выбранных клеточных форм. Умножение корней на δ умножает значения на δ², поэтому формулы Крамера для E, x, y становятся целочисленными.`,
      `The factor δ=${delta} is the absolute value of a nonzero minor of the selected cell-form matrix. Multiplying every root by δ multiplies every cell value by δ², so Cramer's formulas for E, x, and y become integral.`,
    ),
    parameterDerivation,
    coverage: {
      status: "complete",
      guaranteedSubset: choose(
        locale,
        "Все рациональные решения единственной квадрики данной маски, включая нулевое решение. После очистки знаменателей это означает все целые проективные классы с точностью до знаков корней, общего масштаба, общего НОД и симметрий D₄.",
        "Every rational solution of the single quadric for this mask, including the zero solution. After clearing denominators, this means every integral projective class up to root signs, common scale, common gcd, and D₄ symmetries.",
      ),
      conditions: [
        String.raw`(q_P)_{P\in S}\in V_S(\mathbb Q),\qquad R_S(q)=0`,
      ],
      inverseArgument:
        family.parametrizationKind === "red-conic"
          ? choose(
              locale,
              "Красная коника имеет рациональную точку (1,1,1), поэтому проекция прямыми даёт все её рациональные точки; четвёртый корень свободен.",
              "The red conic has the rational point (1,1,1), so projection by lines gives all of its rational points; the fourth root is free.",
            )
          : choose(
              locale,
              "Четыре знаковые карты — строки матрицы Адамара. Для любого ненулевого вектора корней хотя бы одно спаривание Lε ненулевое, поскольку det H=−16; соответствующая карта возвращает ту же проективную точку.",
              "The four signed charts are the rows of the Hadamard matrix. For every nonzero root vector at least one pairing Lε is nonzero because det H=−16; that chart returns the same projective point.",
            ),
      exceptionalLocus: choose(
        locale,
        "Исключительного множества у объединения карт нет. Исключительная образующая одной аффинной карты закрывается одной из трёх остальных знаковых карт.",
        "The union of the charts has no exceptional locus. An exceptional ruling of one affine chart is covered by one of the other three signed charts.",
      ),
      exceptionalConditions: [String.raw`\operatorname{Exc}(\Phi_S)=\varnothing`],
      conclusion: choose(
        locale,
        "Параметризация полна над рациональными точками и алгоритмически полна после очистки знаменателей.",
        "The parametrization is complete over rational points and algorithmically complete after denominators are cleared.",
      ),
    },
    coverageText:
      family.coverageStatus === "complete-up-to-equivalence"
        ? choose(
            locale,
            "Полнота доказана над рациональными точками и после очистки знаменателей переносится на целые решения с точностью до знаков корней, общего масштаба, общего НОД и симметрий D₄.",
            "Completeness is proved over rational points and, after clearing denominators, transfers to integral solutions up to root signs, common scale, common gcd, and D₄ symmetries.",
          )
        : choose(
            locale,
            "Полнота задаётся алгоритмически четырьмя знаковыми картами, соответствующими строкам матрицы Адамара. Отображаемый генератор реализует одну аффинную карту; если целевая точка лежит на её исключительной образующей, обратный алгоритм выбирает строку с ненулевым спариванием Lε и использует соответствующую однородную карту.",
            "Completeness is algorithmic through four signed charts corresponding to the rows of the Hadamard matrix. The displayed generator implements one affine chart; if the target lies on an exceptional ruling, the inverse algorithm selects a row with nonzero pairing Lε and uses its homogeneous chart.",
          ),
  };
}

const unrestricted =
  "Параметры a, b, c, d — произвольные целые числа. Все вводимые ниже корни поэтому целочисленны.";
const gcdRestricted =
  "Параметры a, b, c, d целые. После данных ниже определений требуется в точности g₁g₂ ≠ 0; тогда частные p и q определены и целочисленны. Нулевые ветви этого деления данной формулой не заявляются.";

const redRedOne = [
  String.raw`k_1=a^2+b^2,\qquad k_2=c^2+d^2`,
  String.raw`r_-=k_2(-a^2+2ab+b^2),\quad r_0=k_2(a^2+b^2),\quad r_+=k_2(a^2+2ab-b^2)`,
  String.raw`s_-=k_1(-c^2+2cd+d^2),\quad s_0=k_1(c^2+d^2),\quad s_+=k_1(c^2+2cd-d^2)`,
  String.raw`r_0=s_0=k_1k_2`,
];
const redRedOneDerivation =
  "Раскрытие скобок в тождестве (-u²+2uv+v²)²+(u²+2uv-v²)²=2(u²+v²)², сначала для (a,b), затем для (c,d), даёт две требуемые прогрессии квадратов с общим средним корнем.";
const redRedOneIdentities = [
  String.raw`r_-^2+r_+^2=2r_0^2,\qquad s_-^2+s_+^2=2s_0^2`,
];

const redRedTwo = [
  String.raw`k_1=a^2-b^2+2ab,\qquad k_2=c^2-d^2+2cd,\qquad u_0=k_1k_2`,
  String.raw`u_1=(c^2+d^2)k_1,\qquad u_2=(2cd+d^2-c^2)k_1`,
  String.raw`v_1=(a^2+b^2)k_2,\qquad v_2=(2ab+b^2-a^2)k_2`,
];
const redRedTwoDerivation =
  "То же тождество арифметической прогрессии применяется к парам (d,c) и (b,a). В обеих прогрессиях один крайний корень равен u₀=k₁k₂, поэтому их квадратные значения можно склеить в одну пятёрку.";
const redRedTwoIdentities = [
  String.raw`u_0^2+u_2^2=2u_1^2,\qquad u_0^2+v_2^2=2v_1^2`,
];

const redRedThree = [
  String.raw`k_1=a^2-b^2+2ab,\qquad k_2=c^2+d^2`,
  String.raw`r_-=k_2(-a^2+2ab+b^2),\quad r_0=k_2(a^2+b^2),\quad r_+=k_1k_2`,
  String.raw`s_-=k_1(-c^2+2cd+d^2),\quad s_0=k_1k_2,\quad s_+=k_1(c^2+2cd-d^2)`,
];
const redRedThreeDerivation =
  "Обе тройки получены из полной параметризации трёх квадратов в арифметической прогрессии; общий корень r₊=s₀ склеивает их в маску ABDEJ.";
const redRedThreeIdentities = [
  String.raw`r_-^2+r_+^2=2r_0^2,\qquad s_-^2+s_+^2=2s_0^2`,
];

const redYellowOne = [
  String.raw`\alpha=b,\quad\beta=a,\quad \rho=-\alpha^2+2\alpha\beta+\beta^2,\quad \sigma=\alpha^2+\beta^2,\quad \tau=\alpha^2+2\alpha\beta-\beta^2`,
  String.raw`g_1=\gcd(2\alpha\beta,c),\quad g_2=\gcd(\alpha^2-\beta^2,d),\quad p=\frac{2\alpha\beta}{g_1},\quad q=\frac{\alpha^2-\beta^2}{g_2}`,
  String.raw`u=pg_1+qg_2=\tau,\quad v=pg_2-qg_1,\quad w=pg_1-qg_2=\rho,\quad z=pg_2+qg_1`,
];
const redYellowOneDerivation =
  "Красное тождество даёт u²+w²=2σ². Гауссово тождество (pg₁+qg₂)²+(pg₂−qg₁)²=(pg₁−qg₂)²+(pg₂+qg₁)² одновременно даёт u²+v²=w²+z². Это и есть совместимые красная и жёлтая связи.";
const redYellowOneIdentities = [
  String.raw`u^2+w^2=2\sigma^2,\qquad u^2+v^2=w^2+z^2`,
];

const redYellowTwo = [
  String.raw`\alpha=b,\quad\beta=a,\quad \rho=-\alpha^2+2\alpha\beta+\beta^2,\quad \sigma=\alpha^2+\beta^2,\quad \tau=\alpha^2+2\alpha\beta-\beta^2`,
  String.raw`g_1=\gcd(\beta(\alpha+\beta),c),\quad g_2=\gcd(\alpha(\alpha-\beta),d),\quad p=\frac{\beta(\alpha+\beta)}{g_1},\quad q=\frac{\alpha(\alpha-\beta)}{g_2}`,
  String.raw`u=pg_1+qg_2=\sigma,\quad v=pg_2-qg_1,\quad w=pg_1-qg_2=\rho,\quad z=pg_2+qg_1`,
];
const redYellowTwoDerivation =
  "Из красной параметризации следует τ²+w²=2u². Та же формула композиции двух квадратов даёт u²+v²=w²+z². НОД введены только для целочисленного разнесения множителей; после их определения все пять корней целые.";
const redYellowTwoIdentities = [
  String.raw`\tau^2+w^2=2u^2,\qquad u^2+v^2=w^2+z^2`,
];

const redSeed = String.raw`r=-a^2+2ab+b^2,\qquad s=a^2+b^2,\qquad t=a^2+2ab-b^2,\qquad r^2+t^2=2s^2`;
const gaussianRotation = String.raw`N=c^2+d^2,\qquad P=d^2-c^2,\qquad Q=2cd,\qquad P^2+Q^2=N^2`;

const redBlueBase = [
  redSeed,
  String.raw`P=c^2+2d^2,\qquad Q=2cd,\qquad M=c^2-2d^2,\qquad P^2-2Q^2=M^2`,
  String.raw`\mathcal T_{P,Q}(u,v)=(Pu+2Qv,\,Qu+Pv)`,
  String.raw`\mathcal T_{P,Q}(u,v)_1^2-2\mathcal T_{P,Q}(u,v)_2^2=M^2(u^2-2v^2)`,
];

const yellowBlueBase = [
  String.raw`P=a^2-b^2,\qquad Q=2ab,\qquad N=a^2+b^2,\qquad P^2+Q^2=N^2`,
  String.raw`U=c^2-2d^2,\qquad V=2cd,\qquad M=c^2+2d^2,\qquad U^2+2V^2=M^2`,
];
const yellowBlueDerivation =
  "Подставляем выписанные полиномиальные корни в обе квадрики. Смешанные члены попарно сокращаются; оставшиеся части сокращаются по P²+Q²=N² и U²+2V²=M². Получаются два равенства, записанные ниже. Делений в формулах корней нет.";

const blueBlueBase = [
  String.raw`U_1=a^2-2b^2,\quad V_1=2ab,\quad M_1=a^2+2b^2,\quad U_1^2+2V_1^2=M_1^2`,
  String.raw`U_2=c^2-2d^2,\quad V_2=2cd,\quad M_2=c^2+2d^2,\quad U_2^2+2V_2^2=M_2^2`,
];

export const FAMILY_PROOFS: Readonly<Record<string, FamilyProofText>> = {
  acegj: proof(
    unrestricted,
    redRedOne,
    String.raw`(A,C,E,G,J)=(r_+^2,s_-^2,r_0^2,s_+^2,r_-^2)`,
    redRedOneDerivation,
    [...redRedOneIdentities, String.raw`A+J=2E,\qquad C+G=2E`],
  ),
  bdefh: proof(
    unrestricted,
    redRedOne,
    String.raw`(B,D,E,F,H)=(s_-^2,r_-^2,r_0^2,r_+^2,s_+^2)`,
    redRedOneDerivation,
    [...redRedOneIdentities, String.raw`D+F=2E,\qquad B+H=2E`],
    true,
  ),
  abehj: proof(
    unrestricted,
    redRedOne,
    String.raw`(A,B,E,H,J)=(r_+^2,s_-^2,r_0^2,s_+^2,r_-^2)`,
    redRedOneDerivation,
    [...redRedOneIdentities, String.raw`A+J=2E,\qquad B+H=2E`],
  ),
  bdefj: proof(
    unrestricted,
    redRedTwo,
    String.raw`(B,D,E,F,J)=(v_2^2,u_0^2,u_1^2,u_2^2,v_1^2)`,
    redRedTwoDerivation,
    [...redRedTwoIdentities, String.raw`D+F=2E,\qquad B+D=2J`],
  ),
  bdfgj: proof(
    unrestricted,
    redRedTwo,
    String.raw`(B,D,F,G,J)=(u_0^2,v_2^2,u_2^2,u_1^2,v_1^2)`,
    redRedTwoDerivation,
    [...redRedTwoIdentities, String.raw`B+D=2J,\qquad B+F=2G`],
    true,
  ),
  abdej: proof(
    unrestricted,
    redRedThree,
    String.raw`(A,B,D,E,J)=(r_-^2,s_-^2,s_+^2,r_0^2,s_0^2)`,
    redRedThreeDerivation,
    [...redRedThreeIdentities, String.raw`A+J=2E,\qquad B+D=2J`],
  ),
  bdfhj: proof(
    gcdRestricted,
    redYellowOne,
    String.raw`(B,D,F,H,J)=(u^2,w^2,z^2,v^2,\sigma^2)`,
    redYellowOneDerivation,
    [...redYellowOneIdentities, String.raw`B+D=2J,\qquad B+H=D+F`],
    true,
  ),
  abdfj: proof(
    gcdRestricted,
    redYellowTwo,
    String.raw`(A,B,D,F,J)=(z^2,w^2,\tau^2,v^2,u^2)`,
    redYellowTwoDerivation,
    [...redYellowTwoIdentities, String.raw`B+D=2J,\qquad A+B=F+J`],
    true,
  ),
  acehj: proof(
    gcdRestricted,
    redYellowTwo,
    String.raw`(A,C,E,H,J)=(\tau^2,v^2,u^2,z^2,w^2)`,
    redYellowTwoDerivation,
    [...redYellowTwoIdentities, String.raw`A+J=2E,\qquad C+E=H+J`],
  ),
  acdeg: proof(
    unrestricted,
    [redSeed, gaussianRotation],
    String.raw`(A,C,D,E,G)=((Pr-Qs)^2,(Nr)^2,(Qr+Ps)^2,(Ns)^2,(Nt)^2)`,
    "Красная связь следует из r²+t²=2s². Для жёлтой связи раскрываем две суммы квадратов; смешанные члены сокращаются, а P²+Q² заменяется на N².",
    [
      String.raw`C+G=N^2(r^2+t^2)=2N^2s^2=2E`,
      String.raw`A+D=(P^2+Q^2)(r^2+s^2)=N^2(r^2+s^2)=C+E`,
    ],
  ),
  abceh: proof(
    unrestricted,
    [redSeed, gaussianRotation],
    String.raw`(A,B,C,E,H)=((Ps-Qt)^2,(Nr)^2,(Qs+Pt)^2,(Ns)^2,(Nt)^2)`,
    "Гауссов поворот пары (s,t) сохраняет сумму квадратов с множителем N². Красная связь для B,E,H получается умножением исходной AP-тройки на N².",
    [
      String.raw`A+C=(P^2+Q^2)(s^2+t^2)=N^2(s^2+t^2)=E+H`,
      String.raw`B+H=N^2(r^2+t^2)=2N^2s^2=2E`,
    ],
  ),
  acdef: proof(
    gcdRestricted,
    redYellowTwo,
    String.raw`(A,C,D,E,F)=(z^2,v^2,w^2,u^2,\tau^2)`,
    redYellowTwoDerivation,
    [...redYellowTwoIdentities, String.raw`D+F=2E,\qquad A+D=C+E`],
  ),
  abefj: proof(
    gcdRestricted,
    redYellowOne,
    String.raw`(A,B,E,F,J)=(u^2,v^2,\sigma^2,z^2,w^2)`,
    redYellowOneDerivation,
    [...redYellowOneIdentities, String.raw`A+J=2E,\qquad A+B=F+J`],
  ),
  abfgj: proof(
    gcdRestricted,
    redYellowOne,
    String.raw`(A,B,F,G,J)=(v^2,u^2,w^2,\sigma^2,z^2)`,
    redYellowOneDerivation,
    [...redYellowOneIdentities, String.raw`B+F=2G,\qquad A+B=F+J`],
    true,
  ),
  befgj: {
    assumptions:
      "Параметры a, b, c, d — произвольные целые числа. Теорема гарантирует квадратность B, E, F, G, J, но не запрещает дополнительным клеткам также оказаться квадратами.",
    cellSystem: String.raw`\left\{\begin{aligned}E-x+y&=b_0^2,&E&=e_0^2,&E+x+y&=f_0^2,\\E+y&=g_0^2,&E-x&=j_0^2.\end{aligned}\right.`,
    definitions: [
      String.raw`r=-a^2+2ab+b^2,\qquad s=a^2+b^2,\qquad t=a^2+2ab-b^2`,
      String.raw`r^2+t^2=2s^2,\qquad K=t^2-s^2`,
      String.raw`\lambda=2cd,\qquad b_0=\lambda r,\quad g_0=\lambda s,\quad f_0=\lambda t`,
      String.raw`e_0=Kd^2+c^2,\qquad j_0=Kd^2-c^2`,
    ],
    squareValues: String.raw`(B,E,F,G,J)=(b_0^2,e_0^2,f_0^2,g_0^2,j_0^2)`,
    identityDerivation:
      "Красная квадрика параметризуется тройкой r,s,t. Для второй квадрики используем разность квадратов: произведение (e₀−j₀)(e₀+j₀) выбирается равным λ²(t²−s²). Это и есть рациональная параметризация гиперболы совместимости после очистки знаменателей.",
    identities: [
      String.raw`B+F=\lambda^2(r^2+t^2)=2\lambda^2s^2=2G`,
      String.raw`e_0^2-j_0^2=(2c^2)(2Kd^2)=4c^2d^2(t^2-s^2)=f_0^2-g_0^2`,
      String.raw`E+G=F+J`,
      String.raw`B+E-G-J=(B+F-2G)+(E+G-F-J)=0`,
      String.raw`B+E=G+J`,
    ],
    parameterDerivation:
      "Обратный алгоритм сначала параметризует красную конику B+F=2G. Затем равенство E−J=F−G на уровне значений переписывается как (e₀−j₀)(e₀+j₀)=(f₀−g₀)(f₀+g₀). Если хотя бы одна из клеток E,J ненулевая, знаки корней можно выбрать так, чтобы e₀−j₀≠0; после общего масштабирования два множителя дают рациональные c,d. Ветвь E=J=0 разбирается отдельно в разделе полноты.",
  },
  abcdh: proof(
    unrestricted,
    redBlueBase,
    String.raw`(A,B,C,D,H)=((Pr+Qt)^2,(Pt+2Qr)^2,(Ms)^2,(Mt)^2,(Mr)^2)`,
    "Красная связь получается масштабированием AP-тройки множителем M². Голубая связь — это тождество сохранения формы u²−2v² для преобразования T на паре (t,r).",
    [
      String.raw`D+H=M^2(t^2+r^2)=2M^2s^2=2C`,
      String.raw`B-2A=M^2(t^2-2r^2)=D-2H\quad\Longleftrightarrow\quad B+2H=D+2A`,
    ],
  ),
  abcdj: proof(
    unrestricted,
    redBlueBase,
    String.raw`(A,B,C,D,J)=((Ps+2Qt)^2,(Mr)^2,(Qs+Pt)^2,(Mt)^2,(Ms)^2)`,
    "Красная связь — масштабированная тройка (r,s,t). Голубая получается применением T к паре (s,t).",
    [
      String.raw`B+D=M^2(r^2+t^2)=2M^2s^2=2J`,
      String.raw`A-2C=M^2(s^2-2t^2)=J-2D\quad\Longleftrightarrow\quad A+2D=J+2C`,
    ],
    true,
  ),
  abdef: proof(
    unrestricted,
    redBlueBase,
    String.raw`(A,B,D,E,F)=((Mr+Qt)^2,(Mt-2Qr)^2,(Pt)^2,(Ps)^2,(Pr)^2)`,
    "Красная связь следует из AP-тождества. В голубой связи смешанные члены в B+2A сокращаются, после чего используется M²+2Q²=P² — равносильная запись P²−2Q²=M².",
    [
      String.raw`D+F=P^2(t^2+r^2)=2P^2s^2=2E`,
      String.raw`B+2A=P^2(t^2+2r^2)=D+2F`,
    ],
  ),
  abcgj: proof(
    unrestricted,
    yellowBlueBase,
    String.raw`\begin{aligned}A&=[N(2PV-NU)]^2,&B&=[N(QM-NV-PU)]^2,\\C&=[N(-MQ+2NV-PU)]^2,&G&=[N(QU-MP)]^2,\\J&=[N(-MN+2QV)]^2.\end{aligned}`,
    yellowBlueDerivation,
    [
      String.raw`A+J-C-G=0`,
      String.raw`C+2B-G-2J=0`,
      String.raw`A+J=C+G,\qquad C+2B=G+2J`,
    ],
    true,
  ),
  abcgh: proof(
    unrestricted,
    yellowBlueBase,
    String.raw`\begin{aligned}A&=(-QM-NV-PU)^2,&B&=(QM+2NV-PU)^2,\\C&=(2PV-NU)^2,&G&=(-2QV-NM)^2,\\H&=(-PM-QU)^2.\end{aligned}`,
    yellowBlueDerivation,
    [
      String.raw`B+H-C-G=0`,
      String.raw`G+2H-C-2A=0`,
      String.raw`B+H=C+G,\qquad G+2H=C+2A`,
    ],
    true,
  ),
  abcde: proof(
    unrestricted,
    yellowBlueBase,
    String.raw`\begin{aligned}A&=(-PU+QM-NV)^2,&B&=(-PU+2NV-QM)^2,\\C&=(-NU-PV)^2,&D&=(-PM-QU)^2,\\E&=(QV-NM)^2.\end{aligned}`,
    yellowBlueDerivation,
    [
      String.raw`A+D-C-E=0`,
      String.raw`B+2C-D-2E=0`,
      String.raw`A+D=C+E,\qquad B+2C=D+2E`,
    ],
  ),
  abcdf: proof(
    unrestricted,
    blueBlueBase,
    String.raw`\begin{aligned}A&=[M_2(U_1U_2+V_1M_2)]^2,\\B&=[M_2(U_1M_2-2U_2V_1-2M_1V_2)]^2,\\C&=[M_2(M_2U_1+U_2V_1-M_1V_2)]^2,\\D&=[M_2(M_1M_2-2U_1V_2)]^2,\\F&=[M_2(M_1U_2+2V_1V_2)]^2.\end{aligned}`,
    "Подстановка этих пяти миноров в две голубые квадрики и раскрытие скобок оставляет только множители U₁²+2V₁²−M₁² и U₂²+2V₂²−M₂²; оба равны нулю. Поэтому выполнены обе совместимые нормы.",
    [
      String.raw`B+2A-D-2F=0`,
      String.raw`D+2A-F-2C=0`,
      String.raw`B+2A=D+2F,\qquad D+2A=F+2C`,
    ],
    true,
  ),
  abcdg: proof(
    unrestricted,
    [
      String.raw`r=-a^2+2ab+b^2,\quad s=a^2+b^2,\quad u=a^2+2ab-b^2,\quad r^2+u^2=2s^2`,
      String.raw`K=2r^2-s^2,\qquad P=Kc^2-d^2,\qquad Q=2ucd`,
      String.raw`\alpha=u(Kc^2+d^2),\quad\beta=Pr-Qs,\quad\gamma=Ps+Qr,\quad\delta=Pr+Qs,\quad\eta=Qr-Ps`,
      String.raw`E=P^2s^2+Q^2r^2`,
    ],
    String.raw`(A,B,C,D,G)=(\alpha^2,\beta^2,\gamma^2,\delta^2,\eta^2)`,
    "Жёлтая связь получается двумя гауссовыми поворотами. Для коричневой связи остаток квадрики последовательно сводится к квадрату α²; ниже выписано полное сокращение. Последняя формула одновременно доказывает, что выбранный E восстанавливает C и G без деления.",
    [
      String.raw`\beta^2+\gamma^2=\delta^2+\eta^2=(P^2+Q^2)(r^2+s^2)`,
      String.raw`\gamma^2+3\eta^2-2\beta^2=2\left[P^2(2s^2-r^2)+Q^2(2r^2-s^2)\right]`,
      String.raw`2s^2-r^2=u^2,\qquad 2r^2-s^2=K`,
      String.raw`u^2P^2+KQ^2=u^2(Kc^2+d^2)^2=\alpha^2`,
      String.raw`2A+2B=C+3G,\qquad B+C=D+G`,
      String.raw`C+G=\gamma^2+\eta^2=2(P^2s^2+Q^2r^2)=2E`,
    ],
  ),
};

const redRedParameterDerivation =
  "Начинаем с двух копий красной коники r²+t²=2s². Каждая рациональная тройка корней получается стандартной парой параметров. Чтобы две тройки имели одну и ту же клетку, умножаем первую тройку на выделенный корень второй, а вторую — на выделенный корень первой; именно эти перекрёстные множители обозначены k₁ и k₂. После этой однородной склейки общий корень совпадает тождественно, а перестановка остальных четырёх корней даёт указанную маску.";

const gcdRedYellowParameterDerivation =
  "Сначала красная квадрика даёт тройку ρ, σ, τ. Вторая, жёлтая квадрика после переноса имеет вид z²−v²=u²−w²=(u−w)(u+w). Для показанных красных корней два множителя справа равны, с точностью до 2, произведениям 2αβ и α²−β². Разносим их между p, q, g₁, g₂ посредством НОД и полагаем v=pg₂−qg₁, z=pg₂+qg₁. Тогда z²−v²=4pqg₁g₂ точно совпадает с u²−w². Это выводит формулы из двух исходных квадрик, а не только проверяет готовую подстановку.";

const gaussianRedYellowParameterDerivation =
  "Красную квадрику сначала параметризуем корнями r, s, t. После этого жёлтая квадрика требует сохранить сумму квадратов одной пары. Все точки соответствующей рациональной окружности получаются, с точностью до масштаба и исключительной карты, из P=d²−c², Q=2cd, N=c²+d². Умножение пары на матрицу ((P,−Q),(Q,P)) даёт выписанные корни; тождество P²+Q²=N² одновременно обеспечивает согласование с уже выбранной красной тройкой.";

const redBlueParameterDerivation =
  "Красная квадрика даёт r, s, t. Оставшаяся голубая квадрика является равенством значений формы X²−2Y². Её рациональная коника параметризуется P=c²+2d², Q=2cd, M=c²−2d², после чего умножение в Q(√2) задаёт линейное преобразование T(P,Q). Решение двух клеточных квадрик относительно оставшихся корней даёт ровно выписанные компоненты T; масштаб M приклеивает их к красной тройке.";

const yellowBlueParameterDerivation =
  "Отдельно параметризуем две нормы: P²+Q²=N² и U²+2V²=M². После этой подстановки две клеточные квадрики становятся однородной линейной системой по билинейным произведениям PU, PV, QU, QV, NM и другим указанным произведениям. Выписанные пять корней — её совместимые миноры; прямое раскрытие в следующей строке показывает, что никаких дополнительных делений или скрытых условий для этой карты нет.";

const blueBlueParameterDerivation =
  "Обе голубые квадрики сначала приводим к двум копиям Uᵢ²+2Vᵢ²=Mᵢ². Исключение общих клеточных корней даёт матрицу совместимости ранга четыре; пять показанных выражений являются её максимальными минорами. Общий множитель M₂ очищает единственный знаменатель, а две нормовые формулы сокращают остатки обеих исходных квадрик до нуля.";

const yellowBrownParameterDerivation =
  "Красная вспомогательная коника вводит r, s, u. После подстановки в коричневую квадрику коэффициент при второй паре сворачивается в K=2r²−s². Пара P=Kc²−d², Q=2ucd параметризует полученную взвешенную конику; два гауссовых поворота дают β, γ, δ, η. Последовательность равенств ниже решает обе квадрики и одновременно восстанавливает центр E без деления.";

const FIVE_PARAMETER_DERIVATIONS: Readonly<Record<string, string>> = {
  acegj: redRedParameterDerivation,
  bdefh: redRedParameterDerivation,
  abehj: redRedParameterDerivation,
  bdefj: redRedParameterDerivation,
  bdfgj: redRedParameterDerivation,
  abdej: redRedParameterDerivation,
  bdfhj: gcdRedYellowParameterDerivation,
  abdfj: gcdRedYellowParameterDerivation,
  acehj: gcdRedYellowParameterDerivation,
  acdef: gcdRedYellowParameterDerivation,
  abefj: gcdRedYellowParameterDerivation,
  abfgj: gcdRedYellowParameterDerivation,
  acdeg: gaussianRedYellowParameterDerivation,
  abceh: gaussianRedYellowParameterDerivation,
  abcdh: redBlueParameterDerivation,
  abcdj: redBlueParameterDerivation,
  abdef: redBlueParameterDerivation,
  abcgj: yellowBlueParameterDerivation,
  abcgh: yellowBlueParameterDerivation,
  abcde: yellowBlueParameterDerivation,
  abcdf: blueBlueParameterDerivation,
  abcdg: yellowBrownParameterDerivation,
};

const RED_RED_IDS = new Set([
  "acegj",
  "bdefh",
  "abehj",
  "bdefj",
  "bdfgj",
  "abdej",
]);

const GCD_RED_YELLOW_IDS = new Set([
  "bdfhj",
  "abdfj",
  "acehj",
  "acdef",
  "abefj",
  "abfgj",
]);

const RED_RED_SHARED_ROOT: Readonly<Record<string, string>> = {
  acegj: "E",
  bdefh: "E",
  abehj: "E",
  bdefj: "D",
  bdfgj: "B",
  abdej: "J",
};

const GCD_COVERAGE_CELLS: Readonly<
  Record<string, readonly [string, string]>
> = {
  bdfhj: ["B", "D"],
  abdfj: ["J", "B"],
  acehj: ["E", "J"],
  acdef: ["E", "D"],
  abefj: ["A", "J"],
  abfgj: ["B", "F"],
};

const GAUSSIAN_RED_YELLOW_IDS = new Set(["acdeg", "abceh"]);
const RED_BLUE_IDS = new Set(["abcdh", "abcdj", "abdef"]);
const YELLOW_BLUE_DETERMINANTS: Readonly<Record<string, string>> = {
  abcde: String.raw`\Delta=N(3N^2-2Q^2)=N(3P^2+Q^2)`,
  abcgj: String.raw`\Delta=N(3N^2-4Q^2)=N(3P^2-Q^2)`,
  abcgh: String.raw`\Delta=N(3N^2-4Q^2)=N(3P^2-Q^2)`,
};

function completeCoverage(
  locale: Locale,
  inverseArgument: string,
  conditions: readonly string[] = [
    String.raw`(q_P)_{P\in S}\in V_S(\mathbb Q)`,
  ],
): FamilyCoverageText {
  return {
    status: "complete",
    guaranteedSubset: choose(
      locale,
      "Всё множество рациональных векторов корней, удовлетворяющих двум квадрикам этой маски, включая нулевой вектор. Целые решения понимаются проективно: после очистки знаменателей, с точностью до знаков корней и общего масштаба.",
      "The entire set of rational root vectors satisfying the two quadrics for this mask, including the zero vector. Integral solutions are understood projectively: after clearing denominators, up to root signs and common scale.",
    ),
    conditions,
    inverseArgument,
    exceptionalLocus: choose(
      locale,
      "Непокрытых рациональных ветвей нет. Возможные нулевые знаменатели обратной карты либо устраняются сменой знаков корней, либо вынуждают весь вектор корней быть нулевым; нулевой вектор формула также получает.",
      "There are no uncovered rational branches. A possible zero denominator in the inverse chart is removed by changing root signs or forces the entire root vector to be zero; the formula also produces the zero vector.",
    ),
    exceptionalConditions: [String.raw`\operatorname{Exc}(\Phi_S)=\varnothing`],
    conclusion: choose(
      locale,
      "Полнота доказана над рациональными решениями обеих квадрик.",
      "Completeness is proved over the rational solutions of both quadrics.",
    ),
  };
}

function fiveCoverage(id: string, locale: Locale): FamilyCoverageText {
  if (RED_RED_IDS.has(id)) {
    const shared = RED_RED_SHARED_ROOT[id];
    return completeCoverage(
      locale,
      choose(
        locale,
        `При q_${shared}≠0 обе красные коники обращаются стандартной полной параметризацией, а перекрёстные множители выравнивают их масштабы по общему корню. При q_${shared}=0 соответствующая красная связь над Q вынуждает соседние корни обратиться в нуль: для среднего корня используется сумма двух квадратов, для крайнего — иррациональность √2. Вторая красная связь затем также даёт нулевой вектор.`,
        `When q_${shared}≠0, invert both red conics by their standard complete parametrization and use the cross-multipliers to align their scales at the shared root. When q_${shared}=0, the corresponding red relation over Q forces the adjacent roots to vanish: a shared middle root uses a sum of two squares, while a shared endpoint uses the irrationality of √2. The second red relation then also gives the zero vector.`,
      ),
      [
        String.raw`(q_P)_{P\in S}\in V_S(\mathbb Q),\qquad q_${shared}\ne0`,
        String.raw`q_${shared}=0\Longrightarrow(q_P)_{P\in S}=0`,
      ],
    );
  }
  if (GCD_RED_YELLOW_IDS.has(id)) {
    const [left, right] = GCD_COVERAGE_CELLS[id];
    return {
      status: "conditional",
      guaranteedSubset: choose(
        locale,
        `Все рациональные решения двух квадрик на открытой ветви ${left}≠${right}. Это в точности ветвь u²−w²≠0; после очистки знаменателей она покрывается целочисленной НОД-формулой.`,
        `Every rational solution of the two quadrics on the open branch ${left}≠${right}. This is exactly the branch u²−w²≠0; after denominators are cleared, it is covered by the integral gcd formula.`,
      ),
      conditions: [
        String.raw`${left}-${right}=u^2-w^2\ne0`,
        String.raw`(u-w)(u+w)=(z-v)(z+v)\ne0`,
      ],
      inverseArgument: choose(
        locale,
        "Красная коника сначала обращается полностью. Затем ненулевые множители u−w и u+w разносятся между p,q,g₁,g₂; рациональные знаменатели очищаются общим масштабом, после чего НОД даёт целые представители. Формулы v=pg₂−qg₁ и z=pg₂+qg₁ возвращают исходную точку с точностью до знаков.",
        "First invert the red conic completely. Then distribute the nonzero factors u−w and u+w among p,q,g₁,g₂; a common scale clears rational denominators, and gcds give integral representatives. The formulas v=pg₂−qg₁ and z=pg₂+qg₁ recover the original point up to signs.",
      ),
      exceptionalLocus: choose(
        locale,
        `Вне гарантии остаются нулевые ветви ${left}=${right}: там u=±w и одновременно z=±v. Текущая формула делит на один из нулевых множителей; эти компоненты требуют отдельных карт и не объявляются покрытыми.`,
        `The zero branches ${left}=${right} remain outside the guarantee: there u=±w and simultaneously z=±v. The current formula divides by one of the zero factors; these components require separate charts and are not claimed to be covered.`,
      ),
      exceptionalConditions: [
        String.raw`\operatorname{Exc}(\Phi_S)\subseteq\{${left}=${right}\}=\{u^2=w^2\}`,
      ],
      conclusion: choose(
        locale,
        `Полнота доказана ровно на ветви ${left}≠${right}; глобальная полнота до добавления нулевых карт не заявляется.`,
        `Completeness is proved exactly on the branch ${left}≠${right}; global completeness is not claimed until the zero charts are added.`,
      ),
    };
  }

  if (GAUSSIAN_RED_YELLOW_IDS.has(id)) {
    return completeCoverage(
      locale,
      choose(
        locale,
        "Красная AP-тройка обращается полной параметризацией. Оставшаяся пара имеет ту же ненулевую сумму квадратов, поэтому между двумя её рациональными представлениями существует рациональный гауссов поворот. Тройка P²+Q²=N² параметризует все такие повороты. Если эта норма равна нулю, обе квадрики вынуждают нулевой вектор.",
        "Invert the red arithmetic-progression triple by its complete parametrization. The remaining pair has the same nonzero sum of squares, so a rational Gaussian rotation relates its two rational representations. The triple P²+Q²=N² parametrizes every such rotation. If that norm is zero, the two quadrics force the zero vector.",
      ),
    );
  }

  if (id === "befgj") {
    return {
      status: "conditional",
      guaranteedSubset: choose(
        locale,
        "Все рациональные решения, для которых хотя бы одна из клеток E,J ненулевая, а также нулевое решение. Иными словами, покрывается всё семейство, кроме явно указанной ниже ненулевой прямой.",
        "Every rational solution for which at least one of E and J is nonzero, together with the zero solution. Equivalently, the whole family is covered except for the explicit nonzero line below.",
      ),
      conditions: [
        String.raw`(E,J)\ne(0,0)\quad\text{or}\quad(B,E,F,G,J)=(0,0,0,0,0)`,
      ],
      inverseArgument: choose(
        locale,
        "После полного обращения красной коники выбираем знаки корней e,j так, чтобы e−j≠0. Для целевой точки можно взять общий масштаб L=2(e−j), затем c=e−j и d, определённый равенством Kd²=L(e+j)/2. Равенство (e−j)(e+j)=f²−g² делает d рациональным и возвращает все пять корней с общим множителем L.",
        "After completely inverting the red conic, choose the signs of e and j so that e−j≠0. For the target point take the common scale L=2(e−j), then c=e−j and define d by Kd²=L(e+j)/2. The identity (e−j)(e+j)=f²−g² makes d rational and recovers all five roots with the common factor L.",
      ),
      exceptionalLocus: choose(
        locale,
        "Единственная непокрытая компонента текущей карты: E=J=0 и B=F=G≠0. На ней обе связи выполняются, но формулы e₀=Kd²+c² и j₀=Kd²−c² вынуждают c=0, затем λ=2cd=0, поэтому ненулевую постоянную красную тройку получить нельзя.",
        "The only component missed by the current chart is E=J=0 and B=F=G≠0. Both relations hold there, but e₀=Kd²+c² and j₀=Kd²−c² force c=0 and then λ=2cd=0, so a nonzero constant red triple cannot be produced.",
      ),
      exceptionalConditions: [
        String.raw`\operatorname{Exc}(\Phi_{BEFGJ})=\{E=J=0,\ B=F=G\ne0\}`,
      ],
      conclusion: choose(
        locale,
        "Полнота доказана на дополнении к одной ненулевой рациональной прямой и в нулевой точке; сама прямая этой формулой не покрывается.",
        "Completeness is proved off one nonzero rational line and at the zero point; the line itself is not covered by this formula.",
      ),
    };
  }

  if (RED_BLUE_IDS.has(id)) {
    return completeCoverage(
      locale,
      choose(
        locale,
        "Красная коника обращается полностью. Два представления одной формы X²−2Y² отличаются рациональным элементом нормы-квадрата в Q(√2); коника P²−2Q²=M² параметризует все такие элементы. Нулевая норма над Q не создаёт отдельной ветви, поскольку 2 не является рациональным квадратом.",
        "Invert the red conic completely. Two representations of the same form X²−2Y² differ by a rational element of square norm in Q(√2), and the conic P²−2Q²=M² parametrizes every such element. Zero norm creates no separate rational branch because 2 is not a rational square.",
      ),
    );
  }

  if (id in YELLOW_BLUE_DETERMINANTS) {
    const determinant = YELLOW_BLUE_DETERMINANTS[id];
    return completeCoverage(
      locale,
      choose(
        locale,
        `Сначала по жёлтой паре восстанавливается рациональный поворот P²+Q²=N². После этого общие корни дают линейную систему для U,V,M. Указанный минор ${determinant} ненулевой у каждой ненулевой рациональной точки: в ABCDE остаётся сумма 3P²+Q², а в двух других масках равенство Q²=3P² над Q возможно только при P=Q=0. Поэтому система обращается, а U²+2V²=M² затем полностью параметризуется второй парой параметров.`,
        `First recover the rational rotation P²+Q²=N² from the yellow pair. The shared roots then give a linear system for U,V,M. Its displayed minor ${determinant} is nonzero at every nonzero rational point: for ABCDE the remaining factor is 3P²+Q², while in the other two masks Q²=3P² over Q forces P=Q=0. Thus the system is invertible, and U²+2V²=M² is then completely parametrized by the second parameter pair.`,
      ),
      [
        String.raw`P^2+Q^2=N^2,\qquad ${determinant}\ne0`,
        String.raw`U^2+2V^2=M^2`,
      ],
    );
  }

  if (id === "abcdf") {
    return completeCoverage(
      locale,
      choose(
        locale,
        "Из двух голубых равенств восстанавливаются два рациональных поворота нормы X²+2Y². Матрица совместимости имеет ненулевой минор Δ=M₁(M₁²−6V₁²). Его зануление у ненулевой рациональной нормовой тройки потребовало бы M₁/V₁=√6; следовательно, ранг равен трём и вектор миноров возвращает единственную проективную линию совместимых корней.",
        "Recover two rational rotations of the norm X²+2Y² from the two blue equalities. The compatibility matrix has the nonzero minor Δ=M₁(M₁²−6V₁²). Vanishing at a nonzero rational norm triple would require M₁/V₁=√6; hence the rank is three and the vector of minors recovers the unique projective line of compatible roots.",
      ),
      [
        String.raw`U_i^2+2V_i^2=M_i^2\quad(i=1,2)`,
        String.raw`\Delta=M_1(M_1^2-6V_1^2)\ne0`,
      ],
    );
  }

  if (id === "abcdg") {
    return {
      status: "conditional",
      guaranteedSubset: choose(
        locale,
        "Все рациональные решения, для которых после выбора знаков корней жёлтая матрица ранга один допускает факторизацию ниже с рациональным квадратом 2s²−r²=u², а также нулевое решение. Это точный полный образ доказанной двухступенчатой карты, а не только произвольно выбранная невырожденная часть.",
        "Every rational solution for which, after choosing root signs, the rank-one yellow matrix admits the factorization below with 2s²−r²=u² a rational square, together with the zero solution. This is the exact full image of the proved two-stage chart, not merely an arbitrarily chosen nondegenerate portion.",
      ),
      conditions: [
        String.raw`\begin{pmatrix}b+d&c+g\\c-g&d-b\end{pmatrix}=2\begin{pmatrix}rP&rQ\\sP&sQ\end{pmatrix}`,
        String.raw`2s^2-r^2=u^2\in\mathbb Q^2,\qquad K=2r^2-s^2`,
        String.raw`a^2=u^2P^2+KQ^2`,
      ],
      inverseArgument: choose(
        locale,
        "Жёлтая квадрика равносильна нулю определителя показанной матрицы, поэтому всякая ненулевая жёлтая точка имеет рациональную факторизацию ранга один. Если её квадратный класс 2s²−r² тривиален, берём рациональный u. Коричневая квадрика тогда становится коникой a²=u²P²+KQ², и формулы P=Kμ²−ν², Q=2uμν, a=u(Kμ²+ν²) дают все её рациональные точки. Для ненулевой точки u и K автоматически ненулевые, иначе возникло бы рациональное √2.",
        "The yellow quadric is equivalent to vanishing of the displayed determinant, so every nonzero yellow point has a rational rank-one factorization. If the square class of 2s²−r² is trivial, choose rational u. The brown quadric then becomes the conic a²=u²P²+KQ², and P=Kμ²−ν², Q=2uμν, a=u(Kμ²+ν²) gives all of its rational points. For a nonzero point both u and K are automatically nonzero, or else a rational √2 would result.",
      ),
      exceptionalLocus: choose(
        locale,
        "Вне доказанного образа остаются те рациональные решения, для которых при всех допустимых выборах знаков квадратный класс 2s²−r² нетривиален. Это арифметическое, а не ранговое исключение. Не доказано ни отсутствие таких точек, ни их покрытие текущей формулой.",
        "Outside the proved image are rational solutions for which every admissible choice of root signs leaves the square class of 2s²−r² nontrivial. This is an arithmetic rather than a rank exception. Neither the absence of such points nor their coverage by the current formula has been proved.",
      ),
      exceptionalConditions: [
        String.raw`\operatorname{Exc}(\Phi_{ABCDG})\subseteq\{[2s^2-r^2]\ne1\text{ in }\mathbb Q^\times/(\mathbb Q^\times)^2\}`,
      ],
      conclusion: choose(
        locale,
        "Полнота доказана для всего подмножества с тривиальным указанным квадратным классом; глобальная полнота ABCDG остаётся отдельной задачей.",
        "Completeness is proved for the entire subset with the indicated trivial square class; global completeness of ABCDG remains a separate problem.",
      ),
    };
  }

  throw new Error(`No coverage theorem for 5/9 family ${id}`);
}

const unrestrictedEn =
  "The parameters a, b, c, and d are arbitrary integers. Every auxiliary root introduced below is therefore integral.";
const gcdRestrictedEn =
  "The parameters a, b, c, and d are integers. After the definitions below, the exact condition g₁g₂ ≠ 0 is required; then p and q are defined integers. This formula makes no claim about the zero branches of that division.";
const redRedOneDerivationEn =
  "Expanding (−u²+2uv+v²)²+(u²+2uv−v²)²=2(u²+v²)², first for (a,b) and then for (c,d), gives the two required arithmetic progressions of squares with a common middle root.";
const redRedTwoDerivationEn =
  "Apply the same arithmetic-progression identity to (d,c) and (b,a). One endpoint root in both progressions is u₀=k₁k₂, so their square values glue into a single five-cell mask.";
const redRedThreeDerivationEn =
  "Both triples come from the complete parametrization of three squares in arithmetic progression; the shared root r₊=s₀ glues them into the ABDEJ mask.";
const redYellowOneDerivationEn =
  "The red identity gives u²+w²=2σ². The Gaussian identity (pg₁+qg₂)²+(pg₂−qg₁)²=(pg₁−qg₂)²+(pg₂+qg₁)² simultaneously gives u²+v²=w²+z². These are precisely the compatible red and yellow relations.";
const redYellowTwoDerivationEn =
  "The red parametrization gives τ²+w²=2u². The same two-square composition identity gives u²+v²=w²+z². The gcds only distribute factors integrally; once they are defined, all five roots are integers.";
const redRedParameterDerivationEn =
  "Start with two copies of the red conic r²+t²=2s². Each rational root triple comes from the standard two-parameter chart. To make the triples share one cell, multiply the first triple by the distinguished root of the second and the second by the distinguished root of the first; these cross-multipliers are k₁ and k₂. The common root then agrees identically, and permuting the other four roots gives the declared mask.";
const gcdRedYellowParameterDerivationEn =
  "First parametrize the red quadric by ρ, σ, τ. After rearrangement, the yellow quadric is z²−v²=u²−w²=(u−w)(u+w). For the displayed red roots, the factors on the right are, up to powers of 2, products of 2αβ and α²−β². Distribute them among p, q, g₁, g₂ using gcds and set v=pg₂−qg₁, z=pg₂+qg₁. Then z²−v²=4pqg₁g₂ exactly matches u²−w². Thus the formulas are derived from the two quadrics rather than merely verified after the fact.";
const gaussianRedYellowParameterDerivationEn =
  "First parametrize the red quadric by r, s, t. The yellow quadric then asks for preservation of the sum of squares of one pair. Up to scale, every rational point of the corresponding circle comes from P=d²−c², Q=2cd, N=c²+d², including the second projection point. Multiplying the pair by ((P,−Q),(Q,P)) gives the displayed roots, while P²+Q²=N² enforces compatibility with the chosen red triple.";
const redBlueParameterDerivationEn =
  "The red quadric gives r, s, t. The remaining blue quadric is an equality of values of X²−2Y². Its rational conic is parametrized by P=c²+2d², Q=2cd, M=c²−2d²; multiplication in Q(√2) then gives the linear transformation T(P,Q). Solving the two cell quadrics for the remaining roots gives exactly the displayed components of T, and the factor M attaches them to the red triple.";
const yellowBlueParameterDerivationEn =
  "Parametrize the two norms separately: P²+Q²=N² and U²+2V²=M². After substitution, the two cell quadrics become a homogeneous linear system in the bilinear products PU, PV, QU, QV, NM, and the other displayed products. The five roots are compatible maximal minors of that system; direct expansion below shows that this chart has no hidden divisions or conditions.";
const blueBlueParameterDerivationEn =
  "Reduce the two blue quadrics to two copies of Uᵢ²+2Vᵢ²=Mᵢ². Eliminating the shared cell roots gives a compatibility matrix of rank four; the five displayed expressions are its maximal minors. The common factor M₂ clears the only denominator, and the two norm identities reduce both original residuals to zero.";
const yellowBrownParameterDerivationEn =
  "An auxiliary red conic introduces r, s, u. After substitution into the brown quadric, the coefficient of the second pair becomes K=2r²−s². The pair P=Kc²−d², Q=2ucd parametrizes the resulting weighted conic; two Gaussian rotations then give β, γ, δ, η. The displayed chain of equalities solves both quadrics and reconstructs E without division.";

interface EnglishProofCopy {
  assumptions: string;
  identityDerivation: string;
  parameterDerivation: string;
}

function englishProofCopy(
  assumptions: string,
  identityDerivation: string,
  parameterDerivation: string,
): EnglishProofCopy {
  return {
    assumptions,
    identityDerivation,
    parameterDerivation,
  };
}

const FIVE_PROOF_COPY_EN: Readonly<Record<string, EnglishProofCopy>> = {
  acegj: englishProofCopy(unrestrictedEn, redRedOneDerivationEn, redRedParameterDerivationEn),
  bdefh: englishProofCopy(unrestrictedEn, redRedOneDerivationEn, redRedParameterDerivationEn),
  abehj: englishProofCopy(unrestrictedEn, redRedOneDerivationEn, redRedParameterDerivationEn),
  bdefj: englishProofCopy(unrestrictedEn, redRedTwoDerivationEn, redRedParameterDerivationEn),
  bdfgj: englishProofCopy(unrestrictedEn, redRedTwoDerivationEn, redRedParameterDerivationEn),
  abdej: englishProofCopy(unrestrictedEn, redRedThreeDerivationEn, redRedParameterDerivationEn),
  bdfhj: englishProofCopy(gcdRestrictedEn, redYellowOneDerivationEn, gcdRedYellowParameterDerivationEn),
  abdfj: englishProofCopy(gcdRestrictedEn, redYellowTwoDerivationEn, gcdRedYellowParameterDerivationEn),
  acehj: englishProofCopy(gcdRestrictedEn, redYellowTwoDerivationEn, gcdRedYellowParameterDerivationEn),
  acdeg: englishProofCopy(
    unrestrictedEn,
    "The red relation follows from r²+t²=2s². For the yellow relation, expand the two sums of squares: the mixed terms cancel, and P²+Q² is replaced by N².",
    gaussianRedYellowParameterDerivationEn,
  ),
  abceh: englishProofCopy(
    unrestrictedEn,
    "The Gaussian rotation of (s,t) preserves its sum of squares up to the factor N². The red relation for B,E,H is the original arithmetic-progression triple multiplied by N².",
    gaussianRedYellowParameterDerivationEn,
  ),
  acdef: englishProofCopy(gcdRestrictedEn, redYellowTwoDerivationEn, gcdRedYellowParameterDerivationEn),
  abefj: englishProofCopy(gcdRestrictedEn, redYellowOneDerivationEn, gcdRedYellowParameterDerivationEn),
  abfgj: englishProofCopy(gcdRestrictedEn, redYellowOneDerivationEn, gcdRedYellowParameterDerivationEn),
  befgj: englishProofCopy(
    "The parameters a, b, c, and d are arbitrary integers. The theorem guarantees that B, E, F, G, and J are squares, but allows additional cells to become squares as well.",
    "The red quadric is parametrized by r, s, t. For the second quadric, use a difference of squares: choose (e₀−j₀)(e₀+j₀)=λ²(t²−s²). This is the rational parametrization of the compatibility hyperbola after denominators are cleared.",
    "The inverse algorithm first parametrizes B+F=2G. Next, at the root level, E−J=F−G becomes (e₀−j₀)(e₀+j₀)=(f₀−g₀)(f₀+g₀). If at least one of E and J is nonzero, choose root signs with e₀−j₀≠0; after a common rescaling, the two factors give rational c and d. The branch E=J=0 is handled separately in the coverage section.",
  ),
  abcdh: englishProofCopy(
    unrestrictedEn,
    "The red relation is the arithmetic-progression triple scaled by M². The blue relation is preservation of X²−2Y² by T on the pair (t,r).",
    redBlueParameterDerivationEn,
  ),
  abcdj: englishProofCopy(
    unrestrictedEn,
    "The red relation is the scaled triple (r,s,t). The blue relation follows by applying T to (s,t).",
    redBlueParameterDerivationEn,
  ),
  abdef: englishProofCopy(
    unrestrictedEn,
    "The red relation follows from the arithmetic-progression identity. In the blue relation, the mixed terms in B+2A cancel; then use M²+2Q²=P², equivalently P²−2Q²=M².",
    redBlueParameterDerivationEn,
  ),
  abcgj: englishProofCopy(unrestrictedEn, "Substitute the displayed polynomial roots into both quadrics. Mixed terms cancel in pairs; the remaining terms vanish by P²+Q²=N² and U²+2V²=M². The root formulas contain no division.", yellowBlueParameterDerivationEn),
  abcgh: englishProofCopy(unrestrictedEn, "Substitute the displayed polynomial roots into both quadrics. Mixed terms cancel in pairs; the remaining terms vanish by P²+Q²=N² and U²+2V²=M². The root formulas contain no division.", yellowBlueParameterDerivationEn),
  abcde: englishProofCopy(unrestrictedEn, "Substitute the displayed polynomial roots into both quadrics. Mixed terms cancel in pairs; the remaining terms vanish by P²+Q²=N² and U²+2V²=M². The root formulas contain no division.", yellowBlueParameterDerivationEn),
  abcdf: englishProofCopy(
    unrestrictedEn,
    "Substitution of these five minors into the two blue quadrics leaves only multiples of U₁²+2V₁²−M₁² and U₂²+2V₂²−M₂²; both are zero. Hence both compatible norm relations hold.",
    blueBlueParameterDerivationEn,
  ),
  abcdg: englishProofCopy(
    unrestrictedEn,
    "The yellow relation comes from two Gaussian rotations. For the brown relation, the quadric residual is reduced step by step to α² as displayed below. The final formula also proves that the chosen E reconstructs C and G without division.",
    yellowBrownParameterDerivationEn,
  ),
};

export function familyProofById(
  id: string,
  locale: Locale = "ru",
): FamilyProofText {
  const result = FAMILY_PROOFS[id];
  if (!result) throw new Error(`No exhaustive proof text for family ${id}`);
  const coverage = fiveCoverage(id, locale);
  const localized = {
    ...result,
    parameterDerivation:
      result.parameterDerivation ?? FIVE_PARAMETER_DERIVATIONS[id],
    coverage,
    coverageText: coverage.conclusion,
  };
  if (locale === "ru") return localized;
  const english = FIVE_PROOF_COPY_EN[id];
  if (!english) throw new Error(`No English proof text for family ${id}`);
  return {
    ...localized,
    ...english,
    coverage,
    coverageText: coverage.conclusion,
  };
}

export function familyProof(
  family: FamilyDefinition,
  locale: Locale = "ru",
): FamilyProofText {
  return family.level === 4
    ? fourFamilyProof(family, locale)
    : familyProofById(family.id, locale);
}
