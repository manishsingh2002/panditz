import { useEffect, useRef, useState } from "react";
import { useI18n, type Lang } from "./i18n";
import { useLanding, useSession } from "./modals";
import { Button, Container, cx, scrollToId } from "../design-system/primitives";
import {
  IconCheck,
  IconChevronDown,
  IconClose,
  IconGlobe,
  IconMenu,
  Logo,
} from "../design-system/icons";

/* ============================================================
   Sticky landing header — compact, translucent on scroll,
   centered nav on desktop, drawer sheet on mobile.
   ============================================================ */

const SECTION_IDS = ["home", "how", "services", "pandits", "about"] as const;

function LangPicker({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const options: Array<{ code: Lang; label: string }> = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpenMenu((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={openMenu}
        aria-label={t.a11y.language}
        className={cx(
          "flex h-9 items-center gap-1.5 rounded-sm border border-line-strong px-2.5 text-[12.5px] font-bold text-ink-700 transition hover:border-kesari-400 hover:text-kesari-700",
          compact && "border-line"
        )}
      >
        <IconGlobe size={15} />
        {lang === "en" ? "EN" : "हिं"}
        <IconChevronDown size={13} className={cx("transition-transform duration-200", openMenu && "rotate-180")} />
      </button>
      {openMenu && (
        <div
          role="listbox"
          aria-label={t.a11y.language}
          className="animate-rise absolute right-0 top-full z-50 mt-2 w-40 rounded-sm border border-line bg-surface-3 p-1.5 shadow-lift"
        >
          {options.map((o) => (
            <button
              key={o.code}
              role="option"
              aria-selected={lang === o.code}
              onClick={() => {
                setLang(o.code);
                setOpenMenu(false);
              }}
              className={cx(
                "flex w-full items-center justify-between rounded-xs px-3 py-2 text-left text-[13px] font-semibold transition hover:bg-surface-2",
                lang === o.code ? "text-kesari-700" : "text-ink-700"
              )}
            >
              {o.label}
              {lang === o.code && <IconCheck size={14} className="text-kesari-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { open } = useLanding();
  const session = useSession();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const links = [
    { id: "home", label: t.nav.home },
    { id: "how", label: t.nav.how },
    { id: "services", label: t.nav.services },
    { id: "pandits", label: t.nav.priests },
    { id: "about", label: t.nav.about },
  ];

  const go = (id: string) => {
    onClose();
    window.setTimeout(() => scrollToId(id), 30);
  };

  return (
    <div className="fixed inset-0 z-[55] lg:hidden">
      <button
        aria-label={t.a11y.closeMenu}
        className="absolute inset-0 bg-night-950/55 backdrop-blur-[2px]"
        onClick={onClose}
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.openMenu}
        className="absolute right-0 top-0 flex h-full w-[19rem] max-w-[86vw] flex-col border-l border-line bg-surface-3 shadow-lift"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo size={30} />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={t.a11y.closeMenu}
            className="rounded-xs p-2 text-ink-500 transition hover:bg-surface-2 hover:text-ink-900"
          >
            <IconClose size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-2" aria-label="Mobile">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full border-b border-line py-3.5 text-left text-[15px] font-semibold text-ink-900 transition hover:text-kesari-700"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="space-y-2.5 border-t border-line px-5 py-5">
          <Button className="w-full" onClick={() => go("services")}>
            {t.nav.book}
          </Button>
          {session ? (
            <Button variant="outline" className="w-full" href="#/app">
              {t.nav.dashboard}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                onClose();
                open("login");
              }}
            >
              {t.nav.login}
            </Button>
          )}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {(["en", "hi"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cx(
                  "h-10 rounded-sm border text-[13px] font-bold transition",
                  lang === code
                    ? "border-kesari-600 bg-kesari-600 text-surface-3"
                    : "border-line-strong text-ink-500 hover:border-kesari-400"
                )}
              >
                {code === "en" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingHeader() {
  const { t } = useI18n();
  const { open } = useLanding();
  const session = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        let cur: string = "home";
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 130) cur = id;
        }
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const links = [
    { id: "home", label: t.nav.home },
    { id: "how", label: t.nav.how },
    { id: "services", label: t.nav.services },
    { id: "pandits", label: t.nav.priests },
    { id: "about", label: t.nav.about },
  ];

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-surface/90 shadow-soft backdrop-blur-md" : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3">
        <button
          onClick={() => scrollToId("home")}
          aria-label="PanditZ — home"
          className="shrink-0 rounded-xs transition hover:opacity-85"
        >
          <Logo descriptor />
        </button>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              aria-current={active === l.id}
              className={cx(
                "navlink text-[13px] font-semibold transition-colors",
                active === l.id ? "text-kesari-700" : "text-ink-700 hover:text-ink-900"
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LangPicker />
          {session ? (
            <Button size="sm" variant="outline" href="#/app">
              {t.nav.dashboard}
            </Button>
          ) : (
            <Button size="sm" variant="ghost" className="hidden sm:inline-flex" onClick={() => open("login")}>
              {t.nav.login}
            </Button>
          )}
          <Button size="sm" className="hidden md:inline-flex" onClick={() => scrollToId("services")}>
            {t.nav.book}
          </Button>
          <button
            onClick={() => setDrawer(true)}
            aria-label={t.a11y.openMenu}
            aria-expanded={drawer}
            className="rounded-sm border border-line-strong p-2 text-ink-700 transition hover:border-kesari-400 hover:text-kesari-700 lg:hidden"
          >
            <IconMenu size={18} />
          </button>
        </div>
      </Container>
      {drawer && <MobileDrawer onClose={() => setDrawer(false)} />}
    </header>
  );
}
