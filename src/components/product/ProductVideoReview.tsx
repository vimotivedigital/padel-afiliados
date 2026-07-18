"use client";

import { useState } from "react";
import Image from "next/image";
import type { VideoReview } from "@/engine/types";
import { formatDate } from "@/lib/utils";

/**
 * Facade de vídeo: solo pinta una miniatura estática (misma petición que
 * cualquier <img>, sin JS ni iframe de YouTube) hasta que el usuario hace
 * clic — momento en el que se inyecta el iframe real. Así el vídeo no
 * afecta a LCP/CLS de la ficha: el contenedor reserva su alto con
 * aspect-video desde el primer render, tanto en el estado miniatura como
 * en el estado reproducción.
 */
export function ProductVideoReview({ video }: { video: VideoReview }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section>
      <h2 className="text-xl font-bold">Vídeo-review</h2>
      <div className="relative mt-3 aspect-video overflow-hidden rounded-2xl bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block h-full w-full cursor-pointer"
            aria-label={`Reproducir vídeo: ${video.title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-3xl text-[#FF0000] shadow-lg transition-transform group-hover:scale-110">
                ▶
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-muted">
        Vídeo de terceros de <span className="font-semibold">{video.channelTitle}</span> en YouTube — no es
        contenido editorial de Voleador. Publicado el {formatDate(video.publishedAt)}.
      </p>
    </section>
  );
}
