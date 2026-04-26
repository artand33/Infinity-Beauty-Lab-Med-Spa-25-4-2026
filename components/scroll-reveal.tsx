"use client"

import { cn } from "@/lib/utils"
import {
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type MutableRefObject,
  type ReactNode,
} from "react"

const STAGGER_MS = 80
const DURATION_MS = 700
const LIFT_PX = 16
const THRESHOLD = 0.15

type RevealState = { visible: boolean; reducedMotion: boolean }

const RevealContext = createContext<RevealState | null>(null)

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}

type ScrollRevealBaseProps = {
  as?: ElementType
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<"div">, "as" | "children" | "className">

/**
 * Fades in and lifts content once when ~15% of the element enters the viewport.
 * Stagger child blocks with <ScrollRevealItem order={0} />.
 */
export const ScrollReveal = forwardRef<HTMLElement, ScrollRevealBaseProps>(function ScrollReveal(
  { as, className, children, ...rest },
  forwardedRef,
) {
  const Tag = (as || "section") as ElementType
  const localRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const setRef = (el: HTMLElement | null) => {
    localRef.current = el
    if (typeof forwardedRef === "function") {
      forwardedRef(el)
    } else if (forwardedRef) {
      ;(forwardedRef as MutableRefObject<HTMLElement | null>).current = el
    }
  }

  useLayoutEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }

    const el = localRef.current
    if (!el) return

    const vh = window.innerHeight
    const rect = el.getBoundingClientRect()
    const inViewport = rect.top < vh * 0.92 && rect.bottom > vh * 0.08
    if (inViewport) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
            return
          }
        }
      },
      { threshold: THRESHOLD },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reducedMotion])

  return (
    <Tag
      ref={setRef as never}
      className={className}
      {...(rest as object)}
    >
      <RevealContext.Provider value={{ visible, reducedMotion }}>{children}</RevealContext.Provider>
    </Tag>
  )
})

type ScrollRevealItemProps = {
  order: number
  className?: string
  children: ReactNode
}

export function ScrollRevealItem({ order, className, children }: ScrollRevealItemProps) {
  const ctx = useContext(RevealContext)
  if (!ctx) {
    throw new Error("ScrollRevealItem must be used inside ScrollReveal")
  }
  const { visible, reducedMotion } = ctx
  const active = visible || reducedMotion
  const delay = order * STAGGER_MS

  return (
    <div
      className={cn("will-change-[opacity,transform]", className)}
      style={
        {
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0px)" : `translateY(${LIFT_PX}px)`,
          transition: `opacity ${DURATION_MS}ms ease-out, transform ${DURATION_MS}ms ease-out`,
          transitionDelay: active && !reducedMotion ? `${delay}ms` : "0ms",
        } satisfies CSSProperties
      }
    >
      {children}
    </div>
  )
}

export const SHADOW_TIER1 =
  "shadow-[0_10px_40px_-12px_rgba(58,40,32,0.18)]" as const
export const SHADOW_TIER2 =
  "shadow-[0_4px_16px_-8px_rgba(58,40,32,0.10)]" as const
export const BORDER_CHAMPAGNE = "border-[#C9A68E]/50" as const
