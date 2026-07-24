import type { ReactNode } from "react";
import { useLocale } from "../i18n";

export type LaboratoryLevel = 4 | 5 | 6;

function classes(base: string, additional?: string): string {
  return additional ? `${base} ${additional}` : base;
}

export function LaboratoryLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={classes("lab-layout", className)}>{children}</div>;
}

export function LaboratoryWorkspace({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={classes("workspace", className)}>{children}</section>
  );
}

export function LaboratoryToolbar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classes("workspace-toolbar", className)}>{children}</div>
  );
}

export function LaboratoryWorkbench({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classes("workbench-grid", className)}>{children}</div>
  );
}

export function LaboratoryControls({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside className={classes("control-desk", className)}>{children}</aside>
  );
}

export function LaboratoryLevelNavigation({
  activeLevel,
  onSelectLevel,
}: {
  activeLevel: LaboratoryLevel;
  onSelectLevel: (level: LaboratoryLevel) => void;
}) {
  const { text } = useLocale();

  return (
    <div
      className="family-level-tabs"
      aria-label={text("Уровень квадратной маски", "Square-mask level")}
    >
      {([4, 5, 6] as const).map((level) => (
        <button
          className={activeLevel === level ? "active" : ""}
          type="button"
          aria-current={activeLevel === level ? "page" : undefined}
          onClick={() => onSelectLevel(level)}
          key={level}
        >
          {level}/9 · {level < 6 ? "23" : "β"}
        </button>
      ))}
    </div>
  );
}
