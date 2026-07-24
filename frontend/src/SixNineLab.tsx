import { useEffect, useMemo, useState } from "react";
import {
  SquareWorkbench,
  type SquareCellTone,
} from "./components/SquareWorkbench";
import {
  FactorizationWarningDialog,
  useSquareFactorization,
} from "./components/SquareFactorization";
import { useLocale } from "./i18n";
import {
  addCongruentPoints,
  congruentPointToPair,
  f4PairsFromParameters,
  f4SeedCatalog,
  f9PairsFromMultiple,
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
  readonly tf: bigint;
}

const F4_PRESET: PairInputs = ["7", "3", "7", "5"];
const PAIR_STORE_KEY = "magic-squares-six-nine-pair-store";

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

function storedPairs(): readonly BankPair[] {
  if (typeof window === "undefined") return [];
  try {
    const records = JSON.parse(
      window.localStorage.getItem(PAIR_STORE_KEY) ?? "[]",
    ) as readonly {
      id: string;
      m: string;
      n: string;
      source: string;
      tf: string;
    }[];
    return records.map((record) => ({
      id: record.id,
      pair: { m: BigInt(record.m), n: BigInt(record.n) },
      source: record.source,
      tf: BigInt(record.tf),
    }));
  } catch {
    return [];
  }
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
  const [latestPair, setLatestPair] = useState<BankPair | null>(null);
  const [pairStore, setPairStore] = useState<readonly BankPair[]>(storedPairs);
  const [f4Parameters, setF4Parameters] = useState<
    readonly [string, string, string]
  >(["7", "3", "5"]);
  const [f9Multiple, setF9Multiple] = useState("2");
  const [generatorError, setGeneratorError] = useState("");
  const [primitive, setPrimitive] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      PAIR_STORE_KEY,
      JSON.stringify(
        pairStore.map((record) => ({
          id: record.id,
          m: record.pair.m.toString(),
          n: record.pair.n.toString(),
          source: record.source,
          tf: record.tf.toString(),
        })),
      ),
    );
  }, [pairStore]);

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
  const factorizationValues = useMemo(
    () => snapshot?.cells.map((cell) => cell.value) ?? [],
    [snapshot],
  );
  const squareFactorization = useSquareFactorization(factorizationValues);

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
  const matchingStore =
    leftInfo?.tf === null || leftInfo?.tf === undefined
      ? []
      : pairStore.filter((record) => record.tf === leftInfo.tf);
  const cellTones = useMemo(
    () =>
      Object.fromEntries([
        ...FIRST_PROGRESSION[kind].map(
          (position) => [position, "one"] as const,
        ),
        ...SECOND_PROGRESSION[kind].map(
          (position) => [position, "two"] as const,
        ),
      ]) as Partial<Record<Position, SquareCellTone>>,
    [kind],
  );

  function updateInput(index: number, value: string) {
    const next = [...inputs] as PairInputs;
    next[index] = value.replace("−", "-");
    setInputs(next);
    setSources((current) => {
      const nextSources = [...current] as [string, string];
      nextSources[index < 2 ? 0 : 1] = text("вручную", "manual");
      return nextSources;
    });
    setLatestPair(null);
    setPrimitive(false);
  }

  function applyPairInfos(
    pairInfos: readonly [TfPairInfo, TfPairInfo],
    source: string,
  ) {
    setInputs([
      pairInfos[0].pair.m.toString(),
      pairInfos[0].pair.n.toString(),
      pairInfos[1].pair.m.toString(),
      pairInfos[1].pair.n.toString(),
    ]);
    setSources([source, source]);
    setSigns([1, 1]);
    setLatestPair(null);
    setGeneratorError("");
    setPrimitive(false);
  }

  function applyF4() {
    if (!f4Parameters.every((value) => /^-?\d+$/.test(value))) {
      setGeneratorError(
        text("Параметры F4+ должны быть целыми", "F4+ parameters must be integers"),
      );
      return;
    }
    const pairInfos = f4PairsFromParameters(
      BigInt(f4Parameters[0]),
      BigInt(f4Parameters[1]),
      BigInt(f4Parameters[2]),
    );
    if (!pairInfos) {
      setGeneratorError(
        text(
          "Эти параметры F4+ не дают двух различных пар одного tf",
          "These F4+ parameters do not give two distinct pairs with the same tf",
        ),
      );
      return;
    }
    applyPairInfos(pairInfos, "F4+");
  }

  function randomizeF4() {
    const catalog = f4SeedCatalog();
    const seed = catalog[Math.floor(Math.random() * catalog.length)];
    if (!seed) return;
    const next = [
      seed.u.toString(),
      seed.v.toString(),
      seed.w.toString(),
    ] as const;
    setF4Parameters(next);
    const pairInfos = f4PairsFromParameters(seed.u, seed.v, seed.w);
    if (pairInfos) applyPairInfos(pairInfos, "F4+ · random");
  }

  function applyF9() {
    if (!/^-?\d+$/.test(f9Multiple)) {
      setGeneratorError(
        text("Номер точки F9+ должен быть целым", "The F9+ point number must be an integer"),
      );
      return;
    }
    const pairInfos = f9PairsFromMultiple(Number(f9Multiple));
    if (!pairInfos) {
      setGeneratorError(
        text(
          "Эта кратная точка слишком велика для браузерной факторизации",
          "This point multiple is too large for browser factorization",
        ),
      );
      return;
    }
    applyPairInfos(pairInfos, `F9+ · ${f9Multiple}G`);
  }

  function randomizeF9() {
    const multiple = 1 + Math.floor(Math.random() * 4);
    setF9Multiple(String(multiple));
    const pairInfos = f9PairsFromMultiple(multiple);
    if (pairInfos) applyPairInfos(pairInfos, `F9+ · ${multiple}G`);
  }

  function swapWithin(slot: 0 | 1) {
    const offset = slot * 2;
    const next = [...inputs] as PairInputs;
    [next[offset], next[offset + 1]] = [next[offset + 1], next[offset]];
    setInputs(next);
    setLatestPair(null);
    setPrimitive(false);
  }

  function swapPairs() {
    setInputs([inputs[2], inputs[3], inputs[0], inputs[1]]);
    setSources([sources[1], sources[0]]);
    setSigns([signs[1], signs[0]]);
    setLatestPair(null);
    setPrimitive(false);
  }

  function toggleSign(slot: 0 | 1) {
    const next = [...signs] as PairSigns;
    next[slot] = next[slot] === 1 ? -1 : 1;
    setSigns(next);
    setLatestPair(null);
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
      tf: leftInfo.tf,
    };
    setLatestPair(record);
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
    setLatestPair(null);
    setPrimitive(false);
  }

  function saveLatestPair() {
    if (!latestPair) return;
    setPairStore((current) =>
      current.some(
        (record) =>
          record.tf === latestPair.tf &&
          pairId(record.pair) === pairId(latestPair.pair),
      )
        ? current
        : [...current, latestPair],
    );
  }

  function removeStoredPair(record: BankPair) {
    setPairStore((current) =>
      current.filter((candidate) => candidate.id !== record.id),
    );
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
          <div className="six-nine-generators">
            <section className="six-nine-generator">
              <strong>F4+</strong>
              <div className="f4-generator-inputs">
                <span>[</span>
                {f4Parameters.map((value, index) => (
                  <label key={index}>
                    <span>{index === 0 ? "u" : index === 1 ? "v" : "w"}</span>
                    <input
                      inputMode="numeric"
                      value={value}
                      onChange={(event) => {
                        const next = [...f4Parameters] as [string, string, string];
                        next[index] = event.target.value;
                        setF4Parameters(next);
                      }}
                    />
                  </label>
                ))}
                <span>]</span>
              </div>
              <button type="button" onClick={applyF4}>
                → P,Q
              </button>
              <button
                type="button"
                title={text("Случайная точка F4+", "Random F4+ point")}
                onClick={randomizeF4}
              >
                ↻
              </button>
            </section>
            <section className="six-nine-generator">
              <strong>F9+</strong>
              <label className="f9-generator-input">
                <span>k</span>
                <input
                  inputMode="numeric"
                  value={f9Multiple}
                  onChange={(event) => setF9Multiple(event.target.value)}
                />
                <i>G</i>
              </label>
              <button type="button" onClick={applyF9}>
                → P,Q
              </button>
              <button
                type="button"
                title={text("Случайная кратная точка", "Random point multiple")}
                onClick={randomizeF9}
              >
                ↻
              </button>
            </section>
          </div>
        </header>
        {generatorError && (
          <p className="six-nine-generator-error" role="alert">
            {generatorError}
          </p>
        )}

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

        <section className="f7-latest-pair">
          <header>
            <span>{text("Последний результат F7+", "Latest F7+ result")}</span>
            <small>
              {latestPair
                ? latestPair.source
                : text("выберите операцию выше", "choose an operation above")}
            </small>
          </header>
          <div>
            {latestPair ? (
              <article>
                <strong>
                  [{formatInteger(latestPair.pair.m)}:
                  {formatInteger(latestPair.pair.n)}]
                </strong>
                <span>
                  <button type="button" onClick={() => loadBankPair(latestPair, 0)}>
                    → P
                  </button>
                  <button type="button" onClick={() => loadBankPair(latestPair, 1)}>
                    → Q
                  </button>
                  <button type="button" onClick={saveLatestPair}>
                    + {text("сохранить", "save")}
                  </button>
                </span>
              </article>
            ) : (
              <span className="f7-latest-empty">—</span>
            )}
          </div>
        </section>

        <section className={`pair-bank ${matchingStore.length ? "" : "empty"}`}>
          <header>
            <span>
              {text("Сохранённые пары", "Saved pairs")}
              {leftInfo?.tf !== null && leftInfo?.tf !== undefined
                ? ` · tf=${formatInteger(leftInfo.tf)}`
                : ""}
            </span>
            <small>
              {matchingStore.length
                ? text("поставьте пару в P или Q", "place a pair into P or Q")
                : text("сохранённых пар этого tf пока нет", "no saved pairs for this tf")}
            </small>
          </header>
          <div>
            {matchingStore.map((record) => (
              <article key={record.id}>
                <strong>
                  [{formatInteger(record.pair.m)}:
                  {formatInteger(record.pair.n)}]
                </strong>
                <small>{record.source}</small>
                <span>
                  <button type="button" onClick={() => loadBankPair(record, 0)}>
                    → P
                  </button>
                  <button type="button" onClick={() => loadBankPair(record, 1)}>
                    → Q
                  </button>
                  <button
                    type="button"
                    title={text("Удалить из стора", "Remove from store")}
                    onClick={() => removeStoredPair(record)}
                  >
                    ×
                  </button>
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

          <section className="six-nine-shared-result">
            {coordinates && snapshot ? (
              <SquareWorkbench
                coordinates={coordinates}
                snapshot={snapshot}
                declaredPositions={declared}
                maskLabel={kind}
                targetSquareCount={6}
                factorized={squareFactorization.factorized}
                factorizations={squareFactorization.factorizations}
                cellTones={cellTones}
              />
            ) : (
              <div className="six-nine-result-empty">
                {text(
                  "Для построения квадрата нужны две пары одного tf",
                  "Two pairs with the same tf are required to build a square",
                )}
              </div>
            )}
            {squareFactorization.factorized &&
              squareFactorization.running && (
                <div
                  className="factorization-progress six-nine-factorization-progress"
                  role="status"
                >
                  <span>
                    <i aria-hidden="true" />
                    {text(
                      "Факторизация выполняется в фоне",
                      "Factoring in the background",
                    )}
                  </span>
                  <button
                    className="button button-quiet"
                    type="button"
                    onClick={squareFactorization.cancel}
                  >
                    {text("Отменить", "Cancel")}
                  </button>
                </div>
              )}
            {squareFactorization.error && (
              <p className="six-nine-factorization-error" role="alert">
                {squareFactorization.error}
              </p>
            )}
            <footer className="six-nine-result-footer">
              <span><i className="one" /> {FIRST_PROGRESSION[kind].join("—")}</span>
              <span><i className="two" /> {SECOND_PROGRESSION[kind].join("—")}</span>
              <button
                className="six-nine-factorization-toggle"
                disabled={!snapshot}
                type="button"
                onClick={squareFactorization.toggle}
              >
                {squareFactorization.factorized
                  ? text("Показать числа", "Show values")
                  : text("Факторизовать", "Factor")}
              </button>
              <TheoryLink to="/theory/fmn-tfmn">
                {text("Почему это работает", "Why this works")} →
              </TheoryLink>
            </footer>
          </section>
        </div>
      </section>
      {squareFactorization.warning && (
        <FactorizationWarningDialog
          warning={squareFactorization.warning}
          onCancel={squareFactorization.cancel}
          onContinue={squareFactorization.continue}
        />
      )}
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
