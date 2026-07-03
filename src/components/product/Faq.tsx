import type { Faq as FaqType } from "@/engine/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

export function Faq({ faqs, title = "Preguntas frecuentes" }: { faqs: FaqType[]; title?: string }) {
  if (faqs.length === 0) return null;

  return (
    <section>
      <JsonLd data={faqSchema(faqs)} />
      <h2 className="text-xl font-bold">{title}</h2>
      <dl className="mt-4 space-y-3">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-2xl border border-border p-4">
            <dt className="font-semibold">{faq.question}</dt>
            <dd className="mt-1.5 text-sm text-muted">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
