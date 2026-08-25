import { useI18n } from "./i18n";
import { Container, Reveal } from "../design-system/primitives";
import { IconBook, IconCalendar, IconRupee, IconShield } from "../design-system/icons";

/* ============================================================
   Trust highlights — a lightweight strip, deliberately not
   four big cards.
   ============================================================ */

const TRUST_ICONS = [IconShield, IconRupee, IconCalendar, IconBook];

export function TrustHighlights() {
  const { t } = useI18n();

  return (
    <section aria-label="Trust highlights" className="py-12 sm:py-14">
      <Container>
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {t.trust.items.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <Reveal key={item.t} delay={i * 90} className="flex items-start gap-3.5">
                <Icon size={21} className="mt-0.5 shrink-0 text-kesari-600" />
                <div>
                  <h3 className="text-[14.5px] font-bold text-ink-900">{item.t}</h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">{item.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
