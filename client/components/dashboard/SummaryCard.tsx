import { Card, CardContent } from "@/components/ui/card";

export function SummaryCard({
  title,
  value,
  emoji,
  bg,
}: {
  title: string;
  value: string | number;
  emoji: string;
  bg: string; // tailwind bg class
}) {
  return (
    <Card className={`${bg} relative overflow-hidden shadow-md rounded-xl border-0`}> 
      <CardContent className="p-6">
        <div className="absolute right-4 top-3 text-2xl select-none" aria-hidden>
          {emoji}
        </div>
        <div className="text-sm text-slate-600">{title}</div>
        <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      </CardContent>
    </Card>
  );
}
