import { useI18n } from "./i18n";
import { useLanding } from "./modals";
import { HAVAN_IMG } from "./assets";
import { Button, Container, MandalaRing, Reveal, SectionHeading } from "../design-system/primitives";
import { IconArrowRight, IconCheck, IconSparkle } from "../design-system/icons";

/* ============================================================
   Pandit-side CTA — dark night band with havan visual and
   real product benefits (availability, pricing, bookings,
   earnings, profile).
   ============================================================ */

export function PanditCTA() {
  const { t } = useI18n();
  const { open } = useLanding();

  return (
    <section id="pandits" className="relative overflow-hidden bg-night-900 py-16 text-night-ink lg:py-20">
      <MandalaRing className="pointer-events-none absolute -bottom-28 -right-24 size-[24rem] animate-spin-slow text-marigold-400/[0.09]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold-400/40 to-transparent"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <SectionHeading dark eyebrow={t.pandit.eyebrow} title={t.pandit.title} />
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-night-muted">{t.pandit.sub}</p>

            <ul className="mt-6 space-y-2.5">
              {t.pandit.benefits.map((b, i) => (
                <Reveal
                  as="li"
                  key={b}
                  delay={i * 70}
                  className="flex items-start gap-2.5 text-[14px] leading-relaxed text-night-ink/90"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-marigold-400/15 text-marigold-300">
                    <IconCheck size={12} />
                  </span>
                  {b}
                </Reveal>
              ))}
            </ul>

            <div className="mt-8">
              <Button variant="gold" size="lg" onClick={() => open("join")}>
                {t.pandit.cta}
                <IconArrowRight size={16} />
              </Button>
            </div>
            <p className="mt-3 text-[12px] text-night-muted">{t.pandit.note}</p>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative mx-auto w-fit">
              <MandalaRing className="pointer-events-none absolute -inset-8 text-marigold-400/[0.12]" />
              <div className="relative w-[15rem] overflow-hidden rounded-t-arch rounded-b-lg border border-night-line shadow-arch sm:w-[17rem]">
                <img
                  src={HAVAN_IMG}
                  alt={t.pandit.imgAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-[19rem] w-full object-cover sm:h-[21rem]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night-950/50 to-transparent"
                />
              </div>
              <div className="relative mt-5 flex flex-wrap justify-center gap-2">
                {t.pandit.chips.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1.5 rounded-sm border border-night-line bg-night-800 px-2.5 py-1.5 text-[11.5px] font-semibold text-night-muted"
                  >
                    <IconSparkle size={12} className="text-marigold-400" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
