const POSITIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"] as const;

type RelationKind = "red" | "yellow" | "blue";

function relationPalette(kind: RelationKind, index: number) {
  if (kind === "red") {
    return [
      {
        fill: "var(--six-nine-mask-red-light)",
        stroke: "var(--six-nine-mask-red-light-stroke)",
      },
      {
        fill: "var(--six-nine-mask-red-dark)",
        stroke: "var(--six-nine-mask-red-dark-stroke)",
      },
      {
        fill: "var(--six-nine-mask-red-third)",
        stroke: "var(--six-nine-mask-red-third-stroke)",
      },
    ][index];
  }
  if (kind === "blue") {
    return {
      fill: "var(--six-nine-mask-blue)",
      stroke: "var(--six-nine-mask-blue-stroke)",
    };
  }
  return {
    fill: "var(--six-nine-mask-yellow)",
    stroke: "var(--six-nine-mask-yellow-stroke)",
  };
}

function relationStyle(
  memberships: readonly boolean[],
  kinds: readonly RelationKind[],
) {
  const palettes = memberships
    .map((included, index) =>
      included ? relationPalette(kinds[index], index) : null,
    )
    .filter((palette): palette is { fill: string; stroke: string } =>
      palette !== null
    );
  const fills = palettes.map((palette) => palette.fill);
  const strokes = palettes.map((palette) => palette.stroke);

  if (fills.length === 0) return undefined;

  const background = fills.length === 1
    ? fills[0]
    : `linear-gradient(135deg, ${fills.flatMap((color, index) => {
      const start = (index / fills.length) * 100;
      const end = ((index + 1) / fills.length) * 100;
      return [`${color} ${start}%`, `${color} ${end}%`];
    }).join(", ")})`;

  return {
    background,
    boxShadow: `inset 0 0 0 2px ${strokes.at(-1)}`,
  };
}

export function SixNineMaskDiagram({
  caption,
  first = "",
  firstKind = "red",
  mask,
  second = "",
  secondKind = "red",
  third = "",
  thirdKind = "yellow",
}: {
  caption: string;
  first?: string;
  firstKind?: RelationKind;
  mask: string;
  second?: string;
  secondKind?: RelationKind;
  third?: string;
  thirdKind?: RelationKind;
}) {
  return (
    <figure className="six-nine-theory-mask">
      <div aria-label={caption} className="six-nine-theory-mask-grid">
        {POSITIONS.map((position) => {
          const inFirst = first.includes(position);
          const inSecond = second.includes(position);
          const inThird = third.includes(position);
          const style = relationStyle(
            [inFirst, inSecond, inThird],
            [firstKind, secondKind, thirdKind],
          );
          return (
            <span
              className={mask.includes(position) ? "is-active" : ""}
              key={position}
              style={style}
            >
              {position}
            </span>
          );
        })}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
