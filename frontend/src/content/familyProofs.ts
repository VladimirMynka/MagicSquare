export interface FamilyProofText {
  assumptions: string;
  definitions: readonly string[];
  squareValues: string;
  identityDerivation: string;
  identities: readonly string[];
  parityClearance?: boolean;
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

const unrestricted =
  "Параметры a, b, c, d — произвольные целые числа. Все вводимые ниже корни поэтому целочисленны.";
const gcdRestricted =
  "Параметры a, b, c, d целые; оба указанных НОД ненулевые. Следовательно, частные p и q целочисленны.";

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

export function familyProofById(id: string): FamilyProofText {
  const result = FAMILY_PROOFS[id];
  if (!result) throw new Error(`No exhaustive proof text for family ${id}`);
  return result;
}
