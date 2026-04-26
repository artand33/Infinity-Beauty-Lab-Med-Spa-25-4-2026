"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"

const interTapToCall = Inter({ subsets: ["latin"], weight: ["400"] })

type HeroProps = {
  onOpenBookingModal: () => void
  onOpenAboutDrawer: () => void
  /** Hide fixed nav menu buttons when a full-screen overlay (e.g. Dana profile) is open */
  suppressMobileMenu?: boolean
}

type MobileNavItem =
  | { type: "section"; label: string; targetId: string }
  | { type: "about"; label: string }

/** #before-after top must be this far above the viewport before the desktop menu shows (clears eyebrow + headline from under the fixed corner). */
const DESKTOP_BEFORE_AFTER_CLEAR_PX = -120

const mobileNavItems: MobileNavItem[] = [
  { type: "section", label: "Treatments", targetId: "treatments" },
  { type: "section", label: "Before & After", targetId: "before-after" },
  { type: "about", label: "Meet Dana" },
  { type: "section", label: "Investment", targetId: "investment" },
  { type: "section", label: "Membership", targetId: "membership" },
  { type: "section", label: "Find your treatment", targetId: "find-your-treatment" },
  { type: "section", label: "Inside the studio", targetId: "studio" },
  { type: "section", label: "Case studies", targetId: "case-studies" },
  { type: "section", label: "In their own words", targetId: "in-their-own-words" },
  { type: "section", label: "FAQ", targetId: "faq" },
]

export default function Hero({
  onOpenBookingModal,
  onOpenAboutDrawer,
  suppressMobileMenu = false,
}: HeroProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [isHamburgerOnDarkSection, setIsHamburgerOnDarkSection] = useState(true)
  const [desktopMenuPastHero, setDesktopMenuPastHero] = useState(false)

  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 768px)")
    let rafId: number | null = null

    const heroIntersectsViewport = (heroEl: HTMLElement) => {
      const rect = heroEl.getBoundingClientRect()
      return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < window.innerWidth &&
        rect.top < window.innerHeight
      )
    }

    const tickDesktopMenuVisibility = () => {
      if (!desktopMq.matches) {
        setDesktopMenuPastHero(false)
        return
      }
      const heroEl = document.getElementById("hero")
      const beforeAfterEl = document.getElementById("before-after")
      if (!heroEl || !beforeAfterEl) return

      const heroVisible = heroIntersectsViewport(heroEl)
      const beforeAfterTop = beforeAfterEl.getBoundingClientRect().top
      const clearedBeforeAfterIntro = beforeAfterTop < DESKTOP_BEFORE_AFTER_CLEAR_PX

      setDesktopMenuPastHero(!heroVisible && clearedBeforeAfterIntro)
    }

    const scheduleDesktopTick = () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        tickDesktopMenuVisibility()
        rafId = null
      })
    }

    scheduleDesktopTick()
    window.addEventListener("scroll", scheduleDesktopTick, { passive: true })
    window.addEventListener("resize", scheduleDesktopTick)
    desktopMq.addEventListener("change", scheduleDesktopTick)

    return () => {
      desktopMq.removeEventListener("change", scheduleDesktopTick)
      window.removeEventListener("scroll", scheduleDesktopTick)
      window.removeEventListener("resize", scheduleDesktopTick)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

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
      // Same probe for mobile (fixed hamburger) and desktop (fixed hamburger past hero).
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

  const handleMobileBookClick = () => {
    setMobileDrawerOpen(false)
    onOpenBookingModal()
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

  const showMobileHamburger =
    !mobileDrawerOpen && !suppressMobileMenu
  const showDesktopHamburger =
    desktopMenuPastHero && !mobileDrawerOpen && !suppressMobileMenu

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
        className={`fixed z-[90] flex flex-col gap-1.5 p-1 transition-[opacity,color] duration-200 md:hidden right-4 top-4 ${
          isHamburgerOnDarkSection ? "text-white" : "text-[#B8704C]"
        } ${showMobileHamburger ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!showMobileHamburger}
        tabIndex={showMobileHamburger ? undefined : -1}
        aria-label="Open navigation menu"
        aria-expanded={mobileDrawerOpen}
        onClick={() => setMobileDrawerOpen(true)}
      >
        <span className="block h-px w-6 bg-current opacity-90 transition-[background-color] duration-200 ease-out" />
        <span className="block h-px w-4 bg-current transition-[background-color] duration-200 ease-out" />
      </button>

      <button
        type="button"
        className={`fixed z-[90] hidden flex-col gap-1.5 p-1 transition-[opacity,color] duration-200 md:flex right-4 top-4 ${
          isHamburgerOnDarkSection ? "text-white" : "text-[#B8704C]"
        } ${showDesktopHamburger ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!showDesktopHamburger}
        tabIndex={showDesktopHamburger ? undefined : -1}
        aria-label="Open navigation menu"
        aria-expanded={mobileDrawerOpen}
        onClick={() => setMobileDrawerOpen(true)}
      >
        <span className="block h-px w-6 bg-current opacity-90 transition-[background-color] duration-200 ease-out" />
        <span className="block h-px w-4 bg-current transition-[background-color] duration-200 ease-out" />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-[#3A2820]/60 transition-opacity duration-300 ease-out ${
          mobileDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileDrawerOpen}
        onClick={() => setMobileDrawerOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh max-h-dvh w-[80vw] max-w-[380px] flex-col bg-[#FAF7F2] shadow-2xl shadow-[#3A2820]/25 transition-transform duration-300 ease-out md:max-w-[min(480px,46vw)] md:w-[min(480px,46vw)] ${
          mobileDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Site navigation"
        aria-hidden={!mobileDrawerOpen}
      >
        <div className="flex shrink-0 justify-end px-6 pt-6">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            className="inline-flex size-8 items-center justify-center text-[#B8704C]"
            aria-label="Close navigation menu"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <nav
          className="mt-4 flex min-h-0 flex-1 flex-col px-6"
          aria-label="Site sections"
        >
          <ul className="min-h-0 flex-1 divide-y divide-[#D7BFA7] overflow-y-auto overscroll-contain border-y border-[#D7BFA7] [-webkit-overflow-scrolling:touch]">
            {mobileNavItems.map((item) => {
              const key = item.type === "about" ? "meet-dana" : item.targetId
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.type === "about") {
                        setMobileDrawerOpen(false)
                        onOpenAboutDrawer()
                        return
                      }
                      handleMobileNavClick(item.targetId)
                    }}
                    className="flex min-h-[52px] w-full items-center py-3 text-left font-serif text-[1.05rem] leading-snug text-[#3A2820] md:text-[1.1rem]"
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-[#D7BFA7] bg-[#FAF7F2] px-6 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pt-4">
          <button
            type="button"
            onClick={handleMobileBookClick}
            className="w-full rounded-xl bg-[#3A2820] px-4 py-3.5 font-sans text-[10px] font-medium uppercase tracking-[0.26em] text-[#FAF7F2] transition-colors hover:bg-[#2a1c16] active:bg-[#241811]"
          >
            Book your visit
          </button>
        </div>
      </aside>
    </section>
  )
}
