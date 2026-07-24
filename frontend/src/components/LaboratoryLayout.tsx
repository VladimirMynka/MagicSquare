import type { ReactNode } from "react";

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
