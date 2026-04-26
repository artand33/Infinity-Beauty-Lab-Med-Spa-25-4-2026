"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"

const interTapToCall = Inter({ subsets: ["latin"], weight: ["400"] })

type HeroProps = {
  onOpenBookingModal: () => void
  onOpenAboutDrawer: () => void
}

const mobileNavItems = [
  { label: "Treatments", targetId: "treatments" },
  { label: "Before & After", targetId: "before-after" },
  { label: "Meet Dana", targetId: "about" },
  { label: "Investment", targetId: "investment" },
  { label: "Membership", targetId: "membership" },
  { label: "Find your treatment", targetId: "find-your-treatment" },
  { label: "Inside the studio", targetId: "studio" },
  { label: "Case studies", targetId: "case-studies" },
  { label: "In their own words", targetId: "in-their-own-words" },
  { label: "FAQ", targetId: "faq" },
  { label: "Book your visit", targetId: "book" },
]

export default function Hero({ onOpenBookingModal, onOpenAboutDrawer }: HeroProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [isHamburgerOnDarkSection, setIsHamburgerOnDarkSection] = useState(true)

  useEffect(() => {
    if (!mobileDrawerOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileDrawerOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [mobileDrawerOpen])

  useEffect(() => {
    let frameId: number | null = null
    const darkSectionIds = ["hero", "editorial-closer", "book"] as const

    const isPointInDarkSections = (x: number, y: number) => {
      for (const id of darkSectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          return true
        }
      }
      return false
    }

    const updateHamburgerTone = () => {
      if (!window.matchMedia("(max-width: 767px)").matches) {
        setIsHamburgerOnDarkSection(true)
        return
      }

      // Probe the top strip away from the fixed hamburger (top-right). The menu
      // button lives inside #hero in the DOM, so elementFromPoint + closest("section")
      // always resolved to hero.
      const probeX = window.innerWidth / 2
      const probeY = 36
      setIsHamburgerOnDarkSection(isPointInDarkSections(probeX, probeY))
    }

    const handleViewportChange = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      frameId = window.requestAnimationFrame(() => {
        updateHamburgerTone()
      })
    }

    updateHamburgerTone()
    window.addEventListener("scroll", handleViewportChange, { passive: true })
    window.addEventListener("resize", handleViewportChange)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener("scroll", handleViewportChange)
      window.removeEventListener("resize", handleViewportChange)
    }
  }, [])

  const handleMobileNavClick = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setMobileDrawerOpen(false)
  }

  const desktopNavItems = [
    { label: "Treatments", id: "treatments" },
    { label: "Results", id: "results" },
    { label: "About", id: "about" },
    { label: "Membership", id: "membership" },
    { label: "Contact", id: "book" },
  ] as const

  const scrollToSectionId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
    window.history.pushState(null, "", `#${id}`)
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col"
      aria-label="Infinity Beauty Lab hero section"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Luminous skin editorial photograph"
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay — solid, no cheap gradient */}
        <div className="absolute inset-0 bg-[#0d0a08]/62" />
        {/* Subtle warm vignette at edges */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 160px 40px rgba(10, 7, 4, 0.55)",
          }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-8 md:px-14 lg:px-20 pt-8 md:pt-10">
        <div className="flex flex-col gap-0.5">
          <span
            className="font-serif text-[15px] md:text-[17px] tracking-[0.22em] text-white/90 uppercase"
            style={{ letterSpacing: "0.22em" }}
          >
            Infinity Beauty Lab
          </span>
          <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/45 font-light">
            Brickell · Miami
          </span>
        </div>

        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7"
          aria-label="Primary"
        >
          <div className="flex flex-wrap items-center justify-end">
            {desktopNavItems.map((item, index) => (
              <span key={item.id} className="inline-flex items-center">
                {index > 0 ? (
                  <span
                    className="mx-3 font-sans text-[11px] font-light text-white/25 select-none"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                ) : null}
                <a
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    if (item.id === "about") {
                      window.history.pushState(null, "", "#about")
                      onOpenAboutDrawer()
                      return
                    }
                    scrollToSectionId(item.id)
                  }}
                  className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/55 hover:text-white/90 transition-colors duration-300 font-light"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </div>
        </nav>

      </header>

      {/* Hero content — vertically centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20 py-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="block w-10 md:w-14 h-px" style={{ backgroundColor: "#B8704C" }} />
          <span
            className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-light"
            style={{ color: "#B8704C" }}
          >
            Medical Aesthetics
          </span>
          <span className="block w-10 md:w-14 h-px" style={{ backgroundColor: "#B8704C" }} />
        </div>

        {/* Headline */}
        <h1 className="font-serif font-light text-white text-balance leading-[1.08]
          text-[3.4rem] sm:text-[4.2rem] md:text-[5.5rem] lg:text-[6.8rem] xl:text-[7.5rem]
          max-w-[14ch] mb-5 md:mb-7"
          style={{ textRendering: "optimizeLegibility" }}
        >
          The Science of<br />
          <em className="not-italic" style={{ color: "#D4956F" }}>Visible Beauty</em>
        </h1>

        {/* Subheadline */}
        <p className="font-sans font-light text-white/60 tracking-[0.18em] uppercase text-balance
          text-[12px] md:text-[13px] lg:text-[14px] max-w-[36ch] mb-14 md:mb-16"
        >
          Brickell&apos;s boutique medical aesthetics studio
        </p>

        {/* CTA cluster */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onOpenBookingModal}
              className="group relative inline-flex items-center justify-center
                font-sans text-[11px] md:text-[12px] font-medium tracking-[0.3em] uppercase
                text-white border border-white/20
                px-10 md:px-14 py-4 md:py-5
                transition-all duration-500
                hover:border-[#B8704C]/70 overflow-hidden"
              style={{ backgroundColor: "#B8704C" }}
              aria-label="Reserve your consultation at Infinity Beauty Lab"
            >
              {/* Shine effect on hover */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                }}
              />
              <span className="relative">Reserve Your Consultation</span>
            </button>
            <p
              className={`${interTapToCall.className} text-center text-[12px]`}
              style={{ color: "rgba(184, 112, 76, 0.7)" }}
            >
              or call us ·{" "}
              <a
                href="tel:+15612320263"
                className="underline decoration-transparent underline-offset-2 transition-colors hover:decoration-[#B8704C]/50"
                style={{ color: "inherit" }}
              >
                (561) 232-0263
              </a>
            </p>
          </div>

          {/* Treatment tags */}
          <p
            className="font-sans text-[10px] md:text-[11px] tracking-[0.28em] font-light"
            style={{ color: "rgba(212, 149, 111, 0.65)" }}
          >
            Morpheus8 · Lumecca IPL · RF Skin Tightening
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex items-end justify-between px-8 md:px-14 lg:px-20 pb-8 md:pb-10">
        {/* Location tag */}
        <div className="flex items-center gap-3">
          <svg
            width="11"
            height="14"
            viewBox="0 0 11 14"
            fill="none"
            aria-hidden="true"
            className="opacity-40"
          >
            <path
              d="M5.5 0C2.462 0 0 2.462 0 5.5c0 3.85 5.5 8.5 5.5 8.5S11 9.35 11 5.5C11 2.462 8.538 0 5.5 0Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
              fill="white"
            />
          </svg>
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40 font-light">
            40 SW 13th St, Suite 606, Miami, FL 33130
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 opacity-40">
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-white font-light">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/50 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scrollLine_2s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`fixed right-4 top-4 z-[90] flex flex-col gap-1.5 p-1 transition-[opacity,color] duration-200 md:hidden ${
          isHamburgerOnDarkSection ? "text-white" : "text-[#B8704C]"
        } ${mobileDrawerOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-label="Open navigation menu"
        aria-expanded={mobileDrawerOpen}
        onClick={() => setMobileDrawerOpen(true)}
      >
        <span className="block h-px w-6 bg-current opacity-90 transition-[background-color] duration-200 ease-out" />
        <span className="block h-px w-4 bg-current transition-[background-color] duration-200 ease-out" />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-[#3A2820]/60 transition-opacity duration-300 ease-out md:hidden ${
          mobileDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileDrawerOpen}
        onClick={() => setMobileDrawerOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[80vw] max-w-[380px] bg-[#FAF7F2] px-6 py-8 shadow-2xl shadow-[#3A2820]/25 transition-transform duration-300 ease-out md:hidden ${
          mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation drawer"
        aria-hidden={!mobileDrawerOpen}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            className="inline-flex size-8 items-center justify-center text-[#B8704C]"
            aria-label="Close navigation menu"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
        <nav className="mt-4">
          <ul className="divide-y divide-[#D7BFA7] border-y border-[#D7BFA7]">
            {mobileNavItems.map((item) => (
              <li key={item.targetId}>
                <button
                  type="button"
                  onClick={() => handleMobileNavClick(item.targetId)}
                  className="flex min-h-[60px] w-full items-center py-3 text-left font-serif text-[1.1rem] text-[#3A2820]"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </section>
  )
}
