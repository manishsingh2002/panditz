import { useI18n } from "./i18n";
import { THALI_IMG } from "./assets";
import { Badge, Container, Reveal, SectionHeading, scrollToId } from "../design-system/primitives";
import {
  IconArrowRight,
  IconBook,
  IconCalendar,
  IconChat,
  IconCheck,
  IconIdBadge,
  IconKalash,
  IconRupee,
  IconShield,
} from "../design-system/icons";

/* ============================================================
   Why PanditZ (About) + Trust & Verification.
   ============================================================ */

const WHY_ICONS = [IconShield, IconBook, IconRupee, IconCalendar, IconIdBadge, IconChat];

export function WhyPanditZ() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
            <p className="mt-5 text-[14px] leading-[1.8] text-ink-500">{t.why.p1}</p>
            <p className="mt-3.5 text-[14px] leading-[1.8] text-ink-500">{t.why.p2}</p>

            <figure className="mt-7 w-fit overflow-hidden rounded-md border border-line-strong shadow-soft">
              <img
                src={THALI_IMG}
                alt={t.why.items[1].t}
                loading="lazy"
                decoding="async"
                className="h-40 w-64 object-cover transition-transform duration-500 hover:scale-[1.03] sm:h-44 sm:w-72"
              />
              <figcaption className="bg-night-900 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-night-muted">
                {t.why.items[1].t}
              </figcaption>
            </figure>

            <button
              onClick={() => scrollToId("trust")}
              className="mt-7 inline-flex items-center gap-2 text-[13.5px] font-bold text-kesari-700 transition hover:gap-3 hover:text-kesari-800"
            >
              {t.why.link}
              <IconArrowRight size={15} />
            </button>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid gap-x-8 sm:grid-cols-2">
              {t.why.items.map((item, i) => {
                const Icon = WHY_ICONS[i];
                return (
                  <Reveal key={item.t} delay={i * 70} className="border-t border-line py-5">
                    <Icon size={20} className="text-kesari-600" />
                    <h3 className="mt-2.5 text-[15px] font-bold text-ink-900">{item.t}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{item.d}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const VERIFY_ICONS = [IconIdBadge, IconShield, IconBook, IconRupee];
const CHIP_ICONS = [IconShield, IconCheck, IconBook, IconChat];

export function VerificationSection() {
  const { t } = useI18n();

  return (
    <section id="trust" className="border-y border-line bg-surface-2/50 py-16 lg:py-20">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading eyebrow={t.verify.eyebrow} title={t.verify.title} sub={t.verify.sub} />
            </Reveal>
            <ol className="mt-8">
              {t.verify.steps.map((s, i) => {
                const Icon = VERIFY_ICONS[i];
                return (
                  <Reveal
                    as="li"
                    key={s.t}
                    delay={i * 90}
                    className="flex gap-5 border-t border-line py-5 first:border-t-0 first:pt-2"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-kesari-200 bg-surface-3 font-display text-[15px] text-kesari-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[15px] font-bold text-ink-900">{s.t}</span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-ink-500">{s.d}</span>
                    </span>
                    <Icon size={20} className="mt-1 hidden shrink-0 text-kesari-500/70 sm:block" />
                  </Reveal>
                );
              })}
            </ol>
          </div>

          <Reveal delay={160} className="lg:col-span-5">
            <div className="rounded-lg border border-line bg-surface-3 p-6 shadow-soft transition-transform duration-300 lg:rotate-[1.2deg] lg:hover:rotate-0">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-kesari-700">
                  {t.verify.badgeTitle}
                </p>
                <Badge tone="peepal">
                  <IconShield size={12} />
                  {t.hero.chip1T}
                </Badge>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <span className="flex h-16 w-14 shrink-0 items-end justify-center overflow-hidden rounded-t-full rounded-b-sm bg-kesari-100 pb-2 text-kesari-700">
                  <IconKalash size={24} />
                </span>
                <span>
                  <span className="block text-[1.1rem] text-ink-900">{t.verify.badgeName}</span>
                  <span className="block text-[12px] text-ink-400">{t.verify.badgeRole}</span>
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {t.verify.badgeChips.map((c, i) => {
                  const ChipIcon = CHIP_ICONS[i];
                  return (
                    <span
                      key={c}
                      className="flex items-center gap-2 rounded-sm border border-line bg-surface-2/60 px-2.5 py-2 text-[11.5px] font-semibold text-ink-700"
                    >
                      <ChipIcon size={13} className="shrink-0 text-peepal-600" />
                      {c}
                    </span>
                  );
                })}
              </div>

              <p className="mt-4 text-[11px] italic text-ink-400">{t.verify.badgeCaption}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
