import { useLocale } from "../../i18n";

export function GaussianLatticeDemo() {
  const { text } = useLocale();

  return (
    <figure className="theory-demo gaussian-lattice-demo">
      <div className="theory-demo-heading">
        <span>{text("Геометрия деления", "Geometry of division")}</span>
        <strong>
          {text("Ближайшее гауссово целое", "The nearest Gaussian integer")}
        </strong>
      </div>
      <svg
        aria-labelledby="gaussian-lattice-title gaussian-lattice-description"
        role="img"
        viewBox="0 0 620 330"
      >
        <title id="gaussian-lattice-title">
          {text(
            "Округление комплексного числа до ближайшего гауссова целого",
            "Rounding a complex number to the nearest Gaussian integer",
          )}
        </title>
        <desc id="gaussian-lattice-description">
          {text(
            "Точка альфа делённое на бета лежит в единичном квадрате вокруг гамма; обе координаты остатка по модулю не превосходят одной второй.",
            "The point alpha over beta lies in the unit square centered at gamma; both remainder coordinates have absolute value at most one half.",
          )}
        </desc>
        <defs>
          <marker
            id="lattice-arrow"
            markerHeight="7"
            markerWidth="7"
            orient="auto"
            refX="6"
            refY="3.5"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" />
          </marker>
        </defs>

        <g className="lattice-grid">
          {Array.from({ length: 7 }, (_, index) => (
            <line
              key={`vertical-${index}`}
              x1={70 + index * 80}
              x2={70 + index * 80}
              y1="28"
              y2="298"
            />
          ))}
          {Array.from({ length: 4 }, (_, index) => (
            <line
              key={`horizontal-${index}`}
              x1="45"
              x2="575"
              y1={55 + index * 80}
              y2={55 + index * 80}
            />
          ))}
        </g>

        <rect className="nearest-cell" height="160" width="160" x="230" y="95" />
        <line className="lattice-axis" x1="45" x2="575" y1="175" y2="175" />
        <line className="lattice-axis" x1="310" x2="310" y1="28" y2="298" />

        <g className="lattice-points">
          {Array.from({ length: 7 }, (_, column) =>
            Array.from({ length: 4 }, (_, row) => (
              <circle
                cx={70 + column * 80}
                cy={55 + row * 80}
                key={`${column}-${row}`}
                r="4"
              />
            )),
          )}
        </g>

        <circle className="gamma-point" cx="310" cy="175" r="8" />
        <text className="gamma-label" x="321" y="194">γ</text>

        <line className="projection" x1="310" x2="357" y1="131" y2="131" />
        <line className="projection" x1="357" x2="357" y1="131" y2="175" />
        <line
          className="remainder-vector"
          markerEnd="url(#lattice-arrow)"
          x1="310"
          x2="355"
          y1="175"
          y2="134"
        />
        <circle className="quotient-point" cx="357" cy="131" r="8" />
        <text className="quotient-label" x="368" y="119">α/β</text>
        <text className="coordinate-label" x="328" y="124">|s| ≤ 1/2</text>
        <text className="coordinate-label" x="365" y="158">|t| ≤ 1/2</text>
      </svg>
      <figcaption>
        <span>
          {text(
            "Точка α/β всегда попадает в один из таких квадратов.",
            "The point α/β always lies in one of these squares.",
          )}
        </span>
        <strong>|α/β − γ|² = s² + t² ≤ 1/2</strong>
      </figcaption>
    </figure>
  );
}
