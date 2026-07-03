"use client";

import { useState } from "react";
import type { Question } from "@/engine/configurators/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  value?: string | string[];
  onAnswer: (value: string | string[]) => void;
}

export function QuestionCard({ question, value, onAnswer }: QuestionCardProps) {
  const selectedMultiple = new Set(Array.isArray(value) ? value : []);
  const [multiSelection, setMultiSelection] = useState<Set<string>>(selectedMultiple);

  if (question.type === "single") {
    const selected = typeof value === "string" ? value : undefined;
    return (
      <div>
        <h2 className="text-xl font-bold">{question.title}</h2>
        {question.helpText && <p className="mt-1 text-sm text-muted">{question.helpText}</p>}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(option.value)}
              className={cn(
                "rounded-2xl border p-4 text-left transition-colors hover:border-brand-primary hover:bg-brand-primary/5",
                selected === option.value ? "border-brand-primary bg-brand-primary/10" : "border-border"
              )}
            >
              <p className="font-semibold">{option.label}</p>
              {option.description && <p className="mt-1 text-sm text-muted">{option.description}</p>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const toggle = (optionValue: string) => {
    const next = new Set(multiSelection);
    if (optionValue === "ninguna") {
      next.clear();
      next.add("ninguna");
    } else {
      next.delete("ninguna");
      if (next.has(optionValue)) next.delete(optionValue);
      else next.add(optionValue);
    }
    setMultiSelection(next);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">{question.title}</h2>
      {question.helpText && <p className="mt-1 text-sm text-muted">{question.helpText}</p>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-colors hover:border-brand-primary hover:bg-brand-primary/5",
              multiSelection.has(option.value) ? "border-brand-primary bg-brand-primary/10" : "border-border"
            )}
          >
            <p className="font-semibold">{option.label}</p>
          </button>
        ))}
      </div>
      <Button
        className="mt-5"
        disabled={multiSelection.size === 0}
        onClick={() => onAnswer(Array.from(multiSelection))}
      >
        Continuar
      </Button>
    </div>
  );
}
