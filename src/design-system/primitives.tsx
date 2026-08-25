import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type ElementType,
} from "react";
import { createPortal } from "react-dom";
import { IconClose, IconDiya } from "./icons";

/* ============================================================
   PanditZ UI primitives — every landing component composes
   these. Styling uses design tokens only.
   ============================================================ */

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ---- Layout ---- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ---- Button ---- */

type ButtonVariant = "primary" | "outline" | "ghost" | "gold" | "dark" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

const btnVariants: Record<ButtonVariant, string> = {
  primary: "bg-kesari-600 text-surface-3 shadow-soft hover:bg-kesari-700",
  outline:
    "border border-line-strong bg-transparent text-ink-700 hover:border-kesari-500 hover:text-kesari-700",
  ghost: "text-ink-700 hover:bg-surface-2",
  gold: "bg-marigold-400 text-night-900 shadow-soft hover:bg-marigold-300",
  dark: "bg-night-900 text-night-ink hover:bg-night-800",
  inverse:
    "border border-surface-3/40 text-surface-3 hover:bg-surface-3/10 hover:border-surface-3/70",
};

const btnSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  type,
  ariaLabel,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const cls = cx(
    "inline-flex select-none items-center justify-center whitespace-nowrap rounded-sm font-semibold transition-all duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60",
    btnVariants[variant],
    btnSizes[size],
    className
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/* ---- Badge ---- */

type BadgeTone = "kesari" | "peepal" | "marigold" | "ink" | "night" | "outline";

const badgeTones: Record<BadgeTone, string> = {
  kesari: "bg-kesari-100 text-kesari-800 border-kesari-200",
  peepal: "bg-peepal-100 text-peepal-700 border-peepal-100",
  marigold: "bg-marigold-200/60 text-marigold-700 border-marigold-200",
  ink: "bg-surface-2 text-ink-700 border-line",
  night: "bg-night-800 text-night-muted border-night-line",
  outline: "bg-transparent text-ink-500 border-line-strong",
};

export function Badge({
  tone = "kesari",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-xs border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        badgeTones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---- Section heading ---- */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cx(centered && "text-center", className)}>
      <p
        className={cx(
          "inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]",
          dark ? "text-marigold-400" : "text-kesari-700"
        )}
      >
        <IconDiya size={15} className={dark ? "text-marigold-400" : "text-kesari-500"} />
        {eyebrow}
      </p>
      <h2
        className={cx(
          "mt-3 text-[1.65rem] leading-[1.18] sm:text-[2rem]",
          dark ? "text-night-ink" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cx(
            "mt-3 max-w-xl text-[14.5px] leading-relaxed",
            dark ? "text-night-muted" : "text-ink-500",
            centered && "mx-auto"
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---- Ornament divider ---- */

export function Ornament({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <div className={cx("flex items-center gap-3", className)} aria-hidden="true">
      <span className={cx("h-px flex-1", dark ? "bg-night-line" : "bg-line-strong")} />
      <IconDiya size={16} className={dark ? "text-marigold-400" : "text-kesari-400"} />
      <span className={cx("h-px flex-1", dark ? "bg-night-line" : "bg-line-strong")} />
    </div>
  );
}

/* ---- Mandala ring (ambient decoration) ---- */

export function MandalaRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 6" />
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.8" />
      {Array.from({ length: 24 }).map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="30"
          rx="7"
          ry="17"
          stroke="currentColor"
          strokeWidth="0.8"
          transform={`rotate(${i * 15} 100 100)`}
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={`d${i}`}
          cx="100"
          cy="41"
          r="1.6"
          fill="currentColor"
          transform={`rotate(${i * 30 + 15} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="22" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

/* ---- Scroll reveal ---- */

export function Reveal({
  children,
  delay = 0,
  className = "",
  id,
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      id={id}
      className={cx("reveal", inView && "is-in", className)}
      style={{ "--rd": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---- Modal ---- */

export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-night-950/55 backdrop-blur-[2px]"
        onClick={onClose}
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cx(
          "animate-rise relative max-h-[88vh] w-full overflow-y-auto rounded-t-lg border border-line bg-surface-3 shadow-lift outline-none sm:rounded-lg",
          wide ? "sm:max-w-2xl" : "sm:max-w-md"
        )}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface-3/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-kesari-700">
              <IconDiya size={14} className="text-kesari-500" />
              PanditZ
            </p>
            <h3 className="mt-0.5 font-display text-lg text-ink-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-xs p-2 text-ink-500 transition hover:bg-surface-2 hover:text-ink-900"
          >
            <IconClose size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
