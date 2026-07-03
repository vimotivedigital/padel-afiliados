"use client";

import { useCallback, useEffect, useState } from "react";
import type { Answers } from "@/engine/configurators/types";

const STORAGE_KEY = "padel-total:user-profile";

export type UserProfile = Record<string, Answers>;

function readProfile(): UserProfile {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : {};
  } catch {
    return {};
  }
}

/**
 * Guarda las respuestas de cada selector completado en sessionStorage
 * (perfil de sesión, no persistente entre visitas) para poder ofrecer
 * recomendaciones cruzadas: "según tu perfil de jugador, también te
 * pueden interesar estas zapatillas".
 */
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>({});

  useEffect(() => {
    setProfile(readProfile());
  }, []);

  const saveAnswers = useCallback((configuratorId: string, answers: Answers) => {
    setProfile((prev) => {
      const next = { ...prev, [configuratorId]: answers };
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // sessionStorage puede no estar disponible (modo privado); degradamos sin romper la UI.
      }
      return next;
    });
  }, []);

  const getAnswers = useCallback((configuratorId: string) => profile[configuratorId], [profile]);

  return { profile, saveAnswers, getAnswers };
}
