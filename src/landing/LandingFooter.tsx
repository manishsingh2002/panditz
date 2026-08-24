import type { ReactNode } from "react";
import { useI18n } from "./i18n";
import { useLanding, type LegalDoc } from "./modals";
import { Container, scrollToId } from "../design-system/primitives";
import { IconDiya, IconMail, IconPhone, Logo } from "../design-system/icons";

/* ============================================================
   Footer — compact six columns on a night surface. Every link
   does something real: scroll, modal or contact.
   ============================================================ */

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-night-ink">{title}</h3>
      <ul className="mt-3 space-y-2">{children}</ul>
    </nav>
  );
}

function FooterLink({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-left text-[13px] text-night-muted transition hover:text-marigold-300"
      >
        {children}
      </button>
    </li>
  );
}

export function LandingFooter() {
  const { t } = useI18n();
  const { open } = useLanding();
  const L = t.footer.links;

  return (
    <footer id="contact" className="bg-night-950 pb-8 pt-14 text-night-muted">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:pr-8">
            <Logo dark descriptor />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed">{t.footer.tagline}</p>
            <h3 className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-night-ink">
              {t.footer.contactT}
            </h3>
            <ul className="mt-2.5 space-y-2 text-[13px]">
              <li>
                <a
                  href="mailto:namaste@panditz.in"
                  className="inline-flex items-center gap-2 transition hover:text-marigold-300"
                >
                  <IconMail size={14} className="text-kesari-500" />
                  namaste@panditz.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919811024680"
                  className="inline-flex items-center gap-2 transition hover:text-marigold-300"
                >
                  <IconPhone size={14} className="text-kesari-500" />
                  +91 98110 24680
                </a>
              </li>
            </ul>
          </div>

          <FooterCol title={t.footer.cols.devotees}>
            <FooterLink onClick={() => open("services")}>{L.browseServices}</FooterLink>
            <FooterLink onClick={() => scrollToId("popular")}>{L.popular}</FooterLink>
            <FooterLink onClick={() => scrollToId("how")}>{L.howItWorks}</FooterLink>
            <FooterLink onClick={() => open("booking", {})}>{L.book}</FooterLink>
          </FooterCol>

          <FooterCol title={t.footer.cols.priests}>
            <FooterLink onClick={() => open("join")}>{L.join}</FooterLink>
            <FooterLink onClick={() => scrollToId("pandits")}>{L.benefits}</FooterLink>
            <FooterLink onClick={() => scrollToId("services")}>{L.pricing}</FooterLink>
          </FooterCol>

          <FooterCol title={t.footer.cols.company}>
            <FooterLink onClick={() => scrollToId("about")}>{L.about}</FooterLink>
            <FooterLink onClick={() => scrollToId("trust")}>{L.trust}</FooterLink>
            <FooterLink onClick={() => scrollToId("pandits")}>{t.nav.priests}</FooterLink>
          </FooterCol>

          <FooterCol title={t.footer.cols.support}>
            <FooterLink onClick={() => open("help")}>{L.help}</FooterLink>
            <FooterLink onClick={() => open("booking", {})}>{L.bookingSupport}</FooterLink>
            <FooterLink onClick={() => open("help")}>{L.contact}</FooterLink>
          </FooterCol>

          <FooterCol title={t.footer.cols.legal}>
            <FooterLink onClick={() => open("legal", { legal: "privacy" as LegalDoc })}>
              {L.privacy}
            </FooterLink>
            <FooterLink onClick={() => open("legal", { legal: "terms" as LegalDoc })}>
              {L.terms}
            </FooterLink>
            <FooterLink onClick={() => open("legal", { legal: "refund" as LegalDoc })}>
              {L.refund}
            </FooterLink>
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-night-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px]">{t.footer.rights}</p>
          <p className="flex items-center gap-2 text-[12px]">
            <IconDiya size={13} className="text-kesari-500" />
            {t.footer.made}
            <span aria-hidden="true" className="font-dev text-marigold-400">
              ॐ शान्तिः
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
