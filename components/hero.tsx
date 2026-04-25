import Image from "next/image"

export default function Hero() {
  return (
    <section
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

        <nav className="hidden md:flex items-center gap-8">
          {["Treatments", "About", "Journal", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/55 hover:text-white/90 transition-colors duration-300 font-light"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile menu icon */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Open navigation menu"
        >
          <span className="block w-6 h-px bg-white/70" />
          <span className="block w-4 h-px bg-white/70" />
        </button>
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
          <a
            href="#"
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
          </a>

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
            1221 Brickell Ave, Miami, FL
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
    </section>
  )
}
