import katex from "katex";

export function Latex({
  children,
  display = false,
}: {
  children: string;
  display?: boolean;
}) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    strict: "warn",
  });
  return (
    <span
      className={`latex ${display ? "display" : "inline"}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
