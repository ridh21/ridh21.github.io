export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-[var(--color-background-subtle)] rounded" />
        <div className="h-5 w-96 bg-[var(--color-background-subtle)] rounded" />
      </div>
      <div className="h-16 w-full bg-[var(--color-background-subtle)] rounded" />
    </div>
  );
}
