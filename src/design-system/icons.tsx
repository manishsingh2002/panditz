import type { SVGProps } from "react";

/* ============================================================
   PanditZ icon system — custom inline SVG, 24px grid,
   1.6px stroke, round joins. Drawn for the brand; not a
   generic icon pack. Colors inherit from currentColor.
   ============================================================ */

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ---- Ritual icons ---- */

export const IconDiya = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 14h15c-.4 3.4-3.5 5.8-7.5 5.8S4.9 17.4 4.5 14Z" />
    <path d="M12 11.6c1.8-1.6 1.9-3.7.2-6.1-1.9 2.4-1.8 4.5-.2 6.1Z" />
    <path d="M9.5 14h5" />
  </Svg>
);

export const IconFlame = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5c3.6 3.4 5 6.3 5 8.9a5 5 0 0 1-10 0c0-2.6 1.4-5.5 5-8.9Z" />
    <path d="M12 20.4a2.9 2.9 0 0 1-2.9-2.9c0-1.4.8-2.8 2.9-4.5 2.1 1.7 2.9 3.1 2.9 4.5a2.9 2.9 0 0 1-2.9 2.9Z" />
  </Svg>
);

export const IconKalash = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="4.6" r="1.9" />
    <path d="M8.6 9.2h6.8l.8 2.1c.8 2.1-.1 4.5-1.7 6H9.5c-1.6-1.5-2.5-3.9-1.7-6l.8-2.1Z" />
    <path d="M4.6 9.2c2.4-.9 4.9-1.3 7.4-1.3s5 .4 7.4 1.3" />
    <path d="M9.4 20.6h5.2" />
    <path d="M10.3 17.3v3.3M13.7 17.3v3.3" />
  </Svg>
);

export const IconBell = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.4a5.6 5.6 0 0 1 5.6 5.6v3.1l1.5 2.9H4.9l1.5-2.9V9A5.6 5.6 0 0 1 12 3.4Z" />
    <path d="M10.3 18.4a1.8 1.8 0 0 0 3.4 0" />
    <path d="M12 2v1.4" />
  </Svg>
);

export const IconLotus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.6c1.7 2.2 2.5 4.2 2.5 6 0 1.6-.9 3-2.5 3.9-1.6-.9-2.5-2.3-2.5-3.9 0-1.8.8-3.8 2.5-6Z" />
    <path d="M4.7 9.3c1.7 3.7 4 5.6 7.3 6M19.3 9.3c-1.7 3.7-4 5.6-7.3 6" />
    <path d="M4 13.2c.6 3.7 4 6 8 6s7.4-2.3 8-6" />
  </Svg>
);

export const IconTemple = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 20.5V12c0-4.4 2.9-7.9 6.5-9.4 3.6 1.5 6.5 5 6.5 9.4v8.5" />
    <path d="M3.5 20.5h17" />
    <path d="M9.5 20.5v-5.6a2.5 2.5 0 0 1 5 0v5.6" />
  </Svg>
);

/* ---- Trust & product icons ---- */

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7 2.7V11c0 4.6-2.9 8-7 9.7C7.9 19 5 15.6 5 11V5.7L12 3Z" />
    <path d="m9 11.6 2.1 2.1 4.2-4.4" />
  </Svg>
);

export const IconIdBadge = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4.5" width="16" height="15" rx="2" />
    <circle cx="9" cy="10.4" r="1.9" />
    <path d="M6.4 15.6c.5-1.7 1.5-2.5 2.6-2.5s2.1.8 2.6 2.5" />
    <path d="M14.2 9.2h3.4M14.2 12.4h3.4" />
  </Svg>
);

export const IconRupee = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 4.5h11M6.5 9h11" />
    <path d="M9.3 4.5c3.2 0 5.2 1.6 5.2 4.2s-2 4.3-5.2 4.3H7l6.7 6.5" />
  </Svg>
);

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
    <path d="M8 3.4v4M16 3.4v4M3.5 10.4h17" />
    <circle cx="15.6" cy="15.6" r="2.5" />
    <path d="M15.6 14.4v1.4l1 .7" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.4V12l3 2" />
  </Svg>
);

export const IconUserCheck = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9.4" cy="8" r="3.2" />
    <path d="M3.5 20c.6-3.4 3-5.3 5.9-5.3 1.6 0 3 .5 4.1 1.4" />
    <path d="m15 17.2 2 2 3.5-4.2" />
  </Svg>
);

export const IconUser = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5 20c.7-3.7 3.4-5.7 7-5.7s6.3 2 7 5.7" />
  </Svg>
);

export const IconStar = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <Svg {...p}>
    <path
      fill={filled ? "currentColor" : "none"}
      d="m12 3.7 2.5 5.1 5.6.7-4.1 3.9 1.1 5.6L12 16.3 6.9 19l1.1-5.6-4.1-3.9 5.6-.7L12 3.7Z"
    />
  </Svg>
);

export const IconBook = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6.6C10.2 5 7.6 4.5 4.5 4.8v13.5c3.1-.3 5.7.2 7.5 1.8 1.8-1.6 4.4-2.1 7.5-1.8V4.8c-3.1-.3-5.7.2-7.5 1.8Z" />
    <path d="M12 6.6v13.5" />
  </Svg>
);

export const IconLeaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19.5 4.5C11 5 5.5 9.5 5 19c9.5-.5 14-6 14.5-14.5Z" />
    <path d="M5 19c3.4-5.4 7.4-8.9 11.8-11.4" />
  </Svg>
);

export const IconCoins = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8.6" cy="8.6" r="4.9" />
    <path d="M14.9 6.4a4.9 4.9 0 1 1-6.3 7.7" />
    <path d="M7 7.2h3.2M7 9.6h3.2M8.2 7.2c1.2 0 2 .6 2 1.5s-.8 1.5-2 1.5H7.3l2.3 2.2" />
  </Svg>
);

export const IconChat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.5c-4.7 0-8.5 3-8.5 6.8 0 2.1 1.2 4 3.1 5.3L6 20.4l3.4-1.3c.8.2 1.7.3 2.6.3 4.7 0 8.5-3 8.5-6.7S16.7 4.5 12 4.5Z" />
    <path d="M8.6 11.3h.01M12 11.3h.01M15.4 11.3h.01" strokeWidth={2.2} />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.6 4.4 4.4L19 7.2" />
  </Svg>
);

export const IconSparkle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11 3.6c.6 3.7 2.7 5.8 6.4 6.4-3.7.6-5.8 2.7-6.4 6.4-.6-3.7-2.7-5.8-6.4-6.4 3.7-.6 5.8-2.7 6.4-6.4Z" />
    <path d="m18.4 15.2.5 1.9 1.9.5-1.9.5-.5 1.9-.5-1.9-1.9-.5 1.9-.5.5-1.9Z" />
  </Svg>
);

export const IconSun = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3.8" />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
  </Svg>
);

export const IconHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 10.8 7.5-6.3 7.5 6.3v8.7a1 1 0 0 1-1 1h-4v-5.3h-5v5.3h-4a1 1 0 0 1-1-1v-8.7Z" />
  </Svg>
);

/* ---- UI chrome icons ---- */

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12h14.5M13.2 5.8 19.4 12l-6.2 6.2" />
  </Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M3.6 12h16.8" />
    <path d="M12 3.6c2.5 2.3 3.8 5.1 3.8 8.4s-1.3 6.1-3.8 8.4c-2.5-2.3-3.8-5.1-3.8-8.4s1.3-6.1 3.8-8.4Z" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 3.8c.6 0 1.1.4 1.3 1l.8 2.5c.2.6 0 1.2-.5 1.6l-1.2 1a12.9 12.9 0 0 0 5.2 5.2l1-1.2c.4-.5 1-.7 1.6-.5l2.5.8c.6.2 1 .7 1 1.3v2c0 .9-.7 1.7-1.6 1.6C10.7 18.6 5.4 13.3 4.6 5.4c-.1-.9.7-1.6 1.6-1.6H8Z" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.6 7.5 5.9 7.5-5.9" />
  </Svg>
);

export const IconMapPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.3-6.5-10.3a6.5 6.5 0 0 1 13 0C18.5 15.7 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.2" />
  </Svg>
);

/* ============================================================
   Brand mark — temple arch with a flickering diya flame.
   ============================================================ */

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 34.5V21c0-6.4 3.6-11.4 10-16.5 6.4 5.1 10 10.1 10 16.5v13.5"
        stroke="var(--color-kesari-600)"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path d="M6.5 34.5h27" stroke="var(--color-ink-900)" strokeWidth="2.1" strokeLinecap="round" />
      <path
        className="animate-flicker"
        style={{ transformOrigin: "20px 24px" }}
        d="M20 28.8c3-2.6 3.3-5.9.3-9.3-3.1 3.4-2.8 6.7-.3 9.3Z"
        fill="var(--color-kesari-500)"
      />
      <circle cx="20" cy="31.4" r="1.15" fill="var(--color-marigold-500)" />
    </svg>
  );
}

export function Logo({
  size = 34,
  withWord = true,
  descriptor = false,
  dark = false,
}: {
  size?: number;
  withWord?: boolean;
  descriptor?: boolean;
  dark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      {withWord && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.3rem] tracking-[0.02em] ${
              dark ? "text-night-ink" : "text-ink-900"
            }`}
          >
            Pandit<span className="text-kesari-500">Z</span>
          </span>
          {descriptor && (
            <span
              className={`mt-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] ${
                dark ? "text-night-muted" : "text-ink-400"
              }`}
            >
              Vedic services · verified
            </span>
          )}
        </span>
      )}
    </span>
  );
}
