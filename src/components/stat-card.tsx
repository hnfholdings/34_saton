type StatCardProps = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10">
      <p className="text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{label}</p>
    </div>
  );
}
