const POSITIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"] as const;

function relationStyle(
  inFirst: boolean,
  inSecond: boolean,
  inThird: boolean,
  thirdKind: "red" | "yellow",
) {
  const fills = [
    inFirst ? "var(--six-nine-mask-red-light)" : null,
    inSecond ? "var(--six-nine-mask-red-dark)" : null,
    inThird
      ? thirdKind === "red"
        ? "var(--six-nine-mask-red-third)"
        : "var(--six-nine-mask-yellow)"
      : null,
  ].filter((color): color is string => color !== null);
  const strokes = [
    inFirst ? "var(--six-nine-mask-red-light-stroke)" : null,
    inSecond ? "var(--six-nine-mask-red-dark-stroke)" : null,
    inThird
      ? thirdKind === "red"
        ? "var(--six-nine-mask-red-third-stroke)"
        : "var(--six-nine-mask-yellow-stroke)"
      : null,
  ].filter((color): color is string => color !== null);

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
  mask,
  second = "",
  third = "",
  thirdKind = "yellow",
}: {
  caption: string;
  first?: string;
  mask: string;
  second?: string;
  third?: string;
  thirdKind?: "red" | "yellow";
}) {
  return (
    <figure className="six-nine-theory-mask">
      <div aria-label={caption} className="six-nine-theory-mask-grid">
        {POSITIONS.map((position) => {
          const inFirst = first.includes(position);
          const inSecond = second.includes(position);
          const inThird = third.includes(position);
          const style = relationStyle(inFirst, inSecond, inThird, thirdKind);
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
