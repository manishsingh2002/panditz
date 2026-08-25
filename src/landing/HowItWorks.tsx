import { useI18n } from "./i18n";
import { Container, Reveal, SectionHeading } from "../design-system/primitives";
import { IconCalendar, IconDiya, IconUserCheck } from "../design-system/icons";

/* ============================================================
   How it works — three steps, visually connected on desktop.
   ============================================================ */

const STEP_ICONS = [IconDiya, IconUserCheck, IconCalendar];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how" className="border-y border-line bg-surface-2/50 py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow={t.how.eyebrow} title={t.how.title} sub={t.how.sub} />
        </Reveal>

        <div className="relative mt-12 lg:mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-[22px] hidden border-t-2 border-dashed border-line-strong lg:block"
          />
          <ol className="grid gap-10 sm:gap-8 lg:grid-cols-3">
            {t.how.steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal as="li" key={s.n} delay={i * 130} className="relative text-center">
                  <span className="relative mx-auto flex size-11 items-center justify-center rounded-full border border-kesari-200 bg-surface-3 text-kesari-600 shadow-soft">
                    <Icon size={20} />
                    <span className="absolute -right-1.5 -top-1.5 rounded-full bg-kesari-600 px-1.5 py-0.5 text-[10px] font-extrabold text-surface-3">
                      {s.n}
                    </span>
                  </span>
                  <h3 className="mt-4 text-[1.15rem] text-ink-900">{s.t}</h3>
                  <p className="mx-auto mt-1.5 max-w-[19rem] text-[13.5px] leading-relaxed text-ink-500">
                    {s.d}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
