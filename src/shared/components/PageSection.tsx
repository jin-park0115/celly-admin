import type { PropsWithChildren } from "react";

type PageSectionProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export const PageSection = ({
  title,
  description,
  children,
}: PageSectionProps) => {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="text-left">
          <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
          {description ? <p className="mt-2 text-slate-600">{description}</p> : null}
        </header>
        {children}
      </div>
    </main>
  );
};
