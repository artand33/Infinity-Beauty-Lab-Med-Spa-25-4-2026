"use client"

import { Fragment, type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import {
  Calendar,
  CalendarCheck2,
  ClipboardList,
  Facebook,
  Gift,
  Heart,
  Instagram,
  MapPin,
  Percent,
  Phone,
  ScanFace,
  Sparkles,
  Check,
  X,
} from "lucide-react"

import { Inter } from "next/font/google"
import Hero from "@/components/hero"
import {
  BORDER_CHAMPAGNE,
  ScrollReveal,
  ScrollRevealItem,
  SHADOW_TIER1,
  SHADOW_TIER2,
} from "@/components/scroll-reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const credentialMarks = Inter({ subsets: ["latin"], weight: ["400", "500"] })

const trustItems = ["InMode", "FDA-Cleared", "Top 10% Provider", "Verified Expert"]

const studioInstagramUrl =
  process.env.NEXT_PUBLIC_STUDIO_INSTAGRAM_URL ?? "https://www.instagram.com/"
const studioFacebookUrl =
  process.env.NEXT_PUBLIC_STUDIO_FACEBOOK_URL ?? "https://www.facebook.com/"
const studioWhatsAppUrl =
  process.env.NEXT_PUBLIC_STUDIO_WHATSAPP_URL ?? "https://wa.me/13055550142"

function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

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

type QuizConcern = "texture" | "pigmentation" | "laxity" | "acne-scars"
type QuizAge = "under-30" | "30-40" | "40-50" | "50-plus"
type QuizDowntime = "none" | "day-or-two" | "up-to-week"
type QuizInvestment = "single" | "package" | "membership"

const caseStudies = [
  {
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=88",
    tag: "Texture · Morpheus8",
    headline: "From dull to luminous in six weeks.",
    quote: "I came in skeptical and left a believer.",
    attribution: "Sofía M., 38",
    detail: "Three sessions · 8 weeks · Maintenance ongoing",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=88",
    tag: "Pigmentation · Lumecca IPL",
    headline: "Sun-worn skin, reintroduced to clarity.",
    quote:
      "Three months in and my pigmentation issues from years of Miami sun are visibly lighter. Worth every dollar.",
    attribution: "Daniela T., 44",
    detail: "Two sessions · 10 weeks · Touch-ups as needed",
  },
  {
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=88",
    tag: "Laxity · RF Skin Tightening",
    headline: "Contour that still looks like you.",
    quote: "I came in skeptical about RF and left a believer. The jawline tightening is subtle but it is there.",
    attribution: "Valentina P., 41",
    detail: "Four sessions · 12 weeks · Membership maintenance",
  },
] as const

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
    title: "Skin assessment with Dana Vargova",
    description:
      "Dana Vargova reviews your concerns, examines your skin, and walks you through realistic outcomes for your goals.",
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

const preferredTreatments = [
  "Not sure yet",
  "Morpheus8",
  "Lumecca IPL",
  "RF Skin Tightening",
  "Microneedling",
  "Membership consultation",
]

export default function Page() {
  const [activeBeforeAfterCategory, setActiveBeforeAfterCategory] =
    useState<BeforeAfterCategory>("face")
  const [beforeAfterGridVisible, setBeforeAfterGridVisible] = useState(true)
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
    Object.fromEntries(beforeAfterPairs.map((p) => [p.id, 50])),
  )
  const [danaProfileDrawerOpen, setDanaProfileDrawerOpen] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [bookingStep, setBookingStep] = useState(0)
  const [bookingPanelVisible, setBookingPanelVisible] = useState(true)
  const [bookingTransitionDirection, setBookingTransitionDirection] = useState<1 | -1>(1)
  const [bookingFormData, setBookingFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredTreatment: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })

  const visibleBeforeAfterPairs = beforeAfterPairs.filter(
    (p) => p.category === activeBeforeAfterCategory,
  )
  const supportingReviews = reviews.slice(0, 3)

  useEffect(() => {
    if (!bookingModalOpen && !danaProfileDrawerOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBookingModalOpen(false)
        setDanaProfileDrawerOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [bookingModalOpen, danaProfileDrawerOpen])

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

  const openBookingModal = () => {
    setDanaProfileDrawerOpen(false)
    setBookingStep(0)
    setBookingPanelVisible(true)
    setBookingTransitionDirection(1)
    setBookingSubmitted(false)
    setBookingFormData({
      fullName: "",
      email: "",
      phone: "",
      preferredTreatment: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    })
    setBookingModalOpen(true)
  }

  const closeBookingModal = () => {
    setBookingModalOpen(false)
  }

  const handleBookingFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setBookingFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBookingSubmitted(true)
  }

  const transitionToBookingStep = (nextStep: number, direction: 1 | -1 = 1) => {
    setBookingTransitionDirection(direction)
    setBookingPanelVisible(false)
    window.setTimeout(() => {
      setBookingStep(nextStep)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setBookingPanelVisible(true))
      })
    }, 200)
  }

  const handleBookingContinue = () => {
    if (bookingStep === 0) {
      transitionToBookingStep(1, 1)
      return
    }
    if (bookingStep === 1) {
      transitionToBookingStep(2, 1)
    }
  }

  const handleBookingBack = () => {
    if (bookingStep === 0) return
    transitionToBookingStep(bookingStep - 1, -1)
  }

  const isBookingStepOneComplete = bookingFormData.preferredTreatment.trim() !== ""
  const isBookingStepTwoComplete =
    bookingFormData.fullName.trim() !== "" &&
    bookingFormData.email.trim() !== "" &&
    bookingFormData.phone.trim() !== ""

  const updateCardSplit = (id: string, clientX: number, cardRect: DOMRect) => {
    const mouseX = clientX - cardRect.left
    const percent = (mouseX / cardRect.width) * 100
    const clamped = Math.max(0, Math.min(100, percent))
    setCardSplitById((prev) => ({ ...prev, [id]: clamped }))
  }

  return (
    <main className="relative z-[2] bg-transparent text-[#3A2820]">
      <Hero
        onOpenBookingModal={openBookingModal}
        onOpenAboutDrawer={() => setDanaProfileDrawerOpen(true)}
      />

      <section className="border-y border-[#B8704C]/15 bg-[#EFE3D5] px-6 py-8 md:px-14 lg:px-20">
        <ScrollReveal as="div" className="mx-auto w-full max-w-6xl">
          <ScrollRevealItem order={0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4 md:gap-6">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className={`rounded-full border ${BORDER_CHAMPAGNE} bg-[#FAF7F2]/50 px-5 py-2 text-center font-sans text-[10px] uppercase tracking-[0.28em] text-[#3A2820]/85 md:px-7 md:py-3 md:text-[11px]`}
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="before-after">
        <ScrollReveal as="div" className="mx-auto w-full max-w-6xl">
          <ScrollRevealItem order={0}>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              Before &amp; After
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem order={1}>
            <h2
              id="results"
              className="mb-8 font-serif text-4xl leading-[1.06] text-[#3A2820] md:mb-10 md:text-5xl"
            >
              Real Results, Naturally Refined
            </h2>
          </ScrollRevealItem>

          <ScrollRevealItem order={2}>
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
                        : `border ${BORDER_CHAMPAGNE} bg-[#FAF7F2]/60 text-[#3A2820]`
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
                  className={`relative w-full max-w-sm justify-self-center overflow-hidden rounded-2xl ${SHADOW_TIER2} [aspect-ratio:3/4] sm:max-w-none`}
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
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="bg-[#EFE3D5]/65 px-6 py-20 md:px-14 lg:px-20">
        <ScrollReveal as="div" className="mx-auto w-full max-w-6xl">
          <ScrollRevealItem order={0}>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              Treatments
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem order={1}>
            <h2 className="mb-10 font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">
              Precision Protocols for Signature Skin
            </h2>
          </ScrollRevealItem>
          <ScrollRevealItem order={2}>
            <div className="grid gap-6 md:grid-cols-3">
              {treatments.map((treatment) => (
                <article
                  key={treatment.title}
                  className={`rounded-[26px] border border-[#B8704C]/20 bg-[#FAF7F2]/80 p-7 ${SHADOW_TIER2} md:p-8`}
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
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="about">
        <ScrollReveal
          as="div"
          className={`mx-auto grid w-full max-w-6xl items-center gap-10 rounded-[30px] border ${BORDER_CHAMPAGNE} bg-[#FAF7F2]/60 p-6 md:p-10 lg:grid-cols-2`}
        >
          <ScrollRevealItem
            order={4}
            className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-[22px] border border-[#B8704C]/20 lg:order-none"
          >
            <div className="relative h-full w-full">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
                alt="Dana Vargova, founder of Infinity Beauty Lab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </ScrollRevealItem>
          <div className="min-w-0">
            <ScrollRevealItem order={0}>
              <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
                Meet Dana
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={1}>
              <h2 className="font-serif text-4xl leading-[1.08] text-[#3A2820] md:text-5xl">
                Founder-Led Care With Clinical Precision
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem order={2}>
              <p className="mt-6 font-sans text-base leading-relaxed text-[#3A2820]/80">
                Dana Vargova combines evidence-based aesthetic medicine with a boutique, high-touch approach designed for
                natural-looking outcomes. Every treatment plan is created for your skin, your schedule, and your long
                term goals.
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={3}>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "InMode Verified Expert",
                  "Top 10% Morpheus8 Provider",
                  "First in Miami with Optimas Max",
                  "10+ Years Aesthetic Medicine",
                ].map((credential) => (
                  <p
                    key={credential}
                    className={`rounded-xl border ${BORDER_CHAMPAGNE} bg-[#EFE3D5]/45 px-4 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/85`}
                  >
                    {credential}
                  </p>
                ))}
              </div>
            </ScrollRevealItem>
            <ScrollRevealItem order={4}>
              <button
                type="button"
                onClick={() => setDanaProfileDrawerOpen(true)}
                className="mt-8 inline-block font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8704C] transition-colors hover:text-[#3A2820] md:text-[11px]"
              >
                View extended profile
              </button>
            </ScrollRevealItem>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="treatments">
        <div className="mx-auto w-full max-w-6xl">
          <ScrollReveal as="div">
            <ScrollRevealItem order={0}>
              <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
                Treatments Deep Dive
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={1}>
              <h2 className="mb-10 font-serif text-4xl leading-[1.06] text-[#3A2820] md:mb-12 md:text-5xl">
                Advanced Protocols, Personalized for You
              </h2>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="divide-y divide-[#B8704C]/18 border-y border-[#B8704C]/18">
            {treatmentDetails.map((treatment, index) => {
              const imageFirst = index % 2 === 0
              return (
                <ScrollReveal
                  as="article"
                  key={treatment.name}
                  className="grid items-center gap-8 py-10 md:gap-10 md:py-12 lg:grid-cols-2 lg:gap-12"
                >
                  <ScrollRevealItem
                    order={4}
                    className={`relative aspect-[5/4] overflow-hidden rounded-[24px] border border-[#B8704C]/20 ${SHADOW_TIER2} ${
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={treatment.image}
                        alt={treatment.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </ScrollRevealItem>

                  <div className={imageFirst ? "min-w-0 lg:order-2" : "min-w-0 lg:order-1"}>
                    <ScrollRevealItem order={0}>
                      <h3 className="font-serif text-4xl leading-tight text-[#3A2820] md:text-[2.6rem]">
                        {treatment.name}
                      </h3>
                    </ScrollRevealItem>
                    <ScrollRevealItem order={1}>
                      <p className="mt-5 max-w-[52ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
                        {treatment.description}
                      </p>
                    </ScrollRevealItem>
                    <ScrollRevealItem order={2}>
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
                    </ScrollRevealItem>
                    <ScrollRevealItem order={3}>
                      <button
                        type="button"
                        onClick={openBookingModal}
                        className="mt-7 inline-block font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8704C] md:text-[11px]"
                      >
                        Reserve this treatment
                      </button>
                    </ScrollRevealItem>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#EFE3D5]/65 px-6 py-20 md:px-14 lg:px-20" id="investment">
        <ScrollReveal as="div" className="mx-auto w-full max-w-6xl">
          <ScrollRevealItem order={0}>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              Investment
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem order={1}>
            <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Investment</h2>
          </ScrollRevealItem>
          <ScrollRevealItem order={2}>
            <p className="mt-4 max-w-[42ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
              Transparent pricing, no surprises
            </p>
          </ScrollRevealItem>

          <ScrollRevealItem order={3}>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {investmentOptions.map((option) => (
                <article
                  key={option.title}
                  className={`rounded-[24px] bg-[#FAF7F2]/80 p-7 md:p-8 ${
                    option.featured
                      ? `border-2 border-[#B8704C]/70 ${SHADOW_TIER1}`
                      : `border ${BORDER_CHAMPAGNE} shadow-none`
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
          </ScrollRevealItem>

          <ScrollRevealItem order={4}>
            <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/60 md:text-[11px]">
              Final pricing determined at consultation
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="bg-[#F7F1E8]/80 px-6 py-20 md:px-14 lg:px-20" id="membership">
        <ScrollReveal as="div" className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-12">
          <div className="self-center">
            <ScrollRevealItem order={0}>
              <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
                MEMBERSHIP
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={1}>
              <h2 className="font-serif text-4xl leading-[1.08] text-[#3A2820] md:text-5xl">
                Made for clients who treat their skin like an investment.
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem order={2}>
              <p className="mt-6 font-sans text-base leading-relaxed text-[#3A2820]/80">
                The Infinity membership turns one-off visits into a long-term relationship with your skin. Priority
                access, monthly upkeep, and the kind of pricing that only makes sense if you&apos;re serious about
                results.
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={3}>
              <button
                type="button"
                onClick={openBookingModal}
                className="mt-7 inline-flex items-center font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8704C] md:text-[11px]"
              >
                Become a member →
              </button>
            </ScrollRevealItem>
          </div>

          <ScrollRevealItem order={4} className="min-w-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {membershipPerks.map((perk) => {
                const Icon = perk.icon
                return (
                  <article
                    key={perk.title}
                    className={`rounded-[18px] border border-[#D7BFA7] bg-[#FAF7F2]/80 p-5 ${SHADOW_TIER2} transition-transform duration-200 hover:-translate-y-0.5`}
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
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="find-your-treatment">
        <ScrollReveal as="div" className="mx-auto w-full max-w-6xl">
          <ScrollRevealItem order={0}>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              Find your treatment
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem order={1}>
            <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Find your treatment</h2>
          </ScrollRevealItem>
          <ScrollRevealItem order={2}>
            <p className="mt-4 max-w-[46ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
              Answer four questions and we&apos;ll match you with the right protocol.
            </p>
          </ScrollRevealItem>

          <ScrollRevealItem order={3}>
            <div
              className={`mx-auto mt-10 w-full max-w-[720px] rounded-[28px] border border-[#D7BFA7] bg-[#FAF7F2]/80 p-6 ${SHADOW_TIER1} md:p-9`}
            >
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
                      onClick={openBookingModal}
                      className="inline-flex items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-6 py-3 font-sans text-[10px] uppercase tracking-[0.25em] text-[#FAF7F2] transition-colors hover:bg-[#B8704C]/85 md:text-[11px]"
                    >
                      Book this match
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
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="studio">
        <ScrollReveal as="div" className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <ScrollRevealItem order={0} className="min-w-0">
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
          </ScrollRevealItem>

          <ScrollRevealItem order={1} className="min-w-0 self-center">
            <div className="rounded-[24px] border border-[#B8704C]/20 bg-[#EFE3D5]/45 p-7 md:p-8">
              <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
                Inside the studio
              </p>
              <h2 className="font-serif text-4xl leading-[1.08] text-[#3A2820] md:text-5xl">Inside the studio</h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-[#3A2820]/80">
                A boutique space designed for privacy, focus, and results. Located in the heart of Brickell.
              </p>
              <p className="mt-6 border-t border-[#B8704C]/20 pt-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[#3A2820]/65 md:text-[11px]">
                40 SW 13th St, Suite 606, Miami, FL 33130 - Complimentary garage parking available
              </p>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="case-studies">
        <ScrollReveal as="div" className="mx-auto w-full max-w-6xl">
          <ScrollRevealItem order={0}>
            <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Case studies</h2>
          </ScrollRevealItem>
          <ScrollRevealItem order={1}>
            <p className="mb-10 mt-2 max-w-[40ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:mb-12 md:mt-3 md:text-base">
              Three transformations, examined.
            </p>
          </ScrollRevealItem>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
            {caseStudies.map((cs, idx) => (
              <ScrollRevealItem key={cs.headline} order={2 + idx} className="min-w-0">
                <article className="flex flex-col">
                  <div className="relative w-full overflow-hidden rounded-[20px] border border-[#B8704C]/15 [aspect-ratio:3/4]">
                    <Image
                      src={cs.image}
                      alt={cs.headline}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mt-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#B8704C] md:text-[10px]">
                    {cs.tag}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.5rem] leading-snug text-[#3A2820] md:text-[1.75rem]">
                    {cs.headline}
                  </h3>
                  <p className="mt-4 font-serif text-base italic leading-relaxed text-[#3A2820]/90 md:text-[1.05rem]">
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <p className="mt-3 font-sans text-[12px] text-[#3A2820]/70 md:text-sm">{cs.attribution}</p>
                  <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.12em] text-[#3A2820]/50 md:text-[11px]">
                    {cs.detail}
                  </p>
                </article>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section
        className="border-t border-[#B8704C]/12 bg-[#EFE3D5]/25 px-6 py-20 md:px-14 lg:px-20"
        id="in-their-own-words"
        aria-label="Client proof"
      >
        <div className="mx-auto w-full max-w-6xl">
          <ScrollReveal as="div">
            <ScrollRevealItem order={0}>
              <h2 className="text-center font-serif text-4xl leading-[1.08] text-[#3A2820] md:text-5xl">
                In their own words
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem order={1}>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.name}
                    className={`overflow-hidden rounded-[24px] border border-[#B8704C]/25 bg-[#3A2820] ${SHADOW_TIER1}`}
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
                      <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.45)]"
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                        <span
                          className="grid size-14 place-items-center rounded-full border border-white/35 bg-white/95 text-[#3A2820] shadow-[0_4px_20px_rgba(0,0,0,0.22)]"
                          aria-hidden
                        >
                          ▶
                        </span>
                        <span className="text-center font-sans text-[10px] font-medium tracking-[0.15em] text-white [font-variant-caps:all-small-caps]">
                          WATCH STORY
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
            </ScrollRevealItem>

            <ScrollRevealItem order={2}>
              <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                {supportingReviews.map((review) => (
                  <article
                    key={`${review.name}-${review.date}`}
                    className={`rounded-[18px] border ${BORDER_CHAMPAGNE} bg-[#FAF7F2]/50 p-4 shadow-none md:p-5`}
                  >
                    <p className="mb-1 font-sans text-[9px] tracking-[0.1em] text-[#B8704C]">★★★★★</p>
                    <p className="font-serif text-base italic leading-relaxed text-[#3A2820] md:text-base">
                      {review.quote}
                    </p>
                    <p className="mt-3 font-sans text-xs text-[#3A2820] md:text-sm">{review.name}</p>
                    <p className="mt-0.5 font-sans text-[10px] text-[#3A2820]/50">{review.treatment}</p>
                  </article>
                ))}
              </div>
            </ScrollRevealItem>

            <ScrollRevealItem order={3}>
              <div className={`mt-12 md:mt-14 ${credentialMarks.className}`}>
                <div className="mx-auto flex max-w-md items-center gap-3 md:max-w-lg">
                  <span className="h-px min-w-0 flex-1 bg-[#B8704C]/35" aria-hidden />
                  <span className="shrink-0 text-center text-[10px] font-medium tracking-[0.14em] text-[#B8704C] [font-variant-caps:all-small-caps] md:text-[11px]">
                    RECOGNIZED BY
                  </span>
                  <span className="h-px min-w-0 flex-1 bg-[#B8704C]/35" aria-hidden />
                </div>
                <p className="mx-auto mt-5 max-w-4xl text-center text-[11px] font-medium leading-relaxed tracking-[0.1em] text-[#3A2820]/45 [font-variant-caps:all-small-caps]">
                  <span>InMode Verified Expert</span>
                  <span className="mx-2 text-[#3A2820]/35">·</span>
                  <span>Top 10% Provider 2024</span>
                  <span className="mx-2 text-[#3A2820]/35">·</span>
                  <span>FDA-Cleared Technology</span>
                  <span className="mx-2 text-[#3A2820]/35">·</span>
                  <span>Morpheus8 QUEEN</span>
                </p>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="faq">
        <ScrollReveal as="div" className="mx-auto w-full max-w-4xl">
          <ScrollRevealItem order={0}>
            <p className="mb-4 text-center font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              FAQ
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem order={1}>
            <h2 className="mb-10 text-center font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">
              Everything You Need Before You Book
            </h2>
          </ScrollRevealItem>
          <ScrollRevealItem order={2}>
            <div className={`rounded-[26px] border ${BORDER_CHAMPAGNE} bg-[#FAF7F2]/60 px-6 py-3 shadow-none md:px-8`}>
            <Accordion type="single" collapsible>
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${idx}`}
                  className="border-b border-[#C9A68E]/30 shadow-none last:border-b-0"
                >
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
          </ScrollRevealItem>
        </ScrollReveal>
      </section>

      <section className="px-6 py-20 md:px-14 lg:px-20" id="first-visit-timeline">
        <ScrollReveal as="div" className="mx-auto w-full max-w-6xl">
          <ScrollRevealItem order={0}>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
              Your first visit
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem order={1}>
            <h2 className="font-serif text-4xl leading-[1.06] text-[#3A2820] md:text-5xl">Your first visit</h2>
          </ScrollRevealItem>
          <ScrollRevealItem order={2}>
            <p className="mt-4 max-w-[40ch] font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
              Five steps from curiosity to confidence.
            </p>
          </ScrollRevealItem>

          <div className="relative mt-12 pl-10 md:pl-0">
            <span className="absolute bottom-0 left-4 top-0 w-px bg-[#D7BFA7] md:hidden" aria-hidden />
            <span className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-[#D7BFA7] md:block" aria-hidden />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
              {firstVisitTimeline.map((step, i) => {
                const Icon = step.icon
                return (
                  <ScrollRevealItem key={step.number} order={3 + i} className="min-w-0">
                    <article
                      className={`relative rounded-[22px] border border-[#D7BFA7] bg-[#FAF7F2]/80 p-6 ${SHADOW_TIER2} transition-transform duration-300 hover:-translate-y-1 md:min-h-[280px]`}
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
                  </ScrollRevealItem>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="relative h-[70vh] overflow-hidden md:h-[90vh]" id="editorial-closer" aria-label="Editorial feature">
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=85"
          alt="Warm editorial beauty portrait"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#3A2820]/55" />

        <ScrollReveal
          as="div"
          className="relative z-[2] flex h-full items-center justify-center px-6 text-center md:px-10"
        >
          <div className="mx-auto w-full max-w-[720px]">
            <ScrollRevealItem order={0}>
              <p className="font-sans text-[12px] uppercase tracking-[0.32em] text-[#E9D2BE]">BEGIN</p>
            </ScrollRevealItem>
            <ScrollRevealItem order={1}>
              <h2 className="mt-4 font-serif text-[40px] leading-[1.1] text-[#FAF7F2] md:text-[64px]">
                Your face deserves a plan, not a menu.
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem order={2}>
              <p className="mx-auto mt-6 max-w-[540px] font-sans text-base leading-[1.6] text-[#F3E8DC] md:text-[18px]">
                Every protocol at Infinity Beauty Lab is built around your skin, your timeline, and the result you
                actually want. No upselling. No templates. Just Dana, your concerns, and a strategy.
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={3}>
              <button
                type="button"
                onClick={openBookingModal}
                className={`mt-9 inline-flex items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-9 py-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#FAF7F2] ${SHADOW_TIER1} transition-colors hover:bg-[#B8704C]/85 md:text-[11px]`}
              >
                Reserve your consultation
              </button>
            </ScrollRevealItem>
          </div>
        </ScrollReveal>

        <div className="pointer-events-none absolute bottom-7 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-9">
          <span className="h-8 w-px bg-[#E9D2BE]/80" />
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#E9D2BE] md:text-[10px]">CONTINUE</p>
        </div>
      </section>

      <section className="relative z-[2] border-t border-[#B8704C]/20 bg-[#3A2820] px-6 py-20 text-[#FAF7F2] md:px-14 lg:px-20" id="book">
        <ScrollReveal as="div" className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <ScrollRevealItem order={0}>
              <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-[#D4956F] md:text-[11px]">
                Book Your Visit
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={1}>
              <h2 className="max-w-[14ch] font-serif text-4xl leading-[1.08] md:text-5xl">
                Start Your Personalized Skin Plan
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem order={2}>
              <p className="mt-6 max-w-[44ch] font-sans text-sm leading-relaxed text-[#FAF7F2]/70 md:text-base">
                Reserve a consultation and receive a tailored treatment roadmap based on your goals, skin condition,
                and lifestyle.
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem order={3}>
              <button
                type="button"
                onClick={openBookingModal}
                className="mt-8 inline-block border border-[#D4956F]/40 bg-[#B8704C] px-8 py-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#FAF7F2] transition-colors hover:bg-[#B8704C]/85 md:text-[11px]"
              >
                Reserve Your Consultation
              </button>
            </ScrollRevealItem>
          </div>

          <ScrollRevealItem order={4} className="min-w-0">
            <div className="space-y-6 rounded-[24px] border border-[#D4956F]/30 bg-[#FAF7F2]/5 p-6 md:p-7">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4956F] md:text-[11px]">Address</p>
              <p className="mt-2 font-serif text-2xl text-[#FAF7F2]">40 SW 13th St, Suite 606, Miami, FL 33130</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4956F] md:text-[11px]">Hours</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#FAF7F2]/80">
                Mon-Fri 9:00AM-6:00PM
                <br />
                Saturday 10:00AM-3:00PM
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4956F] md:text-[11px]">Phone</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#FAF7F2]/80">
                <a
                  href="tel:+15612320263"
                  className="text-[#FAF7F2]/90 transition-colors hover:text-[#E9D2BE]"
                >
                  (561) 232-0263
                </a>
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4956F] md:text-[11px]">Follow</p>
              <div className="mt-3 flex items-center gap-5">
                <a
                  href={studioInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF7F2]/65 transition-colors hover:text-[#E9D2BE]"
                  aria-label="Infinity Beauty Lab on Instagram"
                >
                  <Instagram className="size-[18px]" strokeWidth={1.35} aria-hidden="true" />
                </a>
                <a
                  href={studioFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF7F2]/65 transition-colors hover:text-[#E9D2BE]"
                  aria-label="Infinity Beauty Lab on Facebook"
                >
                  <Facebook className="size-[18px]" strokeWidth={1.35} aria-hidden="true" />
                </a>
                <a
                  href={studioWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF7F2]/65 transition-colors hover:text-[#E9D2BE]"
                  aria-label="Message Infinity Beauty Lab on WhatsApp"
                >
                  <WhatsappGlyph className="size-[18px]" />
                </a>
              </div>
            </div>
            <div className="relative w-full min-h-[200px] overflow-hidden rounded-[12px] border border-[#D4956F]/30 aspect-[4/3]">
              <iframe
                title="Infinity Beauty Lab — 1221 Brickell Ave, Miami on Google Maps"
                src="https://www.google.com/maps?q=1221+Brickell+Ave,+Miami,+FL+33131&z=16&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        <footer className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-4 border-t border-[#D4956F]/25 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-xl text-[#FAF7F2]">Infinity Beauty Lab</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#FAF7F2]/60 md:text-[11px]">
            Medical Aesthetics in Brickell - Miami
          </p>
        </footer>
      </section>

      <div
        className={`fixed inset-0 z-[65] flex justify-end ${danaProfileDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!danaProfileDrawerOpen}
      >
        <div
          className={`absolute inset-0 bg-[rgba(0,0,0,0.4)] transition-opacity duration-[350ms] ease-out ${
            danaProfileDrawerOpen ? "opacity-100" : "opacity-0"
          } ${danaProfileDrawerOpen ? "" : "pointer-events-none"}`}
          aria-hidden="true"
          onClick={() => setDanaProfileDrawerOpen(false)}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="dana-drawer-title"
          className={`relative z-[66] flex h-full w-[100vw] max-w-[100vw] flex-col bg-[#FAF7F2] shadow-xl transition-transform duration-[350ms] ease-out md:w-[480px] md:max-w-[480px] ${
            danaProfileDrawerOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={() => setDanaProfileDrawerOpen(false)}
            className="absolute right-4 top-4 z-20 inline-flex size-9 items-center justify-center rounded-full bg-[#FAF7F2]/95 text-[#B8704C] shadow-sm transition-colors hover:text-[#3A2820]"
            aria-label="Close Dana profile"
          >
            <X className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            <div className="relative h-[280px] w-full shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
                alt="Dana Vargova, founder of Infinity Beauty Lab"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
            <div className="px-6 pb-6 pt-8">
              <h2 id="dana-drawer-title" className="font-serif text-[32px] leading-tight text-[#3A2820]">
                Dana Vargova
              </h2>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.35em] text-[#B8704C]">
                Founder & CEO · Infinity Beauty Lab
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  "InMode Verified Expert",
                  "Top 10% Morpheus8 Provider",
                  "First in Miami with Optimas Max",
                  "Morpheus8 QUEEN",
                ].map((credential) => (
                  <p
                    key={credential}
                    className={`rounded-xl border ${BORDER_CHAMPAGNE} bg-[#EFE3D5]/45 px-3 py-3 font-sans text-[10px] uppercase leading-snug tracking-[0.2em] text-[#3A2820]/85`}
                  >
                    {credential}
                  </p>
                ))}
              </div>
              <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
                The Story
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
                Dana Vargova began her career in European medicine — training in anesthesiology, emergency medicine, and
                critical care. That clinical foundation is what separates her approach: she understands anatomy, not just
                technique.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
                After relocating to Miami, she founded Infinity Beauty Lab in Brickell with one conviction — that
                medical-grade results and boutique care are not mutually exclusive. Every treatment is performed personally
                by Dana. No junior staff, no delegated care.
              </p>
              <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.35em] text-[#B8704C] md:text-[11px]">
                Beyond the Studio
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#3A2820]/80 md:text-base">
                Dana actively supports Angels for Humanity, the WIN Foundation, and the Cala Foundation — focused on
                medical care for underserved children, trauma recovery, and emotional wellness.
              </p>
            </div>
            <div className="mt-auto border-t border-[#B8704C]/20 px-6 pb-8 pt-4">
              <div className="flex flex-col gap-2 font-sans text-xs text-[#B8704C]">
                <a href="tel:+15612320263" className="inline-flex items-center gap-2 transition-colors hover:text-[#3A2820]">
                  <Phone className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span>(561) 232-0263</span>
                </a>
                <a
                  href="https://instagram.com/infinity.beauty.lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#3A2820]"
                >
                  <Instagram className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span>@infinity.beauty.lab</span>
                </a>
                <p className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span>40 SW 13th St, Suite 606 · Miami, FL</span>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div
        className={`fixed inset-0 z-[70] bg-[#3A2820]/60 transition-opacity duration-[220ms] ease-out ${
          bookingModalOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!bookingModalOpen}
        onClick={closeBookingModal}
      >
        <div className="relative z-[80] flex h-full items-center justify-center p-6">
          <div
            className={`relative my-auto flex max-h-[min(92vh,920px)] w-[94%] flex-col overflow-hidden rounded-[18px] bg-[#FAF7F2] p-6 ${SHADOW_TIER1} transition-all duration-[220ms] ease-out md:w-full md:max-w-[min(92vw,760px)] md:p-10 lg:max-w-[820px] ${
              bookingModalOpen ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Reserve your consultation"
          >
            <div className="mb-5 w-full shrink-0 pr-7">
              <div className="flex w-full gap-1" aria-label="Booking progress">
                {[0, 1, 2].map((segmentIndex) => {
                  const isBronze = bookingSubmitted || segmentIndex <= bookingStep
                  return (
                    <div
                      key={segmentIndex}
                      className={`h-[3px] min-h-0 flex-1 rounded-full transition-colors duration-300 ${
                        isBronze ? "bg-[#B8704C]" : "bg-[#EFE3D5]"
                      }`}
                    />
                  )
                })}
              </div>
              <button
                type="button"
                onClick={closeBookingModal}
                className="absolute right-4 top-4 inline-flex size-8 items-center justify-center text-[#B8704C]"
                aria-label="Close booking modal"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            {!bookingSubmitted ? (
              <Fragment>
                <div
                  className={`min-h-0 flex-1 overflow-y-auto overscroll-contain transition-all duration-300 ease-out ${
                    bookingPanelVisible
                      ? "translate-x-0 opacity-100"
                      : bookingTransitionDirection === 1
                        ? "-translate-x-4 opacity-0"
                        : "translate-x-4 opacity-0"
                  }`}
                >
                  {bookingStep === 0 ? (
                    <div>
                      <h3 className="font-serif text-3xl text-[#3A2820] md:text-[2.35rem]">
                        Reserve your consultation
                      </h3>
                      <p
                        className="mt-2 font-sans text-[12px] italic leading-relaxed"
                        style={{ color: "rgba(58, 40, 32, 0.55)" }}
                      >
                        No commitment required — we&apos;ll confirm by phone.
                      </p>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-[#3A2820]/70 md:text-base">
                        Step 1 of 3 — choose the treatment you have in mind. We&apos;ll confirm scheduling after we
                        reach you.
                      </p>

                      <div className="mt-8" role="group" aria-label="Preferred treatment">
                        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#B8704C] md:text-[11px]">
                          Treatment
                        </p>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {preferredTreatments.map((treatment) => {
                            const isSelected = bookingFormData.preferredTreatment === treatment
                            return (
                              <button
                                key={treatment}
                                type="button"
                                onClick={() =>
                                  setBookingFormData((prev) => ({
                                    ...prev,
                                    preferredTreatment: treatment,
                                  }))
                                }
                                className={`min-h-[56px] rounded-xl border px-4 py-3 text-left font-sans text-sm leading-snug transition-colors md:min-h-[60px] md:text-[15px] md:leading-snug ${
                                  isSelected
                                    ? "border-[#B8704C] bg-[#B8704C] text-[#FAF7F2]"
                                    : "border-[#D7BFA7] bg-white text-[#3A2820] hover:border-[#B8704C]/55"
                                }`}
                              >
                                {treatment}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleBookingContinue}
                        disabled={!isBookingStepOneComplete}
                        className="mt-8 inline-flex min-h-[56px] w-full items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-6 font-sans text-[10px] uppercase tracking-[0.25em] text-[#FAF7F2] transition-colors enabled:hover:bg-[#B8704C]/85 disabled:cursor-not-allowed disabled:opacity-45 md:mt-10 md:text-[11px]"
                      >
                        Continue
                      </button>
                    </div>
                  ) : null}

                {bookingStep === 1 ? (
                  <div>
                    <h3 className="font-serif text-3xl text-[#3A2820] md:text-[2.2rem]">Almost there</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#3A2820]/70 md:text-base">
                      Step 2 of 3 - how can we reach you
                    </p>

                    <div className="mt-6 space-y-4">
                      <input
                        type="text"
                        name="fullName"
                        value={bookingFormData.fullName}
                        onChange={handleBookingFieldChange}
                        placeholder="Full name"
                        className="h-[52px] w-full rounded-xl border border-[#D7BFA7] bg-white px-4 font-sans text-sm text-[#3A2820] outline-none transition-colors focus:border-[#B8704C]"
                      />
                      <input
                        type="email"
                        name="email"
                        value={bookingFormData.email}
                        onChange={handleBookingFieldChange}
                        placeholder="Email"
                        className="h-[52px] w-full rounded-xl border border-[#D7BFA7] bg-white px-4 font-sans text-sm text-[#3A2820] outline-none transition-colors focus:border-[#B8704C]"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={bookingFormData.phone}
                        onChange={handleBookingFieldChange}
                        placeholder="Phone"
                        className="h-[52px] w-full rounded-xl border border-[#D7BFA7] bg-white px-4 font-sans text-sm text-[#3A2820] outline-none transition-colors focus:border-[#B8704C]"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handleBookingBack}
                        className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#B8704C] md:text-[11px]"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleBookingContinue}
                        disabled={!isBookingStepTwoComplete}
                        className="inline-flex h-[50px] items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-6 font-sans text-[10px] uppercase tracking-[0.25em] text-[#FAF7F2] transition-colors enabled:hover:bg-[#B8704C]/85 disabled:cursor-not-allowed disabled:opacity-45 md:text-[11px]"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : null}

                {bookingStep === 2 ? (
                  <form onSubmit={handleBookingSubmit}>
                    <h3 className="font-serif text-3xl text-[#3A2820] md:text-[2.2rem]">Confirm your reservation</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-[#3A2820]/70 md:text-base">
                      Step 3 of 3 - review and submit
                    </p>

                    <div className="mt-6 rounded-2xl border border-[#D7BFA7] bg-[#EFE3D5]/45 p-4">
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B8704C] md:text-[11px]">
                        Reservation details
                      </p>
                      <dl className="mt-3 space-y-2 font-sans text-sm text-[#3A2820]/85">
                        <div className="flex justify-between gap-4">
                          <dt>Treatment:</dt>
                          <dd className="text-right">{bookingFormData.preferredTreatment}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt>Name:</dt>
                          <dd className="text-right">{bookingFormData.fullName}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt>Email:</dt>
                          <dd className="text-right">{bookingFormData.email}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt>Phone:</dt>
                          <dd className="text-right">{bookingFormData.phone}</dd>
                        </div>
                      </dl>
                    </div>

                    <label className="mt-4 block">
                      <span className="font-sans text-xs text-[#3A2820]/70">
                        Anything you&apos;d like Dana to know? (optional)
                      </span>
                      <textarea
                        name="message"
                        value={bookingFormData.message}
                        onChange={handleBookingFieldChange}
                        rows={4}
                        className="mt-2 w-full rounded-xl border border-[#D7BFA7] bg-white px-4 py-3 font-sans text-sm text-[#3A2820] outline-none transition-colors focus:border-[#B8704C]"
                      />
                    </label>

                    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <button
                        type="button"
                        onClick={handleBookingBack}
                        className="self-start font-sans text-[10px] uppercase tracking-[0.24em] text-[#B8704C] md:text-[11px]"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="inline-flex h-[50px] w-full items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-6 font-sans text-[10px] uppercase tracking-[0.25em] text-[#FAF7F2] transition-colors hover:bg-[#B8704C]/85 md:w-auto md:text-[11px]"
                      >
                        Reserve consultation
                      </button>
                    </div>

                    <p className="mt-3 font-sans text-[11px] leading-relaxed text-[#3A2820]/65">
                      By submitting, you agree to be contacted by Infinity Beauty Lab regarding your appointment.
                    </p>
                  </form>
                ) : null}
                </div>
                <div className="flex shrink-0 items-center justify-center gap-5 border-t border-[#D7BFA7]/40 pt-4 pb-1">
                  <a
                    href={studioInstagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A2820]/50 transition-colors hover:text-[#B8704C]"
                    aria-label="Infinity Beauty Lab on Instagram"
                  >
                    <Instagram className="size-[18px]" strokeWidth={1.35} aria-hidden="true" />
                  </a>
                  <a
                    href={studioFacebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A2820]/50 transition-colors hover:text-[#B8704C]"
                    aria-label="Infinity Beauty Lab on Facebook"
                  >
                    <Facebook className="size-[18px]" strokeWidth={1.35} aria-hidden="true" />
                  </a>
                  <a
                    href={studioWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A2820]/50 transition-colors hover:text-[#B8704C]"
                    aria-label="Message Infinity Beauty Lab on WhatsApp"
                  >
                    <WhatsappGlyph className="size-[18px]" />
                  </a>
                </div>
              </Fragment>
            ) : (
              <div className="overflow-y-auto py-2 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full border border-[#B8704C]/40 text-[#B8704C]">
                  <Check size={20} strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 font-serif text-3xl text-[#3A2820] md:text-[2.1rem]">Reservation received</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#3A2820]/75 md:text-base">
                  Dana will personally confirm your appointment within the hour. Watch for a message from (305)
                  555-0188.
                </p>
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="mt-8 inline-flex h-[50px] items-center justify-center border border-[#D4956F]/40 bg-[#B8704C] px-7 font-sans text-[10px] uppercase tracking-[0.25em] text-[#FAF7F2] transition-colors hover:bg-[#B8704C]/85 md:text-[11px]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
