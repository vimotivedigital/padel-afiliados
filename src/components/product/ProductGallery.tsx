"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-black/[0.03]">
        <Image src={images[active]} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-10" priority />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border ${i === active ? "border-brand-primary" : "border-border"}`}
              aria-label={`Ver imagen ${i + 1} de ${name}`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
