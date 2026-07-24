import type { ReactNode } from "react";
import { useLocale } from "../i18n";
import {
  formatInteger,
  type Coordinates,
  type Position,
  type SquareCell,
  type SquareSnapshot,
} from "../lib/magicSquare";

export type SquareCellTone = "red-light" | "red-dark";

export function SquareWorkbench({
  coordinates,
  snapshot,
  declaredPositions = [],
  maskLabel,
  targetSquareCount = 4,
  factorized = false,
  factorizations = [],
  cellTones = {},
  footer,
}: {
  coordinates: Coordinates;
  snapshot: SquareSnapshot;
  declaredPositions?: readonly Position[];
  maskLabel?: string;
  targetSquareCount?: number;
  factorized?: boolean;
  factorizations?: readonly (string | undefined)[];
  cellTones?: Readonly<Partial<Record<Position, SquareCellTone>>>;
  footer?: ReactNode;
}) {
  const { text } = useLocale();
  const hasDeclaredMask = declaredPositions.length > 0;
  const declaredMaskHolds =
    hasDeclaredMask &&
    declaredPositions.every((position) =>
      snapshot.squarePositions.includes(position),
    );

  return (
    <div className="square-desk">
      <div
        className="coordinate-ledger"
        aria-label={text("Координаты квадрата", "Square coordinates")}
      >
        {(["E", "x", "y"] as const).map((name, index) => (
          <span key={name}>
            <small>{name}</small>
            <strong>{formatInteger(coordinates[index])}</strong>
          </span>
        ))}
      </div>

      <div className="square-stage">
        <div className="stage-meta">
          <span>
            {text("Матрица", "Matrix")} 3 × 3 ·{" "}
            {factorized
              ? text("факторизации", "factorizations")
              : text("значения", "values")}
          </span>
          <span>Σ = {formatInteger(snapshot.magicSum)}</span>
        </div>
        <div className="result-grid">
          {snapshot.cells.map((cell, index) => (
            <ResultCell
              cell={cell}
              declared={declaredPositions.includes(cell.position)}
              factorized={factorized}
              factorization={factorizations[index]}
              tone={cellTones[cell.position]}
              key={cell.position}
            />
          ))}
        </div>
        <p className="square-legend">
          <i />{" "}
          {text(
            "кирпичная рамка отмечает значение — полный квадрат",
            "a brick-red frame marks a value that is a perfect square",
          )}
        </p>
      </div>

      <div className="verification-grid">
        <StatusCard
          label={text("Магический инвариант", "Magic invariant")}
          value={
            snapshot.lineSumsAgree
              ? text("8 линий совпадают", "all 8 line sums agree")
              : text("Нарушен", "Violated")
          }
          ok={snapshot.lineSumsAgree}
        />
        <StatusCard
          label={text("Заявленная маска", "Declared mask")}
          value={
            hasDeclaredMask
              ? `${maskLabel ?? declaredPositions.join("")} · ${
                  declaredMaskHolds
                    ? text("подтверждена", "confirmed")
                    : text("нарушена", "violated")
                }`
              : text("свободная конфигурация", "free configuration")
          }
          ok={declaredMaskHolds}
          neutral={!hasDeclaredMask}
        />
        <StatusCard
          label={text("Фактический результат", "Actual result")}
          value={`${snapshot.squarePositions.length}/9 ${text("квадратов", "squares")}`}
          ok={snapshot.squarePositions.length >= targetSquareCount}
        />
        <StatusCard
          label={text("Невырожденность", "Nondegeneracy")}
          value={
            snapshot.entriesDistinct
              ? text("9 попарно различных", "9 pairwise-distinct entries")
              : text("Есть равные клетки", "Some cell values coincide")
          }
          ok={snapshot.entriesDistinct}
        />
      </div>
      {footer}
    </div>
  );
}

function ResultCell({
  cell,
  declared,
  factorized,
  factorization,
  tone,
}: {
  cell: SquareCell;
  declared: boolean;
  factorized: boolean;
  factorization?: string;
  tone?: SquareCellTone;
}) {
  const { text } = useLocale();
  const display = factorized
    ? (factorization ?? "…")
    : formatInteger(cell.value);
  const digits = display.length;
  return (
    <div
      className={`result-cell ${cell.isSquare ? "is-square" : ""} ${declared ? "is-declared" : ""} ${tone ? `tone-${tone}` : ""}`}
      title={
        factorized && factorization === undefined
          ? text("Ожидает факторизации", "Waiting for factorization")
          : undefined
      }
    >
      <span className="cell-position">{cell.position}</span>
      <strong className={digits > 18 ? "tiny" : digits > 11 ? "small" : ""}>
        {display}
      </strong>
    </div>
  );
}

function StatusCard({
  label,
  value,
  ok,
  neutral = false,
}: {
  label: string;
  value: string;
  ok: boolean;
  neutral?: boolean;
}) {
  return (
    <div className="status-card">
      <span className={neutral ? "neutral" : ok ? "ok" : "bad"}>
        {neutral ? "·" : ok ? "✓" : "!"}
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
