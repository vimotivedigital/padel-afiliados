export function EditorReviewBox({ editorRating, editorReview }: { editorRating: number; editorReview: string }) {
  return (
    <div className="rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/5 p-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-brand-primary-dark">Opinión del editor</p>
        <p className="rounded-full bg-brand-primary px-3 py-1 text-sm font-bold text-white">{editorRating.toFixed(1)}/10</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{editorReview}</p>
    </div>
  );
}
