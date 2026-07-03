"use client";

import { Button } from "@/components/ui/Button";

export function RestartButton({ onRestart }: { onRestart: () => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={onRestart}>
      Volver a empezar
    </Button>
  );
}
