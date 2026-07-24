import { useMemo, useState } from "react";
import { useLocale } from "./i18n";
import {
  addCongruentPoints,
  congruentPointToPair,
  inspectTfPair,
  negateCongruentPoint,
  pairToCongruentPoint,
  parallelSixNineCoordinates,
  type CongruentPoint,
  type ParallelSixNineKind,
  type TfPair,
  type TfPairInfo,
} from "./lib/tfPairs";
import {
  createSnapshot,
  divideCoordinates,
  formatInteger,
  greatestCommonDivisor,
  greatestSquareDivisor,
  minimizeCoordinates,
  type Coordinates,
  type Position,
} from "./lib/magicSquare";
import { TheoryLink } from "./TheoryPages";

type PairInputs = [string, string, string, string];
type PairSigns = [1 | -1, 1 | -1];

interface BankPair {
  readonly id: string;
  readonly pair: TfPair;
  readonly source: string;
}

const F4_PRESET: PairInputs = ["7", "3", "7", "5"];
const F9_PRESET: PairInputs = ["9", "4", "65", "16"];

const DECLARED_POSITIONS: Readonly<Record<ParallelSixNineKind, readonly Position[]>> = {
  ACEFGH: ["A", "C", "E", "F", "G", "H"],
  ABDFHJ: ["A", "B", "D", "F", "H", "J"],
};

const FIRST_PROGRESSION: Readonly<Record<ParallelSixNineKind, readonly Position[]>> = {
  ACEFGH: ["A", "F", "H"],
  ABDFHJ: ["A", "F", "H"],
};

const SECOND_PROGRESSION: Readonly<Record<ParallelSixNineKind, readonly Position[]>> = {
  ACEFGH: ["C", "E", "G"],
  ABDFHJ: ["B", "D", "J"],
};

function parsePair(first: string, second: string): TfPair | null {
  try {
    if (!/^-?\d+$/.test(first) || !/^-?\d+$/.test(second)) return null;
    return { m: BigInt(first), n: BigInt(second) };
  } catch {
    return null;
  }
}

function pairId(pair: TfPair): string {
  return `${pair.m}:${pair.n}`;
}

function reducePreservingSquares(coordinates: Coordinates): Coordinates {
  const commonDivisor = greatestCommonDivisor(...coordinates);
  const squareDivisor = greatestSquareDivisor(commonDivisor) ?? 1n;
  return squareDivisor > 1n
    ? divideCoordinates(coordinates, squareDivisor)
    : coordinates;
}

function pairError(
  info: TfPairInfo | null,
  text: (ru: string, en: string) => string,
): string | null {
  if (!info) return text("Введите два целых числа", "Enter two integers");
  if (info.error === "degenerate") {
    return text("Вырожденная пара", "Degenerate pair");
  }
  if (info.error === "factorization-limit") {
    return text("Слишком крупно для браузера", "Too large for the browser");
  }
  return null;
}

export function SixNineLabPage() {
  const { text } = useLocale();
  const [kind, setKind] = useState<ParallelSixNineKind>("ABDFHJ");
  const [inputs, setInputs] = useState<PairInputs>(F4_PRESET);
  const [signs, setSigns] = useState<PairSigns>([1, 1]);
  const [sources, setSources] = useState<[string, string]>(["F4+", "F4+"]);
  const [bank, setBank] = useState<readonly BankPair[]>([]);
  const [primitive, setPrimitive] = useState(false);

  const leftPair = useMemo(
    () => parsePair(inputs[0], inputs[1]),
    [inputs[0], inputs[1]],
  );
  const rightPair = useMemo(
    () => parsePair(inputs[2], inputs[3]),
    [inputs[2], inputs[3]],
  );
  const leftInfo = useMemo(
    () => (leftPair ? inspectTfPair(leftPair) : null),
    [leftPair],
  );
  const rightInfo = useMemo(
    () => (rightPair ? inspectTfPair(rightPair) : null),
    [rightPair],
  );
  const sameTf =
    leftInfo?.tf !== null &&
    leftInfo?.tf !== undefined &&
    leftInfo.error === null &&
    rightInfo?.tf === leftInfo.tf &&
    rightInfo.error === null;

  const rawCoordinates = useMemo(
    () =>
      leftInfo && rightInfo
        ? parallelSixNineCoordinates(leftInfo, rightInfo, kind)
        : null,
    [leftInfo, rightInfo, kind],
  );
  const maskCoordinates = useMemo(
    () => (rawCoordinates ? reducePreservingSquares(rawCoordinates) : null),
    [rawCoordinates],
  );
  const coordinates = useMemo(
    () =>
      maskCoordinates && primitive
        ? minimizeCoordinates(maskCoordinates)
        : maskCoordinates,
    [maskCoordinates, primitive],
  );
  const snapshot = useMemo(
    () => (coordinates ? createSnapshot(coordinates) : null),
    [coordinates],
  );

  const declared = DECLARED_POSITIONS[kind];
  const maskConfirmed =
    snapshot !== null &&
    declared.every((position) => snapshot.squarePositions.includes(position));
  const commonStep =
    sameTf &&
    leftInfo?.tf !== null &&
    leftInfo?.squareMultiplier !== null &&
    rightInfo?.squareMultiplier !== null
      ? 4n *
        leftInfo.tf *
        leftInfo.squareMultiplier *
        leftInfo.squareMultiplier *
        rightInfo.squareMultiplier *
        rightInfo.squareMultiplier
      : null;

  function updateInput(index: number, value: string) {
    const next = [...inputs] as PairInputs;
    next[index] = value.replace("−", "-");
    setInputs(next);
    setSources((current) => {
      const nextSources = [...current] as [string, string];
      nextSources[index < 2 ? 0 : 1] = text("вручную", "manual");
      return nextSources;
    });
    setPrimitive(false);
  }

  function applyPreset(next: PairInputs, source: string) {
    setInputs(next);
    setSources([source, source]);
    setSigns([1, 1]);
    setPrimitive(false);
  }

  function swapWithin(slot: 0 | 1) {
    const offset = slot * 2;
    const next = [...inputs] as PairInputs;
    [next[offset], next[offset + 1]] = [next[offset + 1], next[offset]];
    setInputs(next);
    setPrimitive(false);
  }

  function swapPairs() {
    setInputs([inputs[2], inputs[3], inputs[0], inputs[1]]);
    setSources([sources[1], sources[0]]);
    setSigns([signs[1], signs[0]]);
    setPrimitive(false);
  }

  function toggleSign(slot: 0 | 1) {
    const next = [...signs] as PairSigns;
    next[slot] = next[slot] === 1 ? -1 : 1;
    setSigns(next);
  }

  function derive(
    operation: "double-left" | "sum" | "difference" | "double-right",
  ) {
    if (
      !sameTf ||
      !leftInfo ||
      !rightInfo ||
      leftInfo.tf === null ||
      leftInfo.tf <= 0n
    ) {
      return;
    }
    const leftPoint = pairToCongruentPoint(leftInfo, signs[0]);
    const rightPoint = pairToCongruentPoint(rightInfo, signs[1]);
    let point: CongruentPoint | null;
    let source: string;
    if (operation === "double-left") {
      point = addCongruentPoints(leftPoint, leftPoint, leftInfo.tf);
      source = "F7+ · 2P";
    } else if (operation === "double-right") {
      point = addCongruentPoints(rightPoint, rightPoint, leftInfo.tf);
      source = "F7+ · 2Q";
    } else if (operation === "difference") {
      point = addCongruentPoints(
        leftPoint,
        negateCongruentPoint(rightPoint),
        leftInfo.tf,
      );
      source = "F7+ · P−Q";
    } else {
      point = addCongruentPoints(leftPoint, rightPoint, leftInfo.tf);
      source = "F7+ · P+Q";
    }
    const pair = congruentPointToPair(point, leftInfo.tf);
    if (!pair || inspectTfPair(pair).error) return;
    const record: BankPair = {
      id: `${pairId(pair)}:${source}`,
      pair,
      source,
    };
    setBank((current) =>
      current.some((item) => pairId(item.pair) === pairId(pair))
        ? current
        : [...current, record],
    );
  }

  function loadBankPair(record: BankPair, slot: 0 | 1) {
    const next = [...inputs] as PairInputs;
    const offset = slot * 2;
    next[offset] = record.pair.m.toString();
    next[offset + 1] = record.pair.n.toString();
    setInputs(next);
    const nextSources = [...sources] as [string, string];
    nextSources[slot] = record.source;
    setSources(nextSources);
    setPrimitive(false);
  }

  const leftError = pairError(leftInfo, text);
  const rightError = pairError(rightInfo, text);

  return (
    <div className="page six-nine-lab-page">
      <div className="six-nine-heading">
        <div>
          <p className="eyebrow">
            {text("Математическая мастерская · β", "Mathematical workbench · β")}
          </p>
          <h1>{text("Конструктор 6/9", "6/9 constructor")}</h1>
        </div>
        <p>
          {text(
            "Выберите две пары одного tf, преобразуйте их через F7+ и сразу получите один из двух параллельных классов 6/9.",
            "Choose two pairs with the same tf, transform them through F7+, and immediately obtain one of the two parallel 6/9 classes.",
          )}
        </p>
      </div>

      <nav className="six-nine-level-nav" aria-label={text("Режим лаборатории", "Laboratory mode")}>
        <TheoryLink to="/lab">4/9 · 5/9</TheoryLink>
        <span>6/9 · β</span>
      </nav>

      <section className="six-nine-workspace">
        <header className="six-nine-source-bar">
          <div>
            <span>{text("Заполнить рабочие пары", "Fill the working pairs")}</span>
            <small>{text("два решения одного tf", "two solutions with the same tf")}</small>
          </div>
          <div>
            <button type="button" onClick={() => applyPreset(F4_PRESET, "F4+")}>
              F4+ <small>tf = 210</small>
            </button>
            <button type="button" onClick={() => applyPreset(F9_PRESET, "F9+")}>
              F9+ <small>tf = 65</small>
            </button>
          </div>
        </header>

        <div className="six-nine-pair-stage">
          <PairEditor
            label={text("Пара P", "Pair P")}
            values={[inputs[0], inputs[1]]}
            info={leftInfo}
            error={leftError}
            source={sources[0]}
            sign={signs[0]}
            pointLabel="P"
            onChange={(index, value) => updateInput(index, value)}
            onSwap={() => swapWithin(0)}
            onToggleSign={() => toggleSign(0)}
          />

          <div className={`tf-bridge ${sameTf ? "ok" : ""}`}>
            <span>{sameTf ? "=" : "≠"}</span>
            <strong>
              {sameTf && leftInfo?.tf !== null
                ? `tf = ${formatInteger(leftInfo.tf)}`
                : text("разные tf", "different tf")}
            </strong>
            <button type="button" onClick={swapPairs}>
              P ↔ Q
            </button>
          </div>

          <PairEditor
            label={text("Пара Q", "Pair Q")}
            values={[inputs[2], inputs[3]]}
            info={rightInfo}
            error={rightError}
            source={sources[1]}
            sign={signs[1]}
            pointLabel="Q"
            onChange={(index, value) => updateInput(index + 2, value)}
            onSwap={() => swapWithin(1)}
            onToggleSign={() => toggleSign(1)}
          />
        </div>

        <section className="f7-pair-tools">
          <header>
            <div>
              <span>F7+</span>
              <small>
                {text(
                  "эллиптические операции, результат снова является парой",
                  "elliptic operations whose result is another pair",
                )}
              </small>
            </div>
            <details>
              <summary>?</summary>
              <p>
                {text(
                  "Знаки ± выбирают один из двух подъёмов пары на кривую E_T. Координаты точки скрыты: F7+ переводит результат обратно в проективную пару.",
                  "The ± signs select one of the two lifts of a pair to E_T. Point coordinates stay hidden: F7+ converts the result back into a projective pair.",
                )}
              </p>
            </details>
          </header>
          <div>
            <button disabled={!sameTf || (leftInfo?.tf ?? -1n) <= 0n} type="button" onClick={() => derive("double-left")}>2P</button>
            <button disabled={!sameTf || (leftInfo?.tf ?? -1n) <= 0n} type="button" onClick={() => derive("sum")}>P + Q</button>
            <button disabled={!sameTf || (leftInfo?.tf ?? -1n) <= 0n} type="button" onClick={() => derive("difference")}>P − Q</button>
            <button disabled={!sameTf || (leftInfo?.tf ?? -1n) <= 0n} type="button" onClick={() => derive("double-right")}>2Q</button>
          </div>
        </section>

        <section className="pair-bank">
          <header>
            <span>{text("Другие пары того же tf", "Other pairs with the same tf")}</span>
            <small>
              {bank.length
                ? text("поставьте результат в P или Q", "place a result into P or Q")
                : text("получите первую пару кнопками F7+", "derive the first pair with F7+")}
            </small>
          </header>
          <div>
            {bank.map((record) => (
              <article key={record.id}>
                <strong>[{formatInteger(record.pair.m)}:{formatInteger(record.pair.n)}]</strong>
                <small>{record.source}</small>
                <span>
                  <button type="button" onClick={() => loadBankPair(record, 0)}>→ P</button>
                  <button type="button" onClick={() => loadBankPair(record, 1)}>→ Q</button>
                </span>
              </article>
            ))}
          </div>
        </section>

        <div className="six-nine-output-grid">
          <section className="six-nine-placement">
            <header>
              <div>
                <span>{text("Размещение в квадрате", "Placement in the square")}</span>
                <small>{text("две параллельные прогрессии", "two parallel progressions")}</small>
              </div>
              <details>
                <summary>?</summary>
                <p>
                  {text(
                    "Совпадение tf согласует шаги. Выбранная формула восстанавливает общие координаты E,x,y и тем самым выполняет оставшиеся условия размещения.",
                    "Equal tf values match the progression differences. The selected formula recovers the common coordinates E,x,y and thereby satisfies the remaining placement conditions.",
                  )}
                </p>
              </details>
            </header>
            <div className="six-nine-kind-tabs">
              <button
                className={kind === "ACEFGH" ? "active" : ""}
                type="button"
                onClick={() => {
                  setKind("ACEFGH");
                  setPrimitive(false);
                }}
              >
                I · ACEFGH <small>≃ ABEFGJ</small>
              </button>
              <button
                className={kind === "ABDFHJ" ? "active" : ""}
                type="button"
                onClick={() => {
                  setKind("ABDFHJ");
                  setPrimitive(false);
                }}
              >
                II · ABDFHJ
              </button>
            </div>
            <div className="progression-equations">
              <span>
                {FIRST_PROGRESSION[kind].join("—")}
                <small>Δ₁</small>
              </span>
              <b>=</b>
              <span>
                {SECOND_PROGRESSION[kind].join("—")}
                <small>Δ₂</small>
              </span>
            </div>
            <dl>
              <div>
                <dt>Δ</dt>
                <dd>{commonStep === null ? "—" : formatInteger(commonStep)}</dd>
              </div>
              <div>
                <dt>{text("статус", "status")}</dt>
                <dd>
                  {maskConfirmed
                    ? text("6/9 подтверждено", "6/9 confirmed")
                    : sameTf
                      ? text("маска нарушена", "mask violated")
                      : text("ожидается общий tf", "waiting for a common tf")}
                </dd>
              </div>
            </dl>
            <label className="six-nine-minimize">
              <input
                checked={primitive}
                disabled={!maskCoordinates}
                type="checkbox"
                onChange={(event) => setPrimitive(event.target.checked)}
              />
              <span>
                {text("Полная минимизация", "Full minimization")}
                <small>
                  {text(
                    "может снять квадратность маски",
                    "may remove squarehood from the pattern",
                  )}
                </small>
              </span>
            </label>
          </section>

          <section className="six-nine-square">
            <header>
              <div>
                <span>Magic3</span>
                <small>
                  {coordinates
                    ? `E=${formatInteger(coordinates[0])}, x=${formatInteger(coordinates[1])}, y=${formatInteger(coordinates[2])}`
                    : text("нет согласованного результата", "no compatible result")}
                </small>
              </div>
              <strong>{snapshot ? `${snapshot.squarePositions.length}/9` : "—"}</strong>
            </header>
            <div className="six-nine-result-grid">
              {snapshot
                ? snapshot.cells.map((cell) => {
                    const inFirst = FIRST_PROGRESSION[kind].includes(cell.position);
                    const inSecond = SECOND_PROGRESSION[kind].includes(cell.position);
                    return (
                      <div
                        className={`${cell.isSquare ? "is-square" : ""} ${inFirst ? "progression-one" : ""} ${inSecond ? "progression-two" : ""}`}
                        key={cell.position}
                      >
                        <span>{cell.position}</span>
                        <strong className={formatInteger(cell.value).length > 13 ? "small" : ""}>
                          {formatInteger(cell.value)}
                        </strong>
                      </div>
                    );
                  })
                : Array.from({ length: 9 }, (_, index) => (
                    <div className="empty" key={index}>—</div>
                  ))}
            </div>
            <footer>
              <span><i className="one" /> {FIRST_PROGRESSION[kind].join("—")}</span>
              <span><i className="two" /> {SECOND_PROGRESSION[kind].join("—")}</span>
              <TheoryLink to="/theory/fmn-tfmn">
                {text("Почему это работает", "Why this works")} →
              </TheoryLink>
            </footer>
          </section>
        </div>
      </section>
    </div>
  );
}

function PairEditor({
  label,
  values,
  info,
  error,
  source,
  sign,
  pointLabel,
  onChange,
  onSwap,
  onToggleSign,
}: {
  label: string;
  values: readonly [string, string];
  info: TfPairInfo | null;
  error: string | null;
  source: string;
  sign: 1 | -1;
  pointLabel: "P" | "Q";
  onChange: (index: number, value: string) => void;
  onSwap: () => void;
  onToggleSign: () => void;
}) {
  const { text } = useLocale();
  return (
    <section className={`tf-pair-editor ${error ? "has-error" : ""}`}>
      <header>
        <div>
          <span>{label}</span>
          <small>{source}</small>
        </div>
        <button
          type="button"
          title={text("Выбрать знак точки F7+", "Choose the F7+ point sign")}
          onClick={onToggleSign}
        >
          {sign > 0 ? `+${pointLabel}` : `−${pointLabel}`}
        </button>
      </header>
      <div className="tf-pair-inputs">
        <label>
          <span>m</span>
          <input
            inputMode="numeric"
            value={values[0]}
            onChange={(event) => onChange(0, event.target.value)}
          />
        </label>
        <button
          type="button"
          title={text("Поменять параметры местами", "Swap the parameters")}
          onClick={onSwap}
        >
          ↔
        </button>
        <label>
          <span>n</span>
          <input
            inputMode="numeric"
            value={values[1]}
            onChange={(event) => onChange(1, event.target.value)}
          />
        </label>
      </div>
      <dl>
        <div>
          <dt>f</dt>
          <dd>{info && !error ? formatInteger(info.f) : "—"}</dd>
        </div>
        <div>
          <dt>tf</dt>
          <dd>{info?.tf !== null && info?.tf !== undefined && !error ? formatInteger(info.tf) : "—"}</dd>
        </div>
      </dl>
      {error && <p>{error}</p>}
    </section>
  );
}
