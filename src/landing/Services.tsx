import { useI18n } from "./i18n";
import { useLanding } from "./modals";
import {
  Badge,
  Button,
  Container,
  Reveal,
  SectionHeading,
  formatINR,
} from "../design-system/primitives";
import {
  IconArrowRight,
  IconClock,
  IconDiya,
  IconFlame,
  IconHome,
  IconKalash,
  IconSparkle,
  IconSun,
} from "../design-system/icons";

/* ============================================================
   Services — compact category cards + popular ceremonies row
   (horizontal snap-scroll on mobile, grid on desktop).
   ============================================================ */

const CAT_ICONS = [IconDiya, IconFlame, IconKalash, IconHome, IconSparkle, IconSun];

export function ServiceCategories() {
  const { t } = useI18n();
  const { open } = useLanding();

  return (
    <section id="services" className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <Button variant="outline" size="sm" onClick={() => open("services")}>
              {t.services.browse}
              <IconArrowRight size={15} />
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => {
            const Icon = CAT_ICONS[i];
            return (
              <Reveal key={s.name} delay={i * 70} className="h-full">
                <button
                  onClick={() => open("services", { catIdx: i })}
                  className="group h-full w-full rounded-md border border-line bg-surface-3 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-kesari-300 hover:shadow-lift"
                >
                  <span className="flex items-start justify-between">
                    <Icon size={22} className="text-kesari-600" />
                    <IconArrowRight
                      size={15}
                      className="-translate-x-1 text-kesari-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </span>
                  <span className="mt-3.5 block text-[1.05rem] text-ink-900">{s.name}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink-500">{s.desc}</span>
                  <span className="mt-4 flex items-baseline gap-1.5 border-t border-line pt-3 text-[11px] font-bold uppercase tracking-wide text-ink-400">
                    {t.services.fromLabel}
                    <span className="text-[15px] font-extrabold tracking-normal text-ink-900">
                      {formatINR(s.from)}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function FeaturedPujas() {
  const { t } = useI18n();
  const { open } = useLanding();

  return (
    <section id="popular" className="pb-16 lg:pb-20">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow={t.featured.eyebrow} title={t.featured.title} sub={t.featured.sub} />
        </Reveal>

        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {t.featured.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 110} className="min-w-[17rem] snap-center sm:min-w-[19rem] lg:min-w-0">
              <article className="flex h-full flex-col rounded-md border border-line bg-surface-3 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-kesari-300 hover:shadow-lift">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <Badge key={tag} tone="ink">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-4 text-[1.25rem] text-ink-900">{p.name}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{p.desc}</p>
                <p className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-ink-500">
                  <IconClock size={14} className="text-kesari-600" />
                  {t.featured.dur}: {p.dur}
                </p>
                <div className="mt-auto pt-5">
                  <div className="flex items-end justify-between gap-3 border-t border-line pt-4">
                    <p>
                      <span className="block text-[10.5px] font-bold uppercase tracking-wide text-ink-400">
                        {t.featured.from}
                      </span>
                      <span className="text-[17px] font-extrabold text-ink-900">{formatINR(p.from)}</span>
                    </p>
                    <Button size="sm" variant="outline" onClick={() => open("puja", { pujaIdx: i })}>
                      {t.featured.details}
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
