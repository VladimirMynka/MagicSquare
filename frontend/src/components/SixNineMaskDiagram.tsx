const POSITIONS = ["A", "B", "C", "D", "E", "F", "G", "H", "J"] as const;

export function SixNineMaskDiagram({
  caption,
  first = "",
  mask,
  second = "",
}: {
  caption: string;
  first?: string;
  mask: string;
  second?: string;
}) {
  return (
    <figure className="six-nine-theory-mask">
      <div aria-label={caption} className="six-nine-theory-mask-grid">
        {POSITIONS.map((position) => {
          const inFirst = first.includes(position);
          const inSecond = second.includes(position);
          const group = inFirst && inSecond
            ? "group-overlap"
            : inFirst
              ? "group-first"
              : inSecond
                ? "group-second"
                : "";
          return (
            <span
              className={`${mask.includes(position) ? "is-active" : ""} ${group}`.trim()}
              key={position}
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
