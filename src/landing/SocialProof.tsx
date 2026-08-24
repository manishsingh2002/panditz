import { useI18n } from "./i18n";
import { Container, Reveal, SectionHeading } from "../design-system/primitives";
import { IconDiya, IconIdBadge, IconStar } from "../design-system/icons";

/* ============================================================
   Social proof — honest by design. PanditZ has no review data
   yet, so this section ships the real structure (aggregate
   panel + verified-review pipeline) without fabricated
   ratings or testimonials.
   ============================================================ */

export function SocialProof() {
  const { t } = useI18n();

  return (
    <section id="reviews" className="py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow={t.proof.eyebrow} title={t.proof.title} sub={t.proof.sub} />
            </Reveal>
            <Reveal delay={130}>
              <div className="mt-7 rounded-md border border-dashed border-line-strong bg-surface-2/50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 text-line-strong" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStar key={i} size={18} />
                    ))}
                  </div>
                  <span className="font-display text-2xl text-ink-400">—</span>
                </div>
                <h3 className="mt-3.5 flex items-center gap-2 text-[15px] font-bold text-ink-900">
                  <span className="size-2 animate-pulse-dot rounded-full bg-peepal-500" aria-hidden="true" />
                  {t.proof.waiting}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{t.proof.waitingSub}</p>
              </div>
              <p className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-ink-400">
                <IconIdBadge size={15} className="text-peepal-600" />
                {t.proof.note}
              </p>
            </Reveal>
          </div>

          <Reveal delay={110} className="lg:col-span-7">
            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-kesari-700">
              <IconDiya size={14} className="text-kesari-500" />
              {t.proof.howTitle}
            </h3>
            <ol className="mt-5 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {t.proof.how.map((h, i) => (
                <Reveal as="li" key={h.t} delay={i * 110} className="border-t-2 border-kesari-200 pt-4">
                  <span className="font-display text-[1.6rem] leading-none text-kesari-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2 text-[14px] font-bold text-ink-900">{h.t}</h4>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">{h.d}</p>
                </Reveal>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
