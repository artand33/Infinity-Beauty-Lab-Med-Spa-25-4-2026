"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Calendar,
  CalendarCheck2,
  ClipboardList,
  Gift,
  Heart,
  MapPin,
  Percent,
  Phone,
  ScanFace,
  Sparkles,
} from "lucide-react"

import Hero from "@/components/hero"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const trustItems = ["InMode", "FDA-Cleared", "Top 10% Provider", "Verified Expert"]

type BeforeAfterCategory = "face" | "body" | "skin"

const beforeAfterSlots: Array<{ beforeImage: string; afterImage: string }> = [
  {
    beforeImage:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
  },
]

const beforeAfterPairs: Array<{
  id: string
  category: BeforeAfterCategory
  beforeImage: string
  afterImage: string
}> = [
  { id: "face-1", category: "face", ...beforeAfterSlots[0] },
  { id: "face-2", category: "face", ...beforeAfterSlots[1] },
  { id: "face-3", category: "face", ...beforeAfterSlots[2] },
  { id: "body-1", category: "body", ...beforeAfterSlots[0] },
  { id: "body-2", category: "body", ...beforeAfterSlots[1] },
  { id: "body-3", category: "body", ...beforeAfterSlots[2] },
  { id: "skin-1", category: "skin", ...beforeAfterSlots[0] },
  { id: "skin-2", category: "skin", ...beforeAfterSlots[1] },
  { id: "skin-3", category: "skin", ...beforeAfterSlots[2] },
]

const beforeAfterFilterCategories: Array<{
  id: BeforeAfterCategory
  label: string
}> = [
  { id: "face", label: "Face" },
  { id: "body", label: "Body" },
  { id: "skin", label: "Skin" },
]

type TransformationCategory = "texture" | "pigmentation" | "laxity" | "tone"
type QuizConcern = "texture" | "pigmentation" | "laxity" | "acne-scars"
type QuizAge = "under-30" | "30-40" | "40-50" | "50-plus"
type QuizDowntime = "none" | "day-or-two" | "up-to-week"
type QuizInvestment = "single" | "package" | "membership"

const featuredInPublications = ["Vogue", "Elle", "Allure", "Harper's Bazaar", "Forbes Health"]

const transformationFilterCategories: Array<{ id: TransformationCategory; label: string }> = [
  { id: "texture", label: "Texture" },
  { id: "pigmentation", label: "Pigmentation" },
  { id: "laxity", label: "Laxity" },
  { id: "tone", label: "Tone" },
]

const transformationSlots: Array<{ beforeImage: string; afterImage: string }> = [
  {
    beforeImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
  },
]

const transformationPairs: Array<{
  id: string
  category: TransformationCategory
  concern: string
  treatment: string
  beforeImage: string
  afterImage: string
}> = [
  { id: "texture-1", category: "texture", concern: "Texture", treatment: "Morpheus8", ...transformationSlots[0] },
  { id: "texture-2", category: "texture", concern: "Texture", treatment: "Medical Microneedling", ...transformationSlots[1] },
  { id: "texture-3", category: "texture", concern: "Texture", treatment: "Morpheus8", ...transformationSlots[2] },
  { id: "texture-4", category: "texture", concern: "Texture", treatment: "Medical Microneedling", ...transformationSlots[0] },
  { id: "texture-5", category: "texture", concern: "Texture", treatment: "Morpheus8", ...transformationSlots[1] },
  { id: "texture-6", category: "texture", concern: "Texture", treatment: "Medical Microneedling", ...transformationSlots[2] },
  { id: "pigmentation-1", category: "pigmentation", concern: "Pigmentation", treatment: "Lumecca IPL", ...transformationSlots[0] },
  { id: "pigmentation-2", category: "pigmentation", concern: "Pigmentation", treatment: "Lumecca IPL", ...transformationSlots[1] },
  { id: "pigmentation-3", category: "pigmentation", concern: "Pigmentation", treatment: "Lumecca IPL", ...transformationSlots[2] },
  { id: "pigmentation-4", category: "pigmentation", concern: "Pigmentation", treatment: "Lumecca IPL", ...transformationSlots[0] },
  { id: "pigmentation-5", category: "pigmentation", concern: "Pigmentation", treatment: "Lumecca IPL", ...transformationSlots[1] },
  { id: "pigmentation-6", category: "pigmentation", concern: "Pigmentation", treatment: "Lumecca IPL", ...transformationSlots[2] },
  { id: "laxity-1", category: "laxity", concern: "Laxity", treatment: "RF Skin Tightening", ...transformationSlots[0] },
  { id: "laxity-2", category: "laxity", concern: "Laxity", treatment: "Morpheus8", ...transformationSlots[1] },
  { id: "laxity-3", category: "laxity", concern: "Laxity", treatment: "RF Skin Tightening", ...transformationSlots[2] },
  { id: "laxity-4", category: "laxity", concern: "Laxity", treatment: "Morpheus8", ...transformationSlots[0] },
  { id: "laxity-5", category: "laxity", concern: "Laxity", treatment: "RF Skin Tightening", ...transformationSlots[1] },
  { id: "laxity-6", category: "laxity", concern: "Laxity", treatment: "Morpheus8", ...transformationSlots[2] },
  { id: "tone-1", category: "tone", concern: "Tone", treatment: "Lumecca IPL", ...transformationSlots[0] },
  { id: "tone-2", category: "tone", concern: "Tone", treatment: "Morpheus8", ...transformationSlots[1] },
  { id: "tone-3", category: "tone", concern: "Tone", treatment: "Medical Microneedling", ...transformationSlots[2] },
  { id: "tone-4", category: "tone", concern: "Tone", treatment: "Lumecca IPL", ...transformationSlots[0] },
  { id: "tone-5", category: "tone", concern: "Tone", treatment: "Morpheus8", ...transformationSlots[1] },
  { id: "tone-6", category: "tone", concern: "Tone", treatment: "Medical Microneedling", ...transformationSlots[2] },
]

const reviews = [
  {
    name: "Sofia M.",
    quote:
      "Dana does not push you toward more sessions than you need. She built a plan around my actual skin and I saw results by week three.",
    date: "March 2026",
    treatment: "MORPHEUS8",
  },
  {
    name: "Camila R.",
    quote:
      "The space is calm, private, and beautiful. I have been to bigger clinics in Miami but nothing felt this personal.",
    date: "February 2026",
    treatment: "LUMECCA IPL",
  },
  {
    name: "Valentina P.",
    quote:
      "I came in skeptical about RF and left a believer. The jawline tightening is subtle but it is there.",
    date: "March 2026",
    treatment: "RF SKIN TIGHTENING",
  },
  {
    name: "Isabella G.",
    quote:
      "Booking is seamless, treatments start on time, and Dana actually answers your questions instead of rushing to the next room.",
    date: "January 2026",
    treatment: "MORPHEUS8",
  },
  {
    name: "Daniela T.",
    quote:
      "Three months in and my pigmentation issues from years of Miami sun are visibly lighter. Worth every dollar.",
    date: "February 2026",
    treatment: "LUMECCA IPL",
  },
  {
    name: "Mariana L.",
    quote:
      "I am 52 and skeptical of everything. This is the only place I trust with my face anymore.",
    date: "March 2026",
    treatment: "COMBINATION THERAPY",
  },
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

const treatmentDetails = [
  {
    name: "Morpheus8",
    description:
      "Morpheus8 combines fractional microneedling with radiofrequency to remodel deeper layers of skin and improve firmness. It is ideal for texture refinement, contour definition, and reducing the look of fine lines.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
    sessions: "3 sessions",
    downtime: "24-72 hours",
    timeline: "4-8 weeks",
    bestFor: "Texture + laxity",
  },
  {
    name: "Lumecca IPL",
    description:
      "Lumecca IPL targets visible pigment and vascular irregularities with high-intensity light for a brighter, more even complexion. Most clients notice clearer tone quickly, with progressive improvement after each session.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
    sessions: "1-3 sessions",
    downtime: "Minimal",
    timeline: "Within 1-2 weeks",
    bestFor: "Pigment + redness",
  },
  {
    name: "RF Skin Tightening",
    description:
      "RF Skin Tightening delivers controlled heat to stimulate collagen and support gradual lifting in areas showing mild to moderate laxity. The treatment is comfortable, requires little interruption, and builds results over time.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80",
    sessions: "4-6 sessions",
    downtime: "None",
    timeline: "6-12 weeks",
    bestFor: "Jawline + neck tone",
  },
  {
    name: "Medical Microneedling",
    description:
      "Medical Microneedling creates precise microchannels that trigger natural renewal, helping soften scars, improve texture, and smooth uneven tone. It supports stronger skin quality while keeping the overall look natural and balanced.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    sessions: "3-4 sessions",
    downtime: "24-48 hours",
    timeline: "2-6 weeks",
    bestFor: "Scars + texture",
  },
]

const investmentOptions = [
  {
    title: "Single Session",
    price: "Starting at $650",
    details: "Customized protocol, full consultation review, and guided aftercare plan.",
    note: "",
    featured: false,
  },
  {
    title: "Package of 3",
    price: "Starting at $1,750",
    details: "Three-session treatment roadmap with progress check-ins and priority scheduling.",
    note: "Most popular - save 10%",
    featured: true,
  },
  {
    title: "Membership",
    price: "$420 / month",
    details: "Monthly maintenance treatment, member pricing on add-ons, and concierge booking support.",
    note: "",
    featured: false,
  },
]

const studioImages = [
  {
    label: "Treatment Room",
    src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
  },
  {
    label: "Reception",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  },
  {
    label: "Detail Shot",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
  },
]

const testimonials = [
  {
    name: "Isabella R.",
    age: 36,
    treatment: "Morpheus8",
    thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  },
  {
    name: "Camila P.",
    age: 43,
    treatment: "Lumecca IPL",
    thumbnail: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80",
  },
  {
    name: "Danielle M.",
    age: 40,
    treatment: "RF Skin Tightening",
    thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
  },
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

const membershipPerks = [
  {
    title: "Priority booking",
    description: "Reserve appointments two weeks before they open to the public.",
    icon: Calendar,
  },
  {
    title: "Monthly maintenance facial",
    description: "One signature treatment included every month, designed for your skin.",
    icon: Sparkles,
  },
  {
    title: "Member pricing on add-ons",
    description: "15% off every additional treatment, peel, and product purchase.",
    icon: Percent,
  },
  {
    title: "Birthday treatment credit",
    description: "$200 toward any service during your birthday month, no expiration.",
    icon: Gift,
  },
  {
    title: "Direct line to Dana",
    description: "Text Dana between visits with skin questions or product concerns.",
    icon: Phone,
  },
  {
    title: "Partner studio benefits",
    description: "Exclusive rates at select Brickell wellness partners - pilates, massage, hair.",
    icon: Heart,
  },
]

const firstVisitTimeline = [
  {
    number: "01",
    title: "Reserve your consultation",
    description:
      "Book online or by phone. We confirm within the hour during business times.",
    icon: CalendarCheck2,
  },
  {
    number: "02",
    title: "Arrive at the studio",
    description:
      "Located at 1221 Brickell Ave with complimentary garage parking. Settle in with a warm tea while we prepare your session.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Skin assessment with Dana",
    description:
      "Dana reviews your concerns, examines your skin, and walks you through realistic outcomes for your goals.",
    icon: ScanFace,
  },
  {
    number: "04",
    title: "Your personalized plan",
    description:
      "You leave with a clear treatment roadmap, transparent pricing, and zero pressure to decide on the spot.",
    icon: ClipboardList,
  },
  {
    number: "05",
    title: "Begin your transformation",
    description:
      "When you're ready, we book your first session and start the work. Most clients see initial change within three weeks.",
    icon: Sparkles,
  },
]

const quizSteps = [
  {
    question: "What's your primary skin concern?",
    type: "grid" as const,
    options: [
      { value: "texture" as QuizConcern, label: "Texture and fine lines" },
      { value: "pigmentation" as QuizConcern, label: "Pigmentation and dark spots" },
      { value: "laxity" as QuizConcern, label: "Skin laxity and contour" },
      { value: "acne-scars" as QuizConcern, label: "Acne scars and uneven tone" },
    ],
  },
  {
    question: "What's your age range?",
    type: "stack" as const,
    options: [
      { value: "under-30" as QuizAge, label: "Under 30" },
      { value: "30-40" as QuizAge, label: "30 to 40" },
      { value: "40-50" as QuizAge, label: "40 to 50" },
      { value: "50-plus" as QuizAge, label: "50 plus" },
    ],
  },
  {
    question: "How much downtime can you tolerate?",
    type: "stack" as const,
    options: [
      { value: "none" as QuizDowntime, label: "None - I have a busy life" },
      { value: "day-or-two" as QuizDowntime, label: "A day or two - I can rest a weekend" },
      { value: "up-to-week" as QuizDowntime, label: "Up to a week - I want maximum results" },
    ],
  },
  {
    question: "What investment level feels right?",
    type: "stack" as const,
    options: [
      { value: "single" as QuizInvestment, label: "Single session to try it" },
      { value: "package" as QuizInvestment, label: "A package of three for visible change" },
      { value: "membership" as QuizInvestment, label: "Ongoing membership for long-term care" },
    ],
  },
]

export default function Page() {
  const [activeBeforeAfterCategory, setActiveBeforeAfterCategory] =
    useState<BeforeAfterCategory>("face")
  const [beforeAfterGridVisible, setBeforeAfterGridVisible] = useState(true)
  const [activeTransformationCategory, setActiveTransformationCategory] =
    useState<TransformationCategory>("texture")
  const [transformationsGridVisible, setTransformationsGridVisible] = useState(true)
  const [reviewsExpanded, setReviewsExpanded] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizPanelVisible, setQuizPanelVisible] = useState(true)
  const [quizTransitionDirection, setQuizTransitionDirection] = useState<1 | -1>(1)
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<{
    concern: QuizConcern | null
    age: QuizAge | null
    downtime: QuizDowntime | null
    investment: QuizInvestment | null
  }>({
    concern: null,
    age: null,
    downtime: null,
    investment: null,
  })
  const [cardSplitById, setCardSplitById] = useState<Record<string, number>>(() =>
    Object.fromEntries([...beforeAfterPairs, ...transformationPairs].map((p) => [p.id, 50])),
  )

  const visibleBeforeAfterPairs = beforeAfterPairs.filter(
    (p) => p.category === activeBeforeAfterCategory,
  )
  const visibleTransformationPairs = transformationPairs.filter(
    (pair) => pair.category === activeTransformationCategory,
  )
  const primaryReviews = reviews.slice(0, 3)
  const secondaryReviews = reviews.slice(3)

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

  const selectTransformationCategory = (next: TransformationCategory) => {
    if (next === activeTransformationCategory) return
    setTransformationsGridVisible(false)
    window.setTimeout(() => {
      setActiveTransformationCategory(next)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransformationsGridVisible(true))
      })
    }, 220)
  }

  const transitionToQuizStep = (nextStep: number, direction: 1 | -1 = 1) => {
    setQuizTransitionDirection(direction)
    setQuizPanelVisible(false)
    window.setTimeout(() => {
      setQuizStep(nextStep)
      setSelectedQuizOption(null)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setQuizPanelVisible(true))
      })
    }, 220)
  }

  const handleQuizAnswer = (value: string) => {
    if (selectedQuizOption) return
    setSelectedQuizOption(value)
    window.setTimeout(() => {
      if (quizStep === 0) {
        setQuizAnswers((prev) => ({ ...prev, concern: value as QuizConcern }))
        transitionToQuizStep(1, 1)
      } else if (quizStep === 1) {
        setQuizAnswers((prev) => ({ ...prev, age: value as QuizAge }))
        transitionToQuizStep(2, 1)
      } else if (quizStep === 2) {
        setQuizAnswers((prev) => ({ ...prev, downtime: value as QuizDowntime }))
        transitionToQuizStep(3, 1)
      } else if (quizStep === 3) {
        setQuizAnswers((prev) => ({ ...prev, investment: value as QuizInvestment }))
        transitionToQuizStep(4, 1)
      }
    }, 170)
  }

  const getQuizRecommendation = () => {
    if (quizAnswers.age === "50-plus") {
      return "Combination Therapy"
    }
    if (quizAnswers.concern === "texture") return "Morpheus8"
    if (quizAnswers.concern === "pigmentation") return "Lumecca IPL"
    if (quizAnswers.concern === "laxity") return "RF Skin Tightening"
    if (quizAnswers.concern === "acne-scars") return "Combination Therapy"
    return "Morpheus8"
  }

  const getQuizExplanation = () => {
    const concernLabel = (() => {
      if (quizAnswers.concern === "texture") return "texture and fine-line refinement"
      if (quizAnswers.concern === "pigmentation") return "pigment correction and tone-evening"
      if (quizAnswers.concern === "laxity") return "subtle lifting and contour support"
      return "scar softening and overall skin renewal"
    })()
    const downtimeLabel = (() => {
      if (quizAnswers.downtime === "none") return "minimal interruption to your schedule"
      if (quizAnswers.downtime === "day-or-two") return "a short, manageable recovery window"
      return "a deeper-results approach with more recovery time"
    })()
    const investmentLabel = (() => {
      if (quizAnswers.investment === "single") return "a first-session entry point"
      if (quizAnswers.investment === "package") return "a focused package for visible change"
      return "a long-term membership strategy"
    })()
    return `Based on your goals around ${concernLabel}, this protocol is designed to deliver results with ${downtimeLabel}. We would tailor settings to match ${investmentLabel} so your plan feels realistic and consistent.`
  }

  const resetQuiz = () => {
    setQuizAnswers({ concern: null, age: null, downtime: null, investment: null })
    transitionToQuizStep(0)
  }

  const handleQuizBack = () => {
    if (quizStep === 0) return
    transitionToQuizStep(quizStep - 1, -1)
  }

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("book")
    bookingSection?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const updateCardSplit = (id: string, clientX: number, cardRect: DOMRect) => {
    const mouseX = clientX - cardRect.left
    const percent = (mouseX / cardRect.width) * 100
    const clamped = Math.max(0, Math.min(100, percent))
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
              const percent = cardSplitById[pair.id] ?? 50

              return (
                <article
                  key={pair.id}
                  className="relative w-full max-w-sm justify-self-center overflow-hidden rounded-2xl shadow-md shadow-[#3A2820]/12 [aspect-ratio:3/4] sm:max-w-none"
                >
                  <div
                    className="relative h-full w-full select-none"
                    onMouseMove={(event) =>
                      updateCardSplit(pair.id, event.clientX, event.currentTarget.getBoundingClientRect())
                    }
                  >
                    <Image
                      src={pair.afterImage}
                      alt="After"
                      fill
                      className="pointer-events-none absolute inset-0 z-0 object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <Image
                      src={pair.beforeImage}
                      alt="Before"
                      fill
                      className="pointer-events-none absolute inset-0 z-[1] object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      style={{
                        clipPath: `inset(0 ${100 - percent}% 0 0)`,
                      }}
                    />

                    <span className="pointer-events-none absolute left-4 top-4 z-[2] font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2] drop-shadow">
                      Before
                    </span>
                    <span className="pointer-events-none absolute right-4 top-4 z-[2] font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2] drop-shadow">
                      After
                    </span>

                    <div
                      className="pointer-events-none absolute inset-y-0 z-[3] w-px bg-white/95 shadow-[0_0_10px_rgba(58,40,32,0.35)]"
                      style={{ left: `${percent}%` }}
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
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
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

      <section className="bg-[#FAF7F2] px-6 py-20 md:px-14 lg:px-20" id="treatments-deep-dive">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Treatments Deep Dive
          </p>
          <h2 className="mb-10 font-serif text-4xl leading-[1.06] text-[#3A2820] md:mb-12 md:text-5xl">
            Advanced Protocols, Personalized for You
          </h2>

          <div className="divide-y divide-[#B8704C]/18 border-y border-[#B8704C]/18">
            {treatmentDetails.map((treatment, index) => {
              const imageFirst = index % 2 === 0
              return (
                <article
                  key={treatment.name}
                  className="grid items-center gap-8 py-10 md:gap-10 md:py-12 lg:grid-cols-2 lg:gap-12"
                >
                  <div
                    className={`relative aspect-[5/4] overflow-hidden rounded-[24px] border border-[#B8704C]/20 shadow-sm shadow-[#3A2820]/8 ${
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={treatment.image}
                      alt={treatment.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                    <h3 className="font-serif text-4xl leading-tight text-[#3A2820] md:text-[2.6rem]">
                      {treatment.name}
                    </h3>
                    <p className="mt-5 max-w-[52ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
                      {treatment.description}
                    </p>
                    <dl className="mt-7 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-[#B8704C]/20 bg-[#EFE3D5]/45 px-4 py-3">
                        <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/65 md:text-[11px]">
                          Sessions Needed
                        </dt>
                        <dd className="mt-1 font-serif text-2xl text-[#3A2820]">{treatment.sessions}</dd>
                      </div>
                      <div className="rounded-xl border border-[#B8704C]/20 bg-[#EFE3D5]/45 px-4 py-3">
                        <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/65 md:text-[11px]">
                          Downtime
                        </dt>
                        <dd className="mt-1 font-serif text-2xl text-[#3A2820]">{treatment.downtime}</dd>
                      </div>
                      <div className="rounded-xl border border-[#B8704C]/20 bg-[#EFE3D5]/45 px-4 py-3">
                        <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/65 md:text-[11px]">
                          Results Timeline
                        </dt>
                        <dd className="mt-1 font-serif text-2xl text-[#3A2820]">{treatment.timeline}</dd>
                      </div>
                      <div className="rounded-xl border border-[#B8704C]/20 bg-[#EFE3D5]/45 px-4 py-3">
                        <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/65 md:text-[11px]">
                          Best For
                        </dt>
                        <dd className="mt-1 font-serif text-2xl text-[#3A2820]">{treatment.bestFor}</dd>
                      </div>
                    </dl>
                    <a
                      href="#book"
                      className="mt-7 inline-block font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8704C] md:text-[11px]"
                    >
                      Reserve this treatment
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#EFE3D5]/65 px-6 py-20 md:px-14 lg:px-20" id="investment">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Investment
          </p>
          <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Investment</h2>
          <p className="mt-4 max-w-[42ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
            Transparent pricing, no surprises
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {investmentOptions.map((option) => (
              <article
                key={option.title}
                className={`rounded-[24px] bg-[#FAF7F2] p-7 md:p-8 ${
                  option.featured
                    ? "border-2 border-[#B8704C]/70 shadow-md shadow-[#B8704C]/15"
                    : "border border-[#B8704C]/22"
                }`}
              >
                <h3 className="font-serif text-3xl text-[#3A2820]">{option.title}</h3>
                <p className="mt-4 font-serif text-4xl text-[#3A2820]">{option.price}</p>
                <p className="mt-4 font-sans text-sm leading-relaxed text-[#3A2820]/80">{option.details}</p>
                {option.note ? (
                  <p className="mt-6 inline-block rounded-full bg-[#B8704C]/10 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#B8704C] md:text-[11px]">
                    {option.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/60 md:text-[11px]">
            Final pricing determined at consultation
          </p>
        </div>
      </section>

      <section className="bg-[#F7F1E8] px-6 py-20 md:px-14 lg:px-20" id="membership">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-12">
          <div className="self-center">
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              MEMBERSHIP
            </p>
            <h2 className="font-serif text-4xl leading-[1.08] text-[#3A2820] md:text-5xl">
              Made for clients who treat their skin like an investment.
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-[#3A2820]/80">
              The Infinity membership turns one-off visits into a long-term relationship with your skin. Priority
              access, monthly upkeep, and the kind of pricing that only makes sense if you&apos;re serious about
              results.
            </p>
            <button
              type="button"
              onClick={scrollToBooking}
              className="mt-7 inline-flex items-center font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8704C] md:text-[11px]"
            >
              Become a member →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {membershipPerks.map((perk) => {
              const Icon = perk.icon
              return (
                <article
                  key={perk.title}
                  className="rounded-[18px] border border-[#D7BFA7] bg-[#FAF7F2] p-5 shadow-sm shadow-[#3A2820]/7 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="mb-4 inline-flex size-8 items-center justify-center rounded-full border border-[#B8704C]/35 text-[#B8704C]">
                    <Icon size={15} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[18px] leading-tight text-[#3A2820]">{perk.title}</h3>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-[#3A2820]/72">{perk.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-20 md:px-14 lg:px-20" id="find-your-treatment">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Find your treatment
          </p>
          <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Find your treatment</h2>
          <p className="mt-4 max-w-[46ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
            Answer four questions and we&apos;ll match you with the right protocol.
          </p>

          <div className="mx-auto mt-10 w-full max-w-[720px] rounded-[28px] border border-[#D7BFA7] bg-[#FAF7F2] p-6 shadow-md shadow-[#3A2820]/10 md:p-9">
            <div className="relative mb-8 min-h-6">
              {quizStep > 0 ? (
                <button
                  type="button"
                  onClick={handleQuizBack}
                  className="group absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 font-sans text-[9px] uppercase tracking-[0.24em] text-[#B8704C] md:text-[10px]"
                >
                  <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                  <span>Back</span>
                </button>
              ) : null}

              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3].map((dotIndex) => {
                  const isActive = quizStep === dotIndex
                  const isCompleted = quizStep > dotIndex || quizStep === 4
                  return (
                    <span
                      key={dotIndex}
                      className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                        isActive || isCompleted ? "bg-[#B8704C]" : "bg-[#D7BFA7]"
                      }`}
                    />
                  )
                })}
              </div>
            </div>

            <div
              className={`transition-all duration-300 ease-out ${
                quizPanelVisible
                  ? "translate-y-0 opacity-100"
                  : quizTransitionDirection === 1
                    ? "translate-y-3 opacity-0"
                    : "-translate-y-3 opacity-0"
              }`}
            >
              {quizStep < 4 ? (
                <div key={`quiz-step-${quizStep}`} className="space-y-6">
                  <h3 className="text-center font-serif text-3xl leading-tight text-[#3A2820] md:text-[2.2rem]">
                    {quizSteps[quizStep].question}
                  </h3>
                  <div
                    className={
                      quizSteps[quizStep].type === "grid"
                        ? "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
                        : "grid grid-cols-1 gap-3 sm:gap-4"
                    }
                  >
                    {quizSteps[quizStep].options.map((option) => {
                      const isSelected = selectedQuizOption === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleQuizAnswer(option.value)}
                          className={`w-full rounded-2xl border px-5 py-4 text-left font-sans text-sm text-[#3A2820] transition-all duration-200 md:px-6 md:py-5 md:text-base ${
                            isSelected
                              ? "translate-y-0 border-[#B8704C] bg-[#B8704C] text-[#FAF7F2]"
                              : "border-[#D7BFA7] bg-[#FAF7F2] hover:-translate-y-0.5 hover:border-[#B8704C]"
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div key="quiz-result" className="rounded-[22px] border border-[#B8704C]/20 bg-[#EFE3D5]/45 p-6 md:p-8">
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#B8704C] md:text-[11px]">
                    YOUR MATCH
                  </p>
                  <h3 className="mt-3 font-serif text-4xl leading-tight text-[#3A2820] md:text-5xl">
                    {getQuizRecommendation()}
                  </h3>
                  <p className="mt-5 font-sans text-sm leading-relaxed text-[#3A2820]/82 md:text-base">
                    {getQuizExplanation()}
                  </p>
                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={scrollToBooking}
                      className="inline-flex items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-6 py-3 font-sans text-[10px] uppercase tracking-[0.25em] text-[#FAF7F2] transition-colors hover:bg-[#B8704C]/85 md:text-[11px]"
                    >
                      Reserve your consultation with Dana
                    </button>
                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="inline-flex items-center justify-center font-sans text-[10px] uppercase tracking-[0.25em] text-[#B8704C] md:text-[11px]"
                    >
                      Take quiz again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-20 md:px-14 lg:px-20" id="studio">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="relative col-span-2 overflow-hidden rounded-[24px] border border-[#B8704C]/18 [aspect-ratio:16/10]">
              <Image
                src={studioImages[0].src}
                alt={studioImages[0].label}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-[24px] border border-[#B8704C]/18 [aspect-ratio:4/5]">
              <Image
                src={studioImages[1].src}
                alt={studioImages[1].label}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 28vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-[24px] border border-[#B8704C]/18 [aspect-ratio:4/5]">
              <Image
                src={studioImages[2].src}
                alt={studioImages[2].label}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 28vw"
              />
            </div>
          </div>

          <div className="self-center rounded-[24px] border border-[#B8704C]/20 bg-[#EFE3D5]/45 p-7 md:p-8">
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              Inside the studio
            </p>
            <h2 className="font-serif text-4xl leading-[1.08] text-[#3A2820] md:text-5xl">Inside the studio</h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-[#3A2820]/80">
              A boutique space designed for privacy, focus, and results. Located in the heart of Brickell.
            </p>
            <p className="mt-6 border-t border-[#B8704C]/20 pt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/65 md:text-[11px]">
              1221 Brickell Ave, Miami, FL - Complimentary garage parking available
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-8 md:px-14 md:py-10 lg:px-20" id="featured-in">
        <div className="mx-auto w-full max-w-6xl text-center">
          <p className="mb-5 font-sans text-[10px] uppercase tracking-[0.32em] text-[#B8704C]/85 md:text-[11px]">
            AS FEATURED IN
          </p>
          <div className="border-y border-[#B8704C]/20 py-4 md:py-5">
            <div className="grid grid-cols-2 gap-3 text-[#6E5648]/70 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
              {featuredInPublications.map((publication) => (
                <p key={publication} className="font-serif text-2xl leading-none md:text-[2rem]">
                  {publication}
                </p>
              ))}
            </div>
          </div>
          <p className="mt-4 font-sans text-[9px] uppercase tracking-[0.26em] text-[#3A2820]/55 md:text-[10px]">
            SAMPLE PLACEMENT - PROTOTYPE
          </p>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-20 md:px-14 lg:px-20" id="transformations">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Transformations
          </p>
          <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Transformations</h2>
          <p className="mt-4 max-w-[48ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
            Real outcomes from Dana&apos;s clients, organized by concern
          </p>

          <div
            className="mt-8 mb-8 flex flex-wrap justify-center gap-2 md:mb-10 md:justify-start"
            role="tablist"
            aria-label="Transformations categories"
          >
            {transformationFilterCategories.map(({ id, label }) => {
              const isActive = activeTransformationCategory === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`transformations-tab-${id}`}
                  aria-selected={isActive}
                  onClick={() => selectTransformationCategory(id)}
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
            className={`grid grid-cols-1 gap-5 transition-opacity duration-500 ease-out sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 md:gap-6 ${
              transformationsGridVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!transformationsGridVisible}
          >
            {visibleTransformationPairs.map((pair) => {
              const percent = cardSplitById[pair.id] ?? 50
              return (
                <article key={pair.id} className="w-full">
                  <div className="relative w-full overflow-hidden rounded-2xl shadow-md shadow-[#3A2820]/12 [aspect-ratio:3/4]">
                    <div
                      className="relative h-full w-full select-none"
                      onMouseMove={(event) =>
                        updateCardSplit(pair.id, event.clientX, event.currentTarget.getBoundingClientRect())
                      }
                    >
                      <Image
                        src={pair.afterImage}
                        alt="After"
                        fill
                        className="pointer-events-none absolute inset-0 z-0 object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <Image
                        src={pair.beforeImage}
                        alt="Before"
                        fill
                        className="pointer-events-none absolute inset-0 z-[1] object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{
                          clipPath: `inset(0 ${100 - percent}% 0 0)`,
                        }}
                      />
                      <span className="pointer-events-none absolute left-4 top-4 z-[2] font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2] drop-shadow">
                        Before
                      </span>
                      <span className="pointer-events-none absolute right-4 top-4 z-[2] font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2] drop-shadow">
                        After
                      </span>
                      <div
                        className="pointer-events-none absolute inset-y-0 z-[3] w-px bg-white/95 shadow-[0_0_10px_rgba(58,40,32,0.35)]"
                        style={{ left: `${percent}%` }}
                      >
                        <span className="absolute left-1/2 top-1/2 block size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white/80" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.22em] text-[#3A2820]/72 md:text-[11px]">
                    {pair.concern} · {pair.treatment}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-20 md:px-14 lg:px-20" id="first-visit-timeline">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            Your first visit
          </p>
          <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Your first visit</h2>
          <p className="mt-4 max-w-[40ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
            Five steps from curiosity to confidence.
          </p>

          <div className="relative mt-12 pl-10 md:pl-0">
            <span className="absolute bottom-0 left-4 top-0 w-px bg-[#D7BFA7] md:hidden" aria-hidden />
            <span className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-[#D7BFA7] md:block" aria-hidden />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
              {firstVisitTimeline.map((step) => {
                const Icon = step.icon
                return (
                  <article
                    key={step.number}
                    className="relative rounded-[22px] border border-[#D7BFA7] bg-[#FAF7F2] p-6 shadow-sm shadow-[#3A2820]/8 transition-transform duration-300 hover:-translate-y-1 md:min-h-[280px]"
                  >
                    <div className="mb-4 inline-flex size-9 items-center justify-center rounded-full border border-[#B8704C]/35 text-[#B8704C]">
                      <Icon size={16} strokeWidth={1.7} />
                    </div>
                    <p className="font-serif text-3xl leading-none text-[#B8704C]/88">{step.number}</p>
                    <h3 className="mt-4 font-serif text-[18px] leading-tight text-[#3A2820] md:text-[22px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-sans text-[14px] leading-relaxed text-[#3A2820]/80">{step.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFE3D5]/58 px-6 py-20 md:px-14 lg:px-20" id="reviews-wall">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
            What clients say
          </p>
          <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">What clients say</h2>
          <p className="mt-4 max-w-[44ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
            Verified reviews from across our channels
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {primaryReviews.map((review) => (
              <article
                key={`${review.name}-${review.date}`}
                className="rounded-[22px] border border-[#D7BFA7] bg-[#FAF7F2] p-6 shadow-sm shadow-[#3A2820]/8"
              >
                <p className="font-sans text-sm tracking-[0.12em] text-[#B8704C]">★★★★★</p>
                <p className="mt-4 font-serif text-2xl leading-relaxed text-[#3A2820] italic">{review.quote}</p>
                <p className="mt-6 font-sans text-sm text-[#3A2820]">{review.name}</p>
                <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-[#3A2820]/52">
                  {review.date}
                </p>
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[#B8704C] md:text-[11px]">
                  {review.treatment}
                </p>
              </article>
            ))}
          </div>

          <div
            id="reviews-extra"
            className={`grid overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out ${
              reviewsExpanded ? "mt-6 max-h-[1200px] opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-3"
            }`}
            aria-hidden={!reviewsExpanded}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {secondaryReviews.map((review) => (
                <article
                  key={`${review.name}-${review.date}`}
                  className="rounded-[22px] border border-[#D7BFA7] bg-[#FAF7F2] p-6 shadow-sm shadow-[#3A2820]/8"
                >
                  <p className="font-sans text-sm tracking-[0.12em] text-[#B8704C]">★★★★★</p>
                  <p className="mt-4 font-serif text-2xl leading-relaxed text-[#3A2820] italic">{review.quote}</p>
                  <p className="mt-6 font-sans text-sm text-[#3A2820]">{review.name}</p>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.12em] text-[#3A2820]/52">
                    {review.date}
                  </p>
                  <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.22em] text-[#B8704C] md:text-[11px]">
                    {review.treatment}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setReviewsExpanded((prev) => !prev)}
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B8704C] transition-opacity hover:opacity-75 md:text-[11px]"
              aria-expanded={reviewsExpanded}
              aria-controls="reviews-extra"
            >
              {reviewsExpanded ? "SHOW LESS ↑" : "VIEW MORE REVIEWS →"}
            </button>
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
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="overflow-hidden rounded-[24px] border border-[#B8704C]/25 bg-[#3A2820]"
              >
                <div className="relative aspect-video">
                  <Image
                    src={testimonial.thumbnail}
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

      <section className="relative h-[70vh] overflow-hidden md:h-[90vh]" id="editorial-closer">
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=85"
          alt="Warm editorial beauty portrait"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#3A2820]/55" />

        <div className="relative z-[1] flex h-full items-center justify-center px-6 text-center md:px-10">
          <div className="mx-auto w-full max-w-[720px]">
            <p className="font-sans text-[12px] uppercase tracking-[0.32em] text-[#E9D2BE]">BEGIN</p>
            <h2 className="mt-4 font-serif text-[40px] leading-[1.1] text-[#FAF7F2] md:text-[64px]">
              Your face deserves a plan, not a menu.
            </h2>
            <p className="mx-auto mt-6 max-w-[540px] font-sans text-base leading-[1.6] text-[#F3E8DC] md:text-[18px]">
              Every protocol at Infinity Beauty Lab is built around your skin, your timeline, and the result you
              actually want. No upselling. No templates. Just Dana, your concerns, and a strategy.
            </p>
            <button
              type="button"
              onClick={scrollToBooking}
              className="mt-9 inline-flex items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-9 py-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#FAF7F2] transition-colors hover:bg-[#B8704C]/85 md:text-[11px]"
            >
              Reserve your consultation
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-7 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-9">
          <span className="h-8 w-px bg-[#E9D2BE]/80" />
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#E9D2BE] md:text-[10px]">CONTINUE</p>
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
