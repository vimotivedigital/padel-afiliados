import type { Answers, Question } from "@/engine/configurators/types";

export function AnswerSummary({ questions, answers }: { questions: Question[]; answers: Answers }) {
  const rows = questions
    .map((question) => {
      const value = answers[question.id];
      if (!value) return null;
      const values = Array.isArray(value) ? value : [value];
      const labels = values
        .map((v) => question.options.find((o) => o.value === v)?.label ?? v)
        .join(", ");
      return { title: question.title, labels };
    })
    .filter((row): row is { title: string; labels: string } => Boolean(row));

  return (
    <div className="rounded-2xl border border-border p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">Tus respuestas</p>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.title} className="text-sm">
            <dt className="text-muted">{row.title}</dt>
            <dd className="font-medium">{row.labels}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
