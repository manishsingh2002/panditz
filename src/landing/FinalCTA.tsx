import { useI18n } from "./i18n";
import { Button, Container, MandalaRing, Reveal, scrollToId } from "../design-system/primitives";
import { IconArrowRight } from "../design-system/icons";

/* ============================================================
   Final CTA — warm kesari band, left-aligned, clean.
   ============================================================ */

export function FinalCTA() {
  const { t } = useI18n();

  return (
    <section aria-label="Final call to action" className="relative overflow-hidden bg-kesari-700 py-14 lg:py-16">
      <MandalaRing className="pointer-events-none absolute -right-24 -top-28 size-[21rem] animate-spin-slow text-night-ink/[0.13]" />
      <MandalaRing className="pointer-events-none absolute -bottom-32 -left-20 hidden size-[19rem] text-night-ink/[0.09] md:block" />

      <Container className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-xl">
          <p className="font-dev text-[17px] leading-none text-marigold-200" aria-hidden="true">
            ॐ
          </p>
          <h2 className="mt-2.5 text-[1.8rem] leading-tight text-surface-3 sm:text-[2.15rem]">
            {t.final.title}
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-kesari-100">{t.final.sub}</p>
        </Reveal>

        <Reveal delay={130} className="shrink-0">
          <div className="flex flex-wrap gap-3">
            <Button variant="dark" size="lg" onClick={() => scrollToId("services")}>
              {t.final.cta1}
              <IconArrowRight size={16} />
            </Button>
            <Button variant="inverse" size="lg" onClick={() => scrollToId("pandits")}>
              {t.final.cta2}
            </Button>
          </div>
          <p className="mt-3 text-[12px] font-semibold text-kesari-100/85">{t.final.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}
