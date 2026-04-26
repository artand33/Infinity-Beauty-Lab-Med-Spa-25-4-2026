"use client"

import { Bebas_Neue, Bodoni_Moda, Great_Vibes, Lora, Playfair_Display } from "next/font/google"

const vogue = Playfair_Display({ subsets: ["latin"], weight: "600" })
const allure = Great_Vibes({ subsets: ["latin"], weight: "400" })
const bazaar = Bodoni_Moda({ subsets: ["latin"], weight: "500" })
const elle = Bebas_Neue({ subsets: ["latin"], weight: "400" })
const forbes = Lora({ subsets: ["latin"], weight: "500" })

const COCOA = "text-[#5c4a3d]/50"

/**
 * Typographic "mark" row inspired by common editorial styles (not official logos).
 */
export function PressMarkRow() {
  return (
    <div
      className="mt-4 flex flex-wrap items-end justify-center gap-x-7 gap-y-3 md:gap-x-9 md:gap-y-2"
      aria-label="As featured in"
    >
      <span className={`${vogue.className} text-[0.9rem] uppercase tracking-[0.18em] md:text-[1.05rem] ${COCOA}`}>
        VOGUE
      </span>
      <span className={`${allure.className} text-[1.4rem] leading-none md:text-[1.6rem] ${COCOA}`}>
        Allure
      </span>
      <span
        className={`${bazaar.className} text-center text-[0.7rem] leading-tight tracking-[0.22em] md:text-[0.78rem] ${COCOA}`}
      >
        <span className="block font-light tracking-[0.12em]">Harper&rsquo;s</span>
        <span className="mt-0.5 block text-[0.85rem] font-light uppercase tracking-[0.35em] md:text-[0.95rem]">
          BAZAAR
        </span>
      </span>
      <span className={`${elle.className} text-[1.35rem] leading-none tracking-[0.06em] md:text-[1.5rem] ${COCOA}`}>
        ELLE
      </span>
      <span
        className={`${forbes.className} flex flex-col items-center text-center text-[0.75rem] leading-tight md:text-[0.82rem] ${COCOA}`}
      >
        <span className="font-semibold">Forbes</span>
        <span className="mt-0.5 font-sans text-[0.5rem] uppercase tracking-[0.2em] text-[#5c4a3d]/45 md:text-[0.55rem]">
          Health
        </span>
      </span>
    </div>
  )
}
