"use client"

import { useState } from "react"
import Image from "next/image"

import Hero from "@/components/hero"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const trustItems = ["InMode", "FDA-Cleared", "Top 10% Provider", "Verified Expert"]

type BeforeAfterCategory = "face" | "body" | "skin"

const beforeAfterPairs: Array<{
  id: string
  category: BeforeAfterCategory
  beforeImage: string
  afterImage: string
}> = [
  {
    id: "face-1",
    category: "face",
    beforeImage: "/placeholder.jpg",
    afterImage: "/hero-bg.jpg",
  },
  {
    id: "face-2",
    category: "face",
    beforeImage: "/hero-bg.jpg",
    afterImage: "/placeholder-user.jpg",
  },
  {
    id: "face-3",
    category: "face",
    beforeImage: "/placeholder.jpg",
    afterImage: "/placeholder-user.jpg",
  },
  {
    id: "body-1",
    category: "body",
    beforeImage: "/placeholder-user.jpg",
    afterImage: "/placeholder.jpg",
  },
  {
    id: "body-2",
    category: "body",
    beforeImage: "/hero-bg.jpg",
    afterImage: "/placeholder.jpg",
  },
  {
    id: "body-3",
    category: "body",
    beforeImage: "/placeholder.jpg",
    afterImage: "/hero-bg.jpg",
  },
  {
    id: "skin-1",
    category: "skin",
    beforeImage: "/placeholder-user.jpg",
    afterImage: "/hero-bg.jpg",
  },
  {
    id: "skin-2",
    category: "skin",
    beforeImage: "/placeholder.jpg",
    afterImage: "/placeholder-user.jpg",
  },
  {
    id: "skin-3",
    category: "skin",
    beforeImage: "/hero-bg.jpg",
    afterImage: "/placeholder.jpg",
  },
]

const beforeAfterFilterCategories: Array<{
  id: BeforeAfterCategory
  label: string
}> = [
  { id: "face", label: "Face" },
  { id: "body", label: "Body" },
  { id: "skin", label: "Skin" },
]

const treatments = [
  {
    title: "Morpheus8",
    blurb: "Fractional RF microneedling that refines texture, tones laxity, and restores a firmer contour.",
  },
  {
    title: "Lumecca IPL",
    blurb: "High-performance photorejuvenation targeting pigment, redness, and sun damage for bright, even tone.",
  },
  {
    title: "RF Skin Tightening",
    blurb: "Comfort-forward radiofrequency treatment designed to stimulate collagen and visibly lift over time.",
  },
]

const testimonials = [
  { name: "Isabella R.", age: 36, treatment: "Morpheus8" },
  { name: "Camila P.", age: 43, treatment: "Lumecca IPL" },
  { name: "Danielle M.", age: 40, treatment: "RF Skin Tightening" },
]

const faqs = [
  {
    q: "How many sessions will I need?",
    a: "Most clients start with a personalized series of 3 sessions, then transition to maintenance based on skin goals and treatment response.",
  },
  {
    q: "Is there downtime after treatment?",
    a: "Downtime varies by protocol. Many treatments involve mild redness for 24-72 hours, and we provide a complete aftercare plan at every visit.",
  },
  {
    q: "When will I see results?",
    a: "Some improvements are visible within days, while collagen-focused treatments continue improving over several weeks as your skin remodels.",
  },
  {
    q: "Are these treatments safe for all skin tones?",
    a: "We perform a detailed consultation to match settings and modalities to your skin profile, prioritizing both efficacy and safety.",
  },
  {
    q: "Do you offer consultation appointments first?",
    a: "Yes. Every plan begins with a consultation so we can assess skin concerns, discuss options, and build a treatment roadmap.",
  },
]

export default function Page() {
  const [activeBeforeAfterCategory, setActiveBeforeAfterCategory] =
    useState<BeforeAfterCategory>("face")
  const [beforeAfterGridVisible, setBeforeAfterGridVisible] = useState(true)
  const [cardSplitById, setCardSplitById] = useState<Record<string, number>>(() =>
    Object.fromEntries(beforeAfterPairs.map((p) => [p.id, 50])),
  )

  const visibleBeforeAfterPairs = beforeAfterPairs.filter(
    (p) => p.category === activeBeforeAfterCategory,
  )

  const selectBeforeAfterCategory = (next: BeforeAfterCategory) => {
    if (next === activeBeforeAfterCategory) return
    setBeforeAfterGridVisible(false)
    window.setTimeout(() => {
      setActiveBeforeAfterCategory(next)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setBeforeAfterGridVisible(true))
      })
    }, 220)
  }

  const updateCardSplit = (id: string, clientX: number, cardRect: DOMRect) => {
    const percent = ((clientX - cardRect.left) / cardRect.width) * 100
    const clamped = Math.max(8, Math.min(92, percent))
    setCardSplitById((prev) => ({ ...prev, [id]: clamped }))
  }

  return (
    <main className="bg-[#FAF7F2] text-[#3A2820]">
      <Hero />

      <section className="border-y border-[#B8704C]/15 bg-[#EFE3D5] px-6 py-8 md:px-14 lg:px-20">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-4 md:gap-6">
          {trustItems.map((item) => (
            <div
              key={item}
              className="rounded-full border border-[#B8704C]/35 px-5 py-2 text-center font-sans text-[10px] uppercase tracking-[0.28em] text-[#3A2820]/85 md:px-7 md:py-3 md:text-[11px]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section
        className="bg-[#FAF7F2] px-6 py-20 md:px-14 lg:px-20"
        id="before-after"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Before &amp; After
          </p>
          <h2 className="mb-8 font-serif text-4xl leading-[1.06] text-[#3A2820] md:mb-10 md:text-5xl">
            Real Results, Naturally Refined
          </h2>

          <div
            className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10 md:justify-start"
            role="tablist"
            aria-label="Before and after categories"
          >
            {beforeAfterFilterCategories.map(({ id, label }) => {
              const isActive = activeBeforeAfterCategory === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`before-after-tab-${id}`}
                  aria-selected={isActive}
                  onClick={() => selectBeforeAfterCategory(id)}
                  className={`rounded-full px-5 py-2 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors md:px-6 md:text-[11px] ${
                    isActive
                      ? "bg-[#B8704C] text-white"
                      : "bg-[#FAF7F2] text-[#3A2820] shadow-sm shadow-[#3A2820]/8"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div
            className={`grid grid-cols-1 gap-5 transition-opacity duration-500 ease-out sm:grid-cols-3 sm:gap-4 md:gap-6 ${
              beforeAfterGridVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!beforeAfterGridVisible}
          >
            {visibleBeforeAfterPairs.map((pair) => {
              const split = cardSplitById[pair.id] ?? 50

              return (
                <article
                  key={pair.id}
                  className="relative w-full max-w-sm justify-self-center overflow-hidden rounded-2xl shadow-md shadow-[#3A2820]/12 [aspect-ratio:3/4] sm:max-w-none"
                >
                  <div
                    className="relative h-full w-full"
                    onMouseMove={(event) =>
                      updateCardSplit(pair.id, event.clientX, event.currentTarget.getBoundingClientRect())
                    }
                  >
                    <Image
                      src={pair.afterImage}
                      alt="After"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />

                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden"
                      style={{ width: `${split}%` }}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={pair.beforeImage}
                          alt="Before"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                    </div>

                    <span className="absolute left-4 top-4 z-[1] font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2] drop-shadow">
                      Before
                    </span>
                    <span className="absolute right-4 top-4 z-[1] font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2] drop-shadow">
                      After
                    </span>

                    <div
                      className="absolute inset-y-0 w-px bg-white/95 shadow-[0_0_10px_rgba(58,40,32,0.35)]"
                      style={{ left: `${split}%` }}
                    >
                      <span className="absolute left-1/2 top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white/80" />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#EFE3D5]/65 px-6 py-20 md:px-14 lg:px-20" id="treatments">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Treatments
          </p>
          <h2 className="mb-10 font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">
            Precision Protocols for Signature Skin
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {treatments.map((treatment) => (
              <article
                key={treatment.title}
                className="rounded-[26px] border border-[#B8704C]/20 bg-[#FAF7F2] p-7 md:p-8"
              >
                <h3 className="font-serif text-3xl text-[#3A2820]">{treatment.title}</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[#3A2820]/80">{treatment.blurb}</p>
                <a
                  href="#book"
                  className="mt-6 inline-block font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8704C] md:text-[11px]"
                >
                  Explore Treatment
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="meet-dana">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 rounded-[30px] border border-[#B8704C]/20 bg-[#FAF7F2] p-6 md:p-10 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-[22px] border border-[#B8704C]/20">
            <Image
              src="/placeholder-user.jpg"
              alt="Dana, founder of Infinity Beauty Lab"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              Meet Dana
            </p>
            <h2 className="font-serif text-4xl leading-[1.08] text-[#3A2820] md:text-5xl">
              Founder-Led Care With Clinical Precision
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-[#3A2820]/80">
              Dana combines evidence-based aesthetic medicine with a boutique, high-touch approach designed for
              natural-looking outcomes. Every treatment plan is created for your skin, your schedule, and your long
              term goals.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Board-Certified Aesthetic Specialist", "Advanced InMode Protocol Training", "10+ Years Clinical Experience", "Miami Boutique Studio Founder"].map((credential) => (
                <p
                  key={credential}
                  className="rounded-xl border border-[#B8704C]/20 bg-[#EFE3D5]/55 px-4 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/85"
                >
                  {credential}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFE3D5]/65 px-6 py-20 md:px-14 lg:px-20" id="testimonials">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Testimonials
          </p>
          <h2 className="mb-10 font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">
            Client Stories in Their Own Words
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className="overflow-hidden rounded-[24px] border border-[#B8704C]/25 bg-[#3A2820]"
              >
                <div className="relative aspect-video">
                  <Image
                    src={index === 0 ? "/hero-bg.jpg" : "/placeholder.jpg"}
                    alt={`${testimonial.name} testimonial video cover`}
                    fill
                    className="object-cover opacity-65"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#3A2820]/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="grid size-14 place-items-center rounded-full border border-[#FAF7F2]/50 bg-[#FAF7F2]/10 text-[#FAF7F2]">
                      ▶
                    </span>
                  </div>
                </div>
                <div className="space-y-2 bg-[#FAF7F2] px-5 py-5">
                  <p className="font-serif text-2xl text-[#3A2820]">{testimonial.name}</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#3A2820]/70 md:text-[11px]">
                    Age {testimonial.age} - {testimonial.treatment}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="faq">
        <div className="mx-auto w-full max-w-4xl">
          <p className="mb-4 text-center font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            FAQ
          </p>
          <h2 className="mb-10 text-center font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">
            Everything You Need Before You Book
          </h2>
          <div className="rounded-[26px] border border-[#B8704C]/20 bg-[#FAF7F2] px-6 py-3 md:px-8">
            <Accordion type="single" collapsible>
              {faqs.map((faq, idx) => (
                <AccordionItem key={faq.q} value={`faq-${idx}`} className="border-[#B8704C]/20">
                  <AccordionTrigger className="font-serif text-xl text-[#3A2820] hover:no-underline md:text-2xl">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="border-t border-[#B8704C]/20 bg-[#3A2820] px-6 py-20 text-[#FAF7F2] md:px-14 lg:px-20" id="book">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#D4956F] md:text-[11px]">
              Book Your Visit
            </p>
            <h2 className="max-w-[14ch] font-serif text-4xl leading-[1.08] md:text-5xl">
              Start Your Personalized Skin Plan
            </h2>
            <p className="mt-6 max-w-[44ch] font-sans text-sm leading-relaxed text-[#FAF7F2]/70 md:text-base">
              Reserve a consultation and receive a tailored treatment roadmap based on your goals, skin condition,
              and lifestyle.
            </p>
            <a
              href="#"
              className="mt-8 inline-block border border-[#D4956F]/40 bg-[#B8704C] px-8 py-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#FAF7F2] transition-colors hover:bg-[#B8704C]/85 md:text-[11px]"
            >
              Reserve Your Consultation
            </a>
          </div>

          <div className="space-y-6 rounded-[24px] border border-[#D4956F]/30 bg-[#FAF7F2]/5 p-6 md:p-7">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4956F] md:text-[11px]">Address</p>
              <p className="mt-2 font-serif text-2xl text-[#FAF7F2]">1221 Brickell Ave, Miami, FL</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4956F] md:text-[11px]">Hours</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#FAF7F2]/80">
                Mon-Fri 9:00AM-6:00PM
                <br />
                Saturday 10:00AM-3:00PM
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-[#D4956F]/40 p-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4956F] md:text-[11px]">
                Map Placeholder
              </p>
              <div className="mt-3 h-32 rounded-lg bg-[#FAF7F2]/10" />
            </div>
          </div>
        </div>

        <footer className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-4 border-t border-[#D4956F]/25 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-xl text-[#FAF7F2]">Infinity Beauty Lab</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2]/60 md:text-[11px]">
            Medical Aesthetics in Brickell - Miami
          </p>
        </footer>
      </section>
    </main>
  )
}
