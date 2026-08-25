import { useI18n, TICKER } from "./i18n";
import { HERO_IMG } from "./assets";
import { Button, Container, MandalaRing, Reveal, scrollToId } from "../design-system/primitives";
import {
  IconArrowRight,
  IconBell,
  IconCalendar,
  IconCheck,
  IconDiya,
  IconShield,
  IconSparkle,
  IconUser,
} from "../design-system/icons";

/* ============================================================
   Hero — message on the left, arched portrait composition on
   the right with the devotee → panditZ → pandit → ceremony rail.
   ============================================================ */

const RAIL_ICONS = [IconUser, IconSparkle, IconShield, IconBell];

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-36">
      <MandalaRing className="pointer-events-none absolute -right-32 -top-32 size-[26rem] animate-spin-slow text-kesari-600/10" />
      <MandalaRing className="pointer-events-none absolute -left-36 bottom-10 hidden size-[24rem] text-kesari-600/[0.06] lg:block" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
          {/* ---- Message ---- */}
          <Reveal className="lg:col-span-6">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-3 px-3.5 py-1.5 shadow-soft">
              <span className="font-dev text-[15px] leading-none text-kesari-600">श्री गणेशाय नमः</span>
              <span aria-hidden="true" className="h-3.5 w-px bg-line-strong" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-500">
                {t.hero.eyebrow}
              </span>
            </p>

            <h1 className="mt-6 text-[2.5rem] leading-[1.09] tracking-[-0.01em] text-ink-900 sm:text-[3rem] lg:text-[3.35rem]">
              {t.hero.t1}{" "}
              <span className="relative inline-block text-kesari-600">
                {t.hero.t2}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 220 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 5.5C60 2 160 2 217 5"
                    stroke="var(--color-marigold-400)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-ink-500">{t.hero.sub}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => scrollToId("services")}>
                {t.hero.cta1}
                <IconArrowRight size={17} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId("pandits")}>
                {t.hero.cta2}
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              {t.hero.checks.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-700">
                  <IconCheck size={15} className="text-peepal-600" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Visual composition ---- */}
          <Reveal delay={140} className="lg:col-span-6">
            <div className="relative mx-auto flex max-w-md items-center justify-center gap-7 lg:max-w-none lg:justify-end lg:pr-4 xl:pr-8">
              {/* journey rail */}
              <div className="hidden shrink-0 pt-4 xl:block">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">
                  {t.hero.railTitle}
                </p>
                <ol className="relative flex flex-col gap-6 border-l border-dashed border-line-strong pl-6">
                  {t.hero.rail.map((r, i) => {
                    const Icon = RAIL_ICONS[i];
                    return (
                      <li key={r.t} className="relative">
                        <span className="absolute -left-8 top-1/2 flex size-[17px] -translate-y-1/2 items-center justify-center rounded-full border border-kesari-300 bg-surface-3">
                          <Icon size={9} className="text-kesari-600" />
                        </span>
                        <p className="text-[12px] font-bold leading-tight text-ink-900">{r.t}</p>
                        <p className="mt-0.5 text-[11px] text-ink-400">{r.d}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* arched portrait */}
              <div className="relative">
                <MandalaRing className="pointer-events-none absolute -inset-9 text-kesari-500/[0.14]" />
                <div className="relative w-[15.5rem] overflow-hidden rounded-t-arch rounded-b-lg border border-line-strong shadow-arch sm:w-[18.5rem] lg:w-[20.5rem]">
                  <img
                    src={HERO_IMG}
                    alt={t.hero.imgAlt}
                    className="h-[22rem] w-full object-cover sm:h-[26rem] lg:h-[29rem]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night-950/40 to-transparent"
                  />
                </div>

                <div className="absolute -left-3 top-9 flex items-center gap-2.5 rounded-md border border-line bg-surface-3/95 px-3.5 py-2.5 shadow-chip backdrop-blur-sm sm:-left-12">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-peepal-100 text-peepal-600">
                    <IconShield size={16} />
                  </span>
                  <span>
                    <span className="block text-[12.5px] font-bold leading-tight text-ink-900">
                      {t.hero.chip1T}
                    </span>
                    <span className="block text-[11px] text-ink-400">{t.hero.chip1D}</span>
                  </span>
                </div>

                <div className="absolute -right-2 bottom-10 flex items-center gap-2.5 rounded-md border border-line bg-surface-3/95 px-3.5 py-2.5 shadow-chip backdrop-blur-sm sm:-right-8">
                  <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-kesari-100 text-kesari-700">
                    <IconCalendar size={16} />
                    <span className="absolute -right-0.5 -top-0.5 size-2 animate-pulse-dot rounded-full bg-peepal-500" />
                  </span>
                  <span>
                    <span className="block text-[12.5px] font-bold leading-tight text-ink-900">
                      {t.hero.chip2T}
                    </span>
                    <span className="block text-[11px] text-ink-400">{t.hero.chip2D}</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <Ticker />
    </section>
  );
}

/* ---- Service ticker strip ---- */

export function Ticker() {
  return (
    <div className="marquee mt-14 overflow-hidden border-y border-line bg-surface-2/70 py-3.5" aria-hidden="true">
      <div className="marquee-track items-center">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center">
            {TICKER.map((name) => (
              <span key={`${dup}-${name}`} className="flex items-center">
                <span className="font-display text-[13.5px] tracking-wide text-ink-500">{name}</span>
                <IconDiya size={13} className="mx-7 text-kesari-500/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
