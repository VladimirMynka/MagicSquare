import type {
  FamilyDefinition,
  ProofColor,
} from "./families";
import type { Locale } from "../i18n";

export type ParameterTone = ProofColor | "neutral";

export interface ParameterRole {
  indices: readonly number[];
  tone: ParameterTone;
  title: string;
  description: string;
  swapEffect?: string;
}

export interface ParameterExchange {
  effect: string;
}

export interface FamilyParameterGuide {
  roles: readonly ParameterRole[];
  symbols?: readonly [string, string, string, string];
  exchange?: ParameterExchange;
}

type Localized = readonly [ru: string, en: string];

function localized(locale: Locale, value: Localized): string {
  return locale === "ru" ? value[0] : value[1];
}

function role(
  locale: Locale,
  indices: readonly number[],
  tone: ParameterTone,
  title: Localized,
  description: Localized,
  swapEffect?: Localized,
): ParameterRole {
  return {
    indices,
    tone,
    title: localized(locale, title),
    description: localized(locale, description),
    swapEffect: swapEffect ? localized(locale, swapEffect) : undefined,
  };
}

const GAUSSIAN_RED_YELLOW = new Set(["acdeg", "abceh"]);

function fiveParameterGuide(
  family: FamilyDefinition,
  locale: Locale,
): FamilyParameterGuide {
  if (family.group === "red-red") {
    const progressionEffect: Localized = [
      "Обращает крайние корни этой арифметической прогрессии. Если один из них одновременно служит множителем склейки, меняется и общий масштаб; результат тогда остаётся в семействе, но не обязан быть только отражением исходного квадрата.",
      "Reverses the endpoint roots of this arithmetic progression. If an endpoint is also used as a gluing factor, the common scale changes as well; the result stays in the family but need not be merely a reflection of the original square.",
    ];
    return {
      roles: [
        role(
          locale,
          [0, 1],
          "red-light",
          ["a, b · первая красная тройка", "a, b · first red triple"],
          [
            "Однородные координаты первой тройки квадратов в арифметической прогрессии и её вклада в общий множитель склейки.",
            "Homogeneous coordinates of the first three-square arithmetic progression and its contribution to the common gluing factor.",
          ],
          progressionEffect,
        ),
        role(
          locale,
          [2, 3],
          "red-dark",
          ["c, d · вторая красная тройка", "c, d · second red triple"],
          [
            "Однородные координаты второй арифметической прогрессии; другой оттенок отделяет равноправные красные связи.",
            "Homogeneous coordinates of the second arithmetic progression; the second shade separates two equally ranked red relations.",
          ],
          progressionEffect,
        ),
      ],
      exchange: {
        effect: localized(locale, [
          "Меняет две красные конструкции ролями. Результат остаётся в том же параметрическом семействе; эквивалентность исходному квадрату поворотом или отражением здесь отдельно не утверждается.",
          "Exchanges the roles of the two red constructions. The result remains in the same parametric family; equivalence to the original square by a rotation or reflection is not asserted here.",
        ]),
      },
    };
  }

  if (family.group === "red-yellow") {
    const gaussian = GAUSSIAN_RED_YELLOW.has(family.id);
    return {
      roles: [
        role(
          locale,
          [0, 1],
          "red-light",
          ["a, b · красная тройка", "a, b · red triple"],
          [
            "Параметризуют тройку квадратов в арифметической прогрессии, которая служит каркасом семейства.",
            "Parametrize the three-square arithmetic progression used as the framework of the family.",
          ],
          [
            "Меняет ориентацию красной тройки. В формулах со склейкой через выделенный корень может одновременно измениться масштаб второй связи.",
            "Reverses the red triple. In formulas glued through a distinguished root, the scale of the second relation may change as well.",
          ],
        ),
        role(
          locale,
          [2, 3],
          "yellow",
          [
            gaussian
              ? "c, d · гауссов поворот"
              : "c, d · жёлтая склейка",
            gaussian
              ? "c, d · Gaussian rotation"
              : "c, d · yellow gluing",
          ],
          gaussian
            ? [
                "Задают P=d²−c², Q=2cd, N=c²+d² и тем самым рациональный поворот, сохраняющий сумму двух квадратов.",
                "Define P=d²−c², Q=2cd, and N=c²+d², hence a rational rotation preserving a sum of two squares.",
              ]
            : [
                "Управляют разнесением множителей и согласованием двух представлений одной суммы квадратов.",
                "Control the allocation of factors and the matching of two representations of one sum of squares.",
              ],
          gaussian
            ? [
                "Заменяет P на −P, сохраняя Q и N: это отражение гауссова направления.",
                "Replaces P by −P while preserving Q and N: a reflection of the Gaussian direction.",
              ]
            : [
                "Перераспределяет множители жёлтой склейки. Обычно получается другой квадрат того же семейства, а не геометрическая симметрия.",
                "Redistributes the factors in the yellow gluing. This usually gives another square in the same family rather than a geometric symmetry.",
              ],
        ),
      ],
      exchange: {
        effect: localized(locale, [
          "Красная и жёлтая пары имеют разные роли. Их обмен допустим как подстановка параметров, но не является заявленной симметрией конструкции.",
          "The red and yellow pairs have different roles. Exchanging them is a valid parameter substitution, but is not a claimed symmetry of the construction.",
        ]),
      },
    };
  }

  if (family.group === "red-blue") {
    return {
      roles: [
        role(
          locale,
          [0, 1],
          "red-light",
          ["a, b · красная тройка", "a, b · red triple"],
          [
            "Задают корни r,s,t красной арифметической прогрессии.",
            "Define the roots r, s, and t of the red arithmetic progression.",
          ],
          [
            "Обращает крайние корни r и t и тем самым меняет ориентацию красной прогрессии.",
            "Exchanges the endpoint roots r and t, reversing the red progression.",
          ],
        ),
        role(
          locale,
          [2, 3],
          "blue-light",
          ["c, d · голубой множитель", "c, d · blue multiplier"],
          [
            "Задают P=c²+2d², Q=2cd, M=c²−2d² — множитель нормы в Q(√2), согласующий голубую связь с красной.",
            "Define P=c²+2d², Q=2cd, and M=c²−2d², a norm multiplier in Q(√2) matching the blue relation to the red one.",
          ],
          [
            "Перестановка c и d не является сопряжением в Q(√2); она обычно переводит в другую точку того же семейства.",
            "Swapping c and d is not conjugation in Q(√2); it generally moves to another point of the same family.",
          ],
        ),
      ],
      exchange: {
        effect: localized(locale, [
          "Пары отвечают за разные нормы, поэтому их обмен не имеет отдельного симметрийного смысла и лишь пересчитывает семейство с переставленными аргументами.",
          "The pairs belong to different norms, so exchanging them has no separate symmetry meaning; it only recomputes the family with permuted arguments.",
        ]),
      },
    };
  }

  if (family.group === "yellow-blue") {
    return {
      roles: [
        role(
          locale,
          [0, 1],
          "yellow",
          ["a, b · гауссова норма", "a, b · Gaussian norm"],
          [
            "Задают P=a²−b², Q=2ab, N=a²+b² — рациональное направление на окружности P²+Q²=N².",
            "Define P=a²−b², Q=2ab, and N=a²+b², a rational direction on P²+Q²=N².",
          ],
          [
            "Заменяет P на −P при неизменных Q и N: отражает гауссово направление.",
            "Replaces P by −P while leaving Q and N fixed, reflecting the Gaussian direction.",
          ],
        ),
        role(
          locale,
          [2, 3],
          "blue-light",
          ["c, d · норма Q(√2)", "c, d · Q(√2) norm"],
          [
            "Задают U=c²−2d², V=2cd, M=c²+2d² и второе направление на норменной конике.",
            "Define U=c²−2d², V=2cd, and M=c²+2d², the second direction on a norm conic.",
          ],
          [
            "Перестановка c и d не совпадает с сопряжением d↦−d и обычно даёт другую точку семейства.",
            "Swapping c and d is not the conjugation d↦−d and generally gives another point of the family.",
          ],
        ),
      ],
      exchange: {
        effect: localized(locale, [
          "Обменивает параметры двух различных норм. Это допустимая подстановка, но не автоморфизм доказанной конструкции.",
          "Exchanges parameters of two different norms. This is a valid substitution, but not an automorphism of the proved construction.",
        ]),
      },
    };
  }

  if (family.group === "blue-blue") {
    const blueEffect: Localized = [
      "Перестановка координат не является сопряжением в Q(√2), поэтому обычно выбирает другое направление той же норменной коники.",
      "Swapping the coordinates is not conjugation in Q(√2), so it generally selects another direction on the same norm conic.",
    ];
    return {
      roles: [
        role(
          locale,
          [0, 1],
          "blue-light",
          ["a, b · первая голубая норма", "a, b · first blue norm"],
          [
            "Первая параметризация U₁²+2V₁²=M₁².",
            "The first parametrization of U₁²+2V₁²=M₁².",
          ],
          blueEffect,
        ),
        role(
          locale,
          [2, 3],
          "blue-dark",
          ["c, d · вторая голубая норма", "c, d · second blue norm"],
          [
            "Вторая параметризация U₂²+2V₂²=M₂²; оттенок только разделяет равноправные голубые связи.",
            "The second parametrization of U₂²+2V₂²=M₂²; the shade only separates two equally ranked blue relations.",
          ],
          blueEffect,
        ),
      ],
      exchange: {
        effect: localized(locale, [
          "Меняет две голубые нормы ролями. Итоговая формула использует их асимметрично, поэтому гарантируется новый член семейства, но не тот же квадрат.",
          "Exchanges the roles of the two blue norms. The final formula uses them asymmetrically, so this guarantees another family member, not the same square.",
        ]),
      },
    };
  }

  return {
    symbols: ["m", "n", "μ", "ν"],
    roles: [
      role(
        locale,
        [0, 1],
        "red-light",
        ["m, n · вспомогательная красная коника", "m, n · auxiliary red conic"],
        [
          "Задают вспомогательную тройку r,s,u, из которой вычисляется коэффициент K коричневой коники.",
          "Define the auxiliary triple r, s, and u from which the coefficient K of the brown conic is computed.",
        ],
        [
          "Обращает крайние корни вспомогательной тройки и пересчитывает коэффициент K.",
          "Reverses the endpoint roots of the auxiliary triple and recomputes K.",
        ],
      ),
      role(
        locale,
        [2, 3],
        "brown",
        ["μ, ν · коричневая коника", "μ, ν · brown conic"],
        [
          "Параметризуют P=Kμ²−ν² и Q=2uμν, то есть взвешенную конику заключительного шага.",
          "Parametrize P=Kμ²−ν² and Q=2uμν, the weighted conic in the final step.",
        ],
        [
          "Меняет карту взвешенной коники и обычно даёт другой квадрат семейства; простой геометрической симметрии не заявляется.",
          "Changes the chart on the weighted conic and usually gives another square in the family; no simple geometric symmetry is claimed.",
        ],
      ),
    ],
    exchange: {
      effect: localized(locale, [
        "Пары относятся к разным этапам вывода; их обмен является лишь новой подстановкой параметров.",
        "The pairs belong to different stages of the derivation; exchanging them is only a new parameter substitution.",
      ]),
    },
  };
}

const FOUR_TONES: Readonly<
  Record<FamilyDefinition["group"], ParameterTone>
> = {
  red: "red-light",
  yellow: "yellow",
  blue: "blue-light",
  green: "green",
  brown: "brown",
  "dark-gray": "gray-dark",
  "light-gray": "gray-light",
  "red-red": "red-light",
  "red-yellow": "yellow",
  "red-blue": "blue-light",
  "yellow-blue": "yellow",
  "blue-blue": "blue-light",
  "yellow-brown": "brown",
};

function fourParameterGuide(
  family: FamilyDefinition,
  locale: Locale,
): FamilyParameterGuide {
  if (family.parametrizationKind === "red-conic") {
    return {
      roles: [
        role(
          locale,
          [0, 1],
          "red-light",
          ["a, b · красная коника", "a, b · red conic"],
          [
            "Параметризуют три корня r,s,t, удовлетворяющие r²+t²=2s².",
            "Parametrize the three roots r, s, and t satisfying r²+t²=2s².",
          ],
          [
            "Точно меняет r и t местами, оставляя s неизменным.",
            "Exactly exchanges r and t while leaving s fixed.",
          ],
        ),
        role(
          locale,
          [2],
          "neutral",
          ["c · свободный корень", "c · free root"],
          [
            "Задаёт корень четвёртой клетки, не входящей в красную тройку.",
            "Defines the root of the fourth cell outside the red triple.",
          ],
        ),
        role(
          locale,
          [3],
          "neutral",
          ["d · общий масштаб", "d · common scale"],
          [
            "Однородно умножает все четыре корня и не меняет точку параметрической кривой.",
            "Homogeneously scales all four roots without changing the point on the parameter curve.",
          ],
        ),
      ],
    };
  }

  const tone = FOUR_TONES[family.group];
  return {
    roles: [
      role(
        locale,
        [0, 1, 2],
        tone,
        ["a, b, c · точка квадрики", "a, b, c · point on the quadric"],
        [
          "Однородные координаты рациональной точки единственной квадратичной связи этой маски.",
          "Homogeneous coordinates of a rational point on the unique quadratic relation for this mask.",
        ],
      ),
      role(
        locale,
        [3],
        "neutral",
        ["d · общий масштаб", "d · common scale"],
        [
          "Однородно умножает четыре корня; перестановки пар здесь не имеют самостоятельного смысла.",
          "Homogeneously scales all four roots; pair permutations have no separate meaning here.",
        ],
      ),
    ],
  };
}

export function familyParameterGuide(
  family: FamilyDefinition,
  locale: Locale,
): FamilyParameterGuide {
  return family.level === 4
    ? fourParameterGuide(family, locale)
    : fiveParameterGuide(family, locale);
}
