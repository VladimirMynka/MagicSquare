import { useEffect, useRef, useState } from "react";
import { factorizationTrialDivisionWork } from "../lib/magicSquare";
import { useLocale } from "../i18n";

export interface FactorizationWarning {
  source: "estimate" | "elapsed";
  thresholdMs: 10_000 | 60_000;
  estimatedMs?: number;
}

type FactorizationWorkerMessage =
  | {
      type: "result";
      index: number;
      factorization: string;
    }
  | {
      type: "threshold";
      thresholdMs: 10_000 | 60_000;
    }
  | {
      type: "done";
      elapsedMs: number;
    };

export interface SquareFactorizationController {
  factorized: boolean;
  factorizations: readonly (string | undefined)[];
  running: boolean;
  warning: FactorizationWarning | null;
  error: string;
  toggle: () => void;
  cancel: () => void;
  continue: () => void;
}

const FACTORIZATION_STORAGE_KEY = "magic-squares-factorized";
const FACTORIZATION_BENCHMARK_STEPS = 20_000;
const TEN_SECONDS = 10_000;
const ONE_MINUTE = 60_000;

function estimateFactorizationMs(values: readonly bigint[]): number {
  const work = factorizationTrialDivisionWork(values);
  if (work === 0n) return 0;

  const probe =
    values.reduce((largest, value) => {
      const absolute = value < 0n ? -value : value;
      return absolute > largest ? absolute : largest;
    }, 0n) || 9_999_999_967n;
  let candidate = 3n;
  const startedAt = performance.now();
  for (let index = 0; index < FACTORIZATION_BENCHMARK_STEPS; index += 1) {
    void (probe % candidate);
    candidate += 2n;
  }
  const elapsedMs = Math.max(performance.now() - startedAt, 0.25);
  const attemptsPerMs = FACTORIZATION_BENCHMARK_STEPS / elapsedMs;
  if (work > BigInt(Number.MAX_SAFE_INTEGER)) return Number.POSITIVE_INFINITY;
  return Number(work) / attemptsPerMs;
}

export function useSquareFactorization(
  values: readonly bigint[],
): SquareFactorizationController {
  const { text } = useLocale();
  const [factorized, setFactorized] = useState(false);
  const [factorizations, setFactorizations] = useState<
    readonly (string | undefined)[]
  >([]);
  const [running, setRunning] = useState(false);
  const [warning, setWarning] = useState<FactorizationWarning | null>(null);
  const [error, setError] = useState("");
  const workerRef = useRef<Worker | null>(null);
  const pendingValuesRef = useRef<readonly bigint[]>([]);
  const valuesKey = values.map(String).join("|");

  function stop() {
    workerRef.current?.terminate();
    workerRef.current = null;
    setRunning(false);
    setWarning(null);
    setFactorizations([]);
  }

  function start(nextValues: readonly bigint[], approvedThroughMs: number) {
    workerRef.current?.terminate();
    const worker = new Worker(
      new URL("../workers/factorization.worker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;
    setFactorizations(
      Array.from({ length: nextValues.length }, () => undefined),
    );
    setRunning(true);
    setWarning(null);
    setError("");

    worker.onmessage = (
      event: MessageEvent<FactorizationWorkerMessage>,
    ) => {
      const message = event.data;
      if (message.type === "result") {
        setFactorizations((current) => {
          const next = [...current];
          next[message.index] = message.factorization;
          return next;
        });
        return;
      }
      if (message.type === "threshold") {
        setRunning(false);
        setWarning({
          source: "elapsed",
          thresholdMs: message.thresholdMs,
        });
        return;
      }
      setRunning(false);
      workerRef.current?.terminate();
      workerRef.current = null;
    };
    worker.onerror = () => {
      setRunning(false);
      workerRef.current?.terminate();
      workerRef.current = null;
      setError(
        text(
          "Не удалось выполнить факторизацию в фоновом потоке.",
          "Factorization could not be completed in the background worker.",
        ),
      );
    };
    worker.postMessage({
      type: "start",
      values: nextValues.map(String),
      approvedThroughMs,
    });
  }

  function prepare(nextValues: readonly bigint[]) {
    workerRef.current?.terminate();
    workerRef.current = null;
    pendingValuesRef.current = nextValues;
    setFactorizations(
      Array.from({ length: nextValues.length }, () => undefined),
    );
    setRunning(false);
    setWarning(null);
    setError("");

    const estimatedMs = estimateFactorizationMs(nextValues);
    if (estimatedMs > ONE_MINUTE) {
      setWarning({
        source: "estimate",
        thresholdMs: ONE_MINUTE,
        estimatedMs,
      });
      return;
    }
    if (estimatedMs > TEN_SECONDS) {
      setWarning({
        source: "estimate",
        thresholdMs: TEN_SECONDS,
        estimatedMs,
      });
      return;
    }
    start(nextValues, 0);
  }

  function continueFactorization() {
    if (!warning) return;
    const approvedThroughMs = warning.thresholdMs;
    if (warning.source === "estimate") {
      start(pendingValuesRef.current, approvedThroughMs);
      return;
    }
    workerRef.current?.postMessage({
      type: "continue",
      approvedThroughMs,
    });
    setWarning(null);
    setRunning(true);
  }

  function cancel() {
    window.localStorage.setItem(FACTORIZATION_STORAGE_KEY, "false");
    setFactorized(false);
    stop();
  }

  function toggle() {
    if (factorized) {
      cancel();
      return;
    }
    window.localStorage.setItem(FACTORIZATION_STORAGE_KEY, "true");
    setFactorized(true);
  }

  useEffect(() => {
    setFactorized(
      window.localStorage.getItem(FACTORIZATION_STORAGE_KEY) === "true",
    );
  }, []);

  useEffect(() => {
    if (!factorized) {
      stop();
      return;
    }
    prepare(values);
  }, [factorized, valuesKey]);

  useEffect(
    () => () => {
      workerRef.current?.terminate();
    },
    [],
  );

  return {
    factorized,
    factorizations,
    running,
    warning,
    error,
    toggle,
    cancel,
    continue: continueFactorization,
  };
}

export function FactorizationWarningDialog({
  warning,
  onCancel,
  onContinue,
}: {
  warning: FactorizationWarning;
  onCancel: () => void;
  onContinue: () => void;
}) {
  const { text } = useLocale();
  const minute = warning.thresholdMs === ONE_MINUTE;
  const estimatedSeconds =
    warning.estimatedMs !== undefined &&
    Number.isFinite(warning.estimatedMs)
      ? Math.max(1, Math.ceil(warning.estimatedMs / 1000))
      : null;
  return (
    <div className="factorization-warning-backdrop">
      <section
        className="factorization-warning-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="factorization-warning-title"
      >
        <span className="factorization-warning-mark" aria-hidden="true">
          !
        </span>
        <div>
          <p className="eyebrow">
            {text(
              "Предохранитель вычисления",
              "Computation safeguard",
            )}
          </p>
          <h2 id="factorization-warning-title">
            {warning.source === "estimate"
              ? minute
                ? text(
                    "Верхняя оценка превышает минуту",
                    "The upper estimate exceeds one minute",
                  )
                : text(
                    "Верхняя оценка превышает 10 секунд",
                    "The upper estimate exceeds 10 seconds",
                  )
              : minute
                ? text(
                    "Факторизация выполняется уже минуту",
                    "Factorization has been running for one minute",
                  )
                : text(
                    "Факторизация выполняется уже 10 секунд",
                    "Factorization has been running for 10 seconds",
                  )}
          </h2>
          <p>
            {warning.source === "estimate"
              ? text(
                  `Оценка построена по худшему случаю пробного деления${estimatedSeconds === null ? "" : `: около ${estimatedSeconds} с`}. Малый делитель может значительно ускорить расчёт.`,
                  `The estimate uses the worst case for trial division${estimatedSeconds === null ? "" : `: about ${estimatedSeconds} s`}. A small divisor can make the actual computation much faster.`,
                )
              : text(
                  "Расчёт приостановлен без потери уже найденных множителей. Можно продолжить с того же места.",
                  "The computation is paused without losing factors already found. It can resume from the same point.",
                )}
          </p>
          <p>
            {text(
              "Вычисление выполняется в отдельном потоке и не блокирует страницу.",
              "The computation runs in a separate worker and does not block the page.",
            )}
          </p>
          <div className="factorization-warning-actions">
            <button
              className="button button-quiet"
              type="button"
              onClick={onCancel}
            >
              {text("Не вычислять", "Do not factor")}
            </button>
            <button
              className="button button-primary"
              type="button"
              onClick={onContinue}
            >
              {minute
                ? text(
                    "Продолжить без лимита",
                    "Continue without a limit",
                  )
                : warning.source === "elapsed"
                  ? text(
                      "Продолжить до минуты",
                      "Continue up to one minute",
                    )
                  : text("Начать вычисление", "Start factoring")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
