import { useEffect, useMemo, useState } from "react";
import { useLocale } from "../../i18n";
import {
  factorInteger,
  gaussianFactorRows,
  gaussianNorm,
  gaussianProduct,
  isSumOfTwoSquaresFactorization,
  normalizedRepresentation,
  squareRepresentations,
  type FactorKind,
  type GaussianInteger,
} from "../../math/gaussianIntegers";

const factorKindLabels: Record<FactorKind, { ru: string; en: string }> = {
  two: { ru: "простое 2", en: "the prime 2" },
  split: { ru: "простое 4k+1", en: "prime 4k+1" },
  "inert-even": {
    ru: "простое 4k+3, чётная степень",
    en: "prime 4k+3, even exponent",
  },
  "inert-odd": {
    ru: "простое 4k+3, нечётная степень",
    en: "prime 4k+3, odd exponent",
  },
};

const factorKindShortLabels: Record<FactorKind, { ru: string; en: string }> = {
  two: { ru: "2", en: "2" },
  split: { ru: "4k+1", en: "4k+1" },
  "inert-even": { ru: "4k+3 · чёт.", en: "4k+3 · even" },
  "inert-odd": { ru: "4k+3 · нечёт.", en: "4k+3 · odd" },
};

function formatGaussian(value: GaussianInteger): string {
  if (value.im === 0) return String(value.re);
  if (value.re === 0) {
    if (value.im === 1) return "i";
    if (value.im === -1) return "−i";
    return `${value.im}i`.replace("-", "−");
  }
  const sign = value.im < 0 ? "−" : "+";
  const magnitude = Math.abs(value.im);
  return `${value.re} ${sign} ${magnitude === 1 ? "" : magnitude}i`;
}

export function GaussianFactorizationExplorer({
  initialValue = 325,
  maximum = 20_000,
}: {
  initialValue?: number;
  maximum?: number;
}) {
  const { locale, text } = useLocale();
  const [input, setInput] = useState(String(initialValue));
  const [swappedRows, setSwappedRows] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const parsed = Number(input);
  const valid =
    Number.isInteger(parsed) &&
    parsed >= 1 &&
    parsed <= maximum;

  const factors = useMemo(
    () => (valid ? factorInteger(parsed) : []),
    [parsed, valid],
  );
  const representable = valid && isSumOfTwoSquaresFactorization(factors);
  const representations = useMemo(
    () => (representable ? squareRepresentations(parsed) : []),
    [parsed, representable],
  );
  const rows = useMemo(
    () => (valid ? gaussianFactorRows(factors) : []),
    [factors, valid],
  );

  useEffect(() => {
    setSwappedRows(new Set());
  }, [parsed]);

  const orientedRows = rows.map((row) => {
    const swapped = swappedRows.has(row.id);
    return {
      ...row,
      shownLeft: swapped ? row.right : row.left,
      shownRight: swapped ? row.left : row.right,
    };
  });
  const leftProduct = gaussianProduct(orientedRows.map((row) => row.shownLeft));
  const rightProduct = gaussianProduct(orientedRows.map((row) => row.shownRight));
  const currentRepresentation = normalizedRepresentation(leftProduct);
  const obstruction = factors.find((factor) => factor.kind === "inert-odd");

  const toggleRow = (id: string) => {
    setSwappedRows((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="gaussian-explorer" aria-labelledby="gaussian-explorer-title">
      <header>
        <div>
          <span>{text("Интерактивный инструмент", "Interactive tool")}</span>
          <h3 id="gaussian-explorer-title">
            {text("Гауссова факторизация", "Gaussian factorization")}
          </h3>
          <p>
            {text(
              "Переставляйте сопряжённые множители и наблюдайте, какое представление суммой двух квадратов они задают.",
              "Swap conjugate factors and observe which representation as a sum of two squares they produce.",
            )}
          </p>
        </div>
        <label>
          <span>n</span>
          <input
            aria-describedby="gaussian-input-hint"
            inputMode="numeric"
            max={maximum}
            min="1"
            onChange={(event) => setInput(event.target.value)}
            type="number"
            value={input}
          />
          <small id="gaussian-input-hint">1…{maximum.toLocaleString(locale)}</small>
        </label>
      </header>

      {!valid ? (
        <div className="gaussian-explorer-error" role="alert">
          {text(
            `Введите целое число от 1 до ${maximum}.`,
            `Enter an integer from 1 through ${maximum}.`,
          )}
        </div>
      ) : (
        <>
          <div className="integer-factorization">
            <span>{parsed} =</span>
            {factors.length === 0 ? (
              <strong className="factor-token factor-unit">1</strong>
            ) : (
              factors.map((factor) => (
                <strong
                  className={`factor-token factor-${factor.kind}`}
                  key={factor.prime}
                  title={factorKindLabels[factor.kind][locale]}
                >
                  {factor.prime}
                  {factor.exponent > 1 && <sup>{factor.exponent}</sup>}
                  <small>{factorKindShortLabels[factor.kind][locale]}</small>
                </strong>
              ))
            )}
          </div>

          <div className={`representation-status ${representable ? "possible" : "impossible"}`}>
            <strong>
              {representable
                ? text(
                    "Разложение в сумму двух квадратов существует",
                    "A representation as a sum of two squares exists",
                  )
                : text(
                    "Разложение в сумму двух квадратов невозможно",
                    "No representation as a sum of two squares exists",
                  )}
            </strong>
            <span>
              {representable
                ? text(
                    "Все простые 4k+3 входят в чётных степенях.",
                    "Every prime 4k+3 occurs to an even exponent.",
                  )
                : text(
                    `${obstruction?.prime ?? ""} входит в нечётной степени и остаётся без пары.`,
                    `${obstruction?.prime ?? ""} has odd exponent and leaves one unpaired factor.`,
                  )}
            </span>
          </div>

          {!representable && (
            <div className="gaussian-obstruction">
              <span>
                {text(
                  "Непарный нерасщепляющийся множитель",
                  "Unpaired inert factor",
                )}
              </span>
              {factors
                .filter((factor) => factor.kind === "inert-odd")
                .map((factor) => (
                  <div key={factor.prime}>
                    <strong>{factor.prime}</strong>
                    <i>×</i>
                    <strong className="missing-factor">?</strong>
                    <small>
                      {text(
                        `${factor.prime} остаётся после распределения ${factor.prime}² по двум столбцам`,
                        `${factor.prime} remains after each ${factor.prime}² is distributed between the columns`,
                      )}
                    </small>
                  </div>
                ))}
            </div>
          )}

          {representable && (
            <>
              <div className="representation-list">
                <span>{text("Все варианты", "All representations")}</span>
                <div>
                  {representations.map((representation) => {
                    const active =
                      representation.x === currentRepresentation.x &&
                      representation.y === currentRepresentation.y;
                    return (
                      <strong className={active ? "active" : ""} key={`${representation.x}-${representation.y}`}>
                        {parsed} = {representation.x}² + {representation.y}²
                      </strong>
                    );
                  })}
                </div>
              </div>

              <div className="gaussian-factor-table-wrap">
                <table className="gaussian-factor-table">
                  <thead>
                    <tr>
                      <th>{text("Левый столбец", "Left column")}</th>
                      <th aria-label={text("Перестановка", "Swap")}>⇄</th>
                      <th>{text("Правый столбец", "Right column")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orientedRows.length === 0 ? (
                      <tr>
                        <td>1</td>
                        <td>—</td>
                        <td>1</td>
                      </tr>
                    ) : (
                      orientedRows.map((row) => (
                        <tr className={`gaussian-row-${row.kind}`} key={row.id}>
                          <td>{formatGaussian(row.shownLeft)}</td>
                          <td>
                            <button
                              aria-label={text(
                                `Переставить сопряжённые множители в строке ${row.copy + 1}`,
                                `Swap conjugate factors in row ${row.copy + 1}`,
                              )}
                              disabled={!row.swappable}
                              onClick={() => toggleRow(row.id)}
                              type="button"
                            >
                              {row.swappable ? "⇄" : "="}
                            </button>
                          </td>
                          <td>{formatGaussian(row.shownRight)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>{formatGaussian(leftProduct)}</td>
                      <td>×</td>
                      <td>{formatGaussian(rightProduct)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="gaussian-result">
                <div>
                  <span>{text("Произведения столбцов", "Column products")}</span>
                  <strong>
                    z = {formatGaussian(leftProduct)}, z̄ = {formatGaussian(rightProduct)}
                  </strong>
                </div>
                <div>
                  <span>{text("Норма выбранного произведения", "Norm of the selected product")}</span>
                  <strong>
                    {gaussianNorm(leftProduct)} = {currentRepresentation.x}² + {currentRepresentation.y}²
                  </strong>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
