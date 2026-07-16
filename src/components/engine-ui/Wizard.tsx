"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getConfigurator } from "@/engine/configurators";
import { recommend, type RecommendationOutput } from "@/engine/recommendation/recommend";
import type { Answers } from "@/engine/configurators/types";
import type { Product } from "@/engine/types";
import { sendGAEvent } from "@/lib/analytics/ga";
import { useUserProfile } from "@/lib/hooks/useUserProfile";
import { useLivePrices } from "@/lib/pricing/useLivePrices";
import { WizardProgress } from "./WizardProgress";
import { QuestionCard } from "./QuestionCard";
import { AnswerSummary } from "./AnswerSummary";
import { ResultCard } from "./ResultCard";
import { ResultsComparison } from "./ResultsComparison";
import { ShareResult } from "./ShareResult";
import { RestartButton } from "./RestartButton";
import { RelatedProducts } from "@/components/product/RelatedProducts";

/**
 * Componente único reutilizado por los 6 selectores (/selector-pala,
 * /selector-zapatillas...). Toda la lógica de dominio vive en `engine/`;
 * este componente solo orquesta el paso a paso y pinta los resultados que
 * el motor le devuelve.
 *
 * Nota de escalabilidad: con un catálogo de miles de productos, `recommend`
 * debería ejecutarse en el servidor (Server Action) en lugar de en el
 * cliente para no enviar todo el dataset al navegador. Con el catálogo de
 * ejemplo actual, calcularlo en cliente simplifica el wizard sin coste real.
 */
export function Wizard({ configuratorId, initialAnswers }: { configuratorId: string; initialAnswers?: Answers }) {
  const configurator = useMemo(() => getConfigurator(configuratorId), [configuratorId]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers ?? {});
  const [output, setOutput] = useState<RecommendationOutput<Product> | null>(null);
  const startedAt = useRef<number>(Date.now());
  const { saveAnswers } = useUserProfile();

  useEffect(() => {
    sendGAEvent("selector_start", { configurator: configuratorId });
  }, [configuratorId]);

  const totalSteps = configurator.questions.length;
  const currentQuestion = configurator.questions[stepIndex];

  const topProduct = output?.results[0]?.product;
  const crossSell = useMemo(
    () => (topProduct && configurator.buildCrossSell ? configurator.buildCrossSell(topProduct, answers) : []),
    [topProduct, configurator, answers]
  );
  const resultAsins = useMemo(
    () => [...(output?.results.map((r) => r.product.asin) ?? []), ...crossSell.map((p) => p.asin)],
    [output, crossSell]
  );
  const livePrices = useLivePrices(resultAsins);

  const handleAnswer = (value: string | string[]) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);
    sendGAEvent("selector_step_completed", { configurator: configuratorId, step: currentQuestion.id });

    if (stepIndex + 1 < totalSteps) {
      setStepIndex(stepIndex + 1);
      return;
    }

    const result = recommend<Product>(configuratorId, nextAnswers, 3);
    setOutput(result);
    saveAnswers(configuratorId, nextAnswers);
    sendGAEvent("selector_completed", { configurator: configuratorId });
    sendGAEvent("selector_time_spent", { configurator: configuratorId, seconds: Math.round((Date.now() - startedAt.current) / 1000) });
    result.results.forEach((r) => sendGAEvent("product_recommended", { configurator: configuratorId, product: r.product.slug, score: r.score }));
  };

  const handleRestart = () => {
    setStepIndex(0);
    setAnswers({});
    setOutput(null);
    startedAt.current = Date.now();
  };

  if (output) {
    return (
      <div className="space-y-8">
        <div className="rounded-2xl border-2 border-brand-primary/20 bg-brand-primary/5 p-5">
          <p className="font-semibold text-brand-primary-dark">{configurator.resultsTitle}</p>
          <p className="mt-2 text-sm leading-relaxed">{output.explanation}</p>
        </div>

        <div className="space-y-4">
          {output.results.map((result, i) => (
            <ResultCard key={result.product.id} result={result} rank={i + 1} livePrice={livePrices.get(result.product.asin)} />
          ))}
        </div>

        <ResultsComparison results={output.results} priceMap={livePrices} />

        <AnswerSummary questions={configurator.questions} answers={answers} />

        <div className="flex flex-wrap items-center gap-3">
          {topProduct && <ShareResult productName={topProduct.name} />}
          <RestartButton onRestart={handleRestart} />
        </div>

        {crossSell.length > 0 && <RelatedProducts products={crossSell} priceMap={livePrices} />}
      </div>
    );
  }

  return (
    <div>
      <WizardProgress step={stepIndex} total={totalSteps} />
      <QuestionCard question={currentQuestion} value={answers[currentQuestion.id]} onAnswer={handleAnswer} />
    </div>
  );
}
