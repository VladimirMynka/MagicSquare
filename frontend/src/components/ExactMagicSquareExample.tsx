import { useLocale } from "../i18n";

const CELL_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"] as const;

type CellLabel = (typeof CELL_LABELS)[number];

interface PrimePower {
  prime: bigint;
  exponent: number;
}

function formatInteger(value: string): string {
  const negative = value.startsWith("-");
  const digits = negative ? value.slice(1) : value;
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  return `${negative ? "−" : ""}${grouped}`;
}

function factorPositiveInteger(value: bigint): PrimePower[] {
  const factors: PrimePower[] = [];
  let remaining = value;
  let candidate = 2n;

  while (candidate * candidate <= remaining) {
    let exponent = 0;
    while (remaining % candidate === 0n) {
      remaining /= candidate;
      exponent += 1;
    }
    if (exponent > 0) factors.push({ prime: candidate, exponent });
    candidate = candidate === 2n ? 3n : candidate + 2n;
  }

  if (remaining > 1n) factors.push({ prime: remaining, exponent: 1 });
  return factors;
}

function RootFactorization({ root }: { root: string }) {
  const absoluteRoot = BigInt(root) < 0n ? -BigInt(root) : BigInt(root);
  const factors = factorPositiveInteger(absoluteRoot);
  const isAlreadyPrime = factors.length === 1 && factors[0].exponent === 1;

  if (factors.length === 0 || isAlreadyPrime) return null;

  return (
    <span className="exact-magic-cell-factorization">
      {factors.map((factor, index) => (
        <span key={factor.prime.toString()}>
          {index > 0 && <i> · </i>}
          {factor.prime.toString()}
          <sup>{factor.exponent * 2}</sup>
        </span>
      ))}
    </span>
  );
}

export function ExactMagicSquareExample({
  ariaLabel,
  roots,
  values,
}: {
  ariaLabel: string;
  roots: Partial<Record<CellLabel, string>>;
  values: readonly string[];
}) {
  const { text } = useLocale();

  if (values.length !== CELL_LABELS.length) {
    throw new RangeError("An exact magic-square example must contain nine entries.");
  }

  for (const [label, root] of Object.entries(roots)) {
    if (root === undefined) continue;
    const index = CELL_LABELS.indexOf(label as CellLabel);
    const parsedRoot = BigInt(root);
    if (parsedRoot * parsedRoot !== BigInt(values[index])) {
      throw new RangeError(`The supplied root for ${label} does not square to its entry.`);
    }
  }

  return (
    <figure className="exact-magic-example" aria-label={ariaLabel}>
      <div className="exact-magic-grid">
        {CELL_LABELS.map((label, index) => {
          const root = roots[label];
          const absoluteRoot =
            root === undefined
              ? null
              : (BigInt(root) < 0n ? -BigInt(root) : BigInt(root)).toString();

          return (
            <div
              className={`exact-magic-cell${root === undefined ? "" : " is-square"}`}
              key={label}
            >
              <span className="exact-magic-cell-label">{label}</span>
              {absoluteRoot === null ? (
                <>
                  <strong>{formatInteger(values[index])}</strong>
                  <small>{text("не квадрат", "nonsquare")}</small>
                </>
              ) : (
                <>
                  <strong>
                    {absoluteRoot}
                    <sup>2</sup>
                  </strong>
                  <RootFactorization root={absoluteRoot} />
                  <small>= {formatInteger(values[index])}</small>
                </>
              )}
            </div>
          );
        })}
      </div>
      <figcaption>
        <span className="exact-magic-legend-square" />
        {text(
          "Квадратные клетки показаны через корень; для составного корня ниже приведена простая факторизация самого квадрата.",
          "Square entries are shown through their roots; when the root is composite, the prime factorization of the square appears below.",
        )}
      </figcaption>
    </figure>
  );
}
