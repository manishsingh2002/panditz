import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useI18n } from "./i18n";
import { Badge, Button, Modal, cx, formatINR } from "../design-system/primitives";
import {
  IconArrowRight,
  IconBell,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconDiya,
  IconRupee,
  IconShield,
} from "../design-system/icons";

/* ============================================================
   Landing interaction layer — global modals (booking requests,
   pandit applications, sign-in, catalogue, policy, help) and a
   lightweight local session for the preview build.
   No business logic here is wired to a backend yet; requests
   and sessions persist on the device only.
   ============================================================ */

export type LegalDoc = "privacy" | "terms" | "refund";

type ModalState = {
  kind: null | "services" | "booking" | "join" | "login" | "help" | "puja" | "legal";
  catIdx?: number;
  pujaIdx?: number;
  bookingFor?: string;
  legal?: LegalDoc;
};

const LandingCtx = createContext<{
  open: (kind: Exclude<ModalState["kind"], null>, payload?: Partial<ModalState>) => void;
  close: () => void;
}>({ open: () => {}, close: () => {} });

export const useLanding = () => useContext(LandingCtx);

/* ---------------- Session (preview-only) ---------------- */

export type Session = { name: string; email: string; ts: number };
const SESSION_KEY = "panditz:session";
const SESSION_EVENT = "panditz:session-changed";

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(() => readSession());
  useEffect(() => {
    const onChange = () => setSession(readSession());
    window.addEventListener(SESSION_EVENT, onChange);
    return () => window.removeEventListener(SESSION_EVENT, onChange);
  }, []);
  return session;
}

export function signIn(data: { name: string; email: string }) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data, ts: Date.now() }));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

/* ---------------- Form helpers ---------------- */

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-ink-700">
      {children}
    </label>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1 text-[12px] font-semibold text-error">
      {msg}
    </p>
  );
}

function usePersist(kind: string) {
  return (payload: Record<string, unknown>) => {
    try {
      const key = `panditz:${kind}`;
      const list = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
      list.push({ ...payload, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  };
}

function makeRef() {
  return `PZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function SuccessView({
  title,
  desc,
  refCode,
  actionLabel,
  onAction,
}: {
  title: string;
  desc: string;
  refCode?: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="py-4 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-peepal-100 text-peepal-600">
        <IconCheck size={24} />
      </span>
      <h4 className="mt-4 font-display text-xl text-ink-900">{title}</h4>
      <p className="mx-auto mt-2 max-w-xs text-[13.5px] leading-relaxed text-ink-500">{desc}</p>
      {refCode && (
        <p className="mx-auto mt-4 w-fit rounded-sm border border-dashed border-line-strong bg-surface px-4 py-2 font-mono text-[13px] font-bold tracking-widest text-kesari-700">
          {refCode}
        </p>
      )}
      <Button variant="outline" size="sm" className="mt-5" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}

/* ---------------- Booking modal ---------------- */

function BookingForm({ prefill, onDone }: { prefill?: string; onDone: (ref: string) => void }) {
  const { t } = useI18n();
  const persist = usePersist("requests");
  const [f, setF] = useState({ name: "", phone: "", date: "", city: "", occasion: prefill ?? "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (f.name.trim().length < 2) errs.name = t.modals.common.required;
    if (!/^[0-9+\-\s]{10,14}$/.test(f.phone.trim())) errs.phone = t.modals.common.phone;
    if (!f.date) errs.date = t.modals.common.required;
    if (!f.city.trim()) errs.city = t.modals.common.required;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    persist({ type: "booking", ...f });
    onDone(makeRef());
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <p className="text-[13.5px] leading-relaxed text-ink-500">{t.modals.booking.sub}</p>
      <div>
        <Label>{t.modals.common.nameL}</Label>
        <input
          className="field"
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          placeholder={t.modals.common.namePh}
        />
        <Err msg={errors.name} />
      </div>
      <div>
        <Label>{t.modals.common.phoneL}</Label>
        <input
          className="field"
          inputMode="tel"
          value={f.phone}
          onChange={(e) => setF({ ...f, phone: e.target.value })}
          placeholder={t.modals.common.phonePh}
        />
        <Err msg={errors.phone} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t.modals.booking.dateL}</Label>
          <input
            className="field"
            type="date"
            value={f.date}
            onChange={(e) => setF({ ...f, date: e.target.value })}
          />
          <Err msg={errors.date} />
        </div>
        <div>
          <Label>{t.modals.common.cityL}</Label>
          <input
            className="field"
            value={f.city}
            onChange={(e) => setF({ ...f, city: e.target.value })}
            placeholder={t.modals.common.cityPh}
          />
          <Err msg={errors.city} />
        </div>
      </div>
      <div>
        <Label>
          {t.modals.booking.occasionL} <span className="font-normal text-ink-400">{t.modals.booking.optional}</span>
        </Label>
        <select
          className="field"
          value={f.occasion}
          onChange={(e) => setF({ ...f, occasion: e.target.value })}
        >
          <option value="">—</option>
          {t.modals.booking.occasions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" className="w-full" size="lg">
        {t.modals.booking.submit}
        <IconArrowRight size={16} />
      </Button>
    </form>
  );
}

/* ---------------- Join modal ---------------- */

function JoinForm({ onDone }: { onDone: (ref: string) => void }) {
  const { t } = useI18n();
  const persist = usePersist("applications");
  const [f, setF] = useState({ name: "", phone: "", city: "", exp: t.modals.join.exps[1], spec: t.modals.join.specs[0] });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (f.name.trim().length < 2) errs.name = t.modals.common.required;
    if (!/^[0-9+\-\s]{10,14}$/.test(f.phone.trim())) errs.phone = t.modals.common.phone;
    if (!f.city.trim()) errs.city = t.modals.common.required;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    persist({ type: "join", ...f });
    onDone(makeRef());
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <p className="text-[13.5px] leading-relaxed text-ink-500">{t.modals.join.sub}</p>
      <div>
        <Label>{t.modals.common.nameL}</Label>
        <input
          className="field"
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          placeholder={t.modals.common.namePh}
        />
        <Err msg={errors.name} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t.modals.common.phoneL}</Label>
          <input
            className="field"
            inputMode="tel"
            value={f.phone}
            onChange={(e) => setF({ ...f, phone: e.target.value })}
            placeholder={t.modals.common.phonePh}
          />
          <Err msg={errors.phone} />
        </div>
        <div>
          <Label>{t.modals.common.cityL}</Label>
          <input
            className="field"
            value={f.city}
            onChange={(e) => setF({ ...f, city: e.target.value })}
            placeholder={t.modals.common.cityPh}
          />
          <Err msg={errors.city} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t.modals.join.expL}</Label>
          <select className="field" value={f.exp} onChange={(e) => setF({ ...f, exp: e.target.value })}>
            {t.modals.join.exps.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>{t.modals.join.specL}</Label>
          <select className="field" value={f.spec} onChange={(e) => setF({ ...f, spec: e.target.value })}>
            {t.modals.join.specs.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg">
        {t.modals.join.submit}
        <IconArrowRight size={16} />
      </Button>
    </form>
  );
}

/* ---------------- Login modal ---------------- */

function LoginForm({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [f, setF] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (f.name.trim().length < 2) errs.name = t.modals.common.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errs.email = t.modals.common.email;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    signIn({ name: f.name.trim(), email: f.email.trim() });
    onDone();
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <p className="text-[13.5px] leading-relaxed text-ink-500">{t.modals.login.sub}</p>
      <div>
        <Label>{t.modals.common.nameL}</Label>
        <input
          className="field"
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
          placeholder={t.modals.common.namePh}
        />
        <Err msg={errors.name} />
      </div>
      <div>
        <Label>{t.modals.login.emailL}</Label>
        <input
          className="field"
          type="email"
          value={f.email}
          onChange={(e) => setF({ ...f, email: e.target.value })}
          placeholder="you@example.com"
        />
        <Err msg={errors.email} />
      </div>
      <Button type="submit" className="w-full" size="lg">
        {t.modals.login.submit}
        <IconArrowRight size={16} />
      </Button>
      <p className="text-center text-[11.5px] text-ink-400">{t.modals.login.note}</p>
    </form>
  );
}

/* ---------------- Help accordion ---------------- */

function HelpContent() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number>(0);
  return (
    <div className="divide-y divide-line">
      {t.modals.help.items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={item.q}>
            <button
              className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
              onClick={() => setOpenIdx(open ? -1 : i)}
              aria-expanded={open}
            >
              <span className="text-[14px] font-bold text-ink-900">{item.q}</span>
              <IconChevronDown
                size={16}
                className={cx("shrink-0 text-kesari-600 transition-transform duration-200", open && "rotate-180")}
              />
            </button>
            <div className={cx("grid transition-all duration-200", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="pb-4 text-[13px] leading-relaxed text-ink-500">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Provider ---------------- */

export function LandingProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [state, setState] = useState<ModalState>({ kind: null });
  const [formKey, setFormKey] = useState(0);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [joinRef, setJoinRef] = useState<string | null>(null);
  const [loginDone, setLoginDone] = useState(false);

  const open = useCallback((kind: Exclude<ModalState["kind"], null>, payload?: Partial<ModalState>) => {
    setFormKey((k) => k + 1);
    setBookingRef(null);
    setJoinRef(null);
    setLoginDone(false);
    setState({ kind, ...payload });
  }, []);

  const close = useCallback(() => setState({ kind: null }), []);

  useEffect(() => {
    if (loginDone) {
      const id = window.setTimeout(() => close(), 1400);
      return () => window.clearTimeout(id);
    }
  }, [loginDone, close]);

  const puja = state.pujaIdx !== undefined ? t.featured.items[state.pujaIdx] : undefined;
  const legalTitle =
    state.legal === "privacy"
      ? t.modals.legal.privacyTitle
      : state.legal === "terms"
        ? t.modals.legal.termsTitle
        : t.modals.legal.refundTitle;
  const legalBody = state.legal ? t.modals.legal.body[state.legal] : [];
  const cats =
    state.catIdx !== undefined ? [t.modals.services.cats[state.catIdx]] : t.modals.services.cats;

  return (
    <LandingCtx.Provider value={{ open, close }}>
      {children}

      {/* Services catalogue */}
      <Modal open={state.kind === "services"} onClose={close} title={t.modals.services.title} wide>
        <p className="text-[13.5px] leading-relaxed text-ink-500">{t.modals.services.sub}</p>
        <div className="mt-5 space-y-6">
          {cats.map((group) => (
            <div key={group.cat}>
              <h4 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-kesari-700">
                <IconDiya size={14} className="text-kesari-500" />
                {group.cat}
              </h4>
              <ul className="mt-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-3 border-b border-line py-2.5 last:border-0"
                  >
                    <div>
                      <p className="text-[14px] font-semibold text-ink-900">{item.name}</p>
                      <p className="text-[12px] text-ink-400">
                        {t.services.fromLabel} {formatINR(item.from)}
                      </p>
                    </div>
                    <button
                      className="inline-flex items-center gap-1 text-[12.5px] font-bold text-kesari-700 transition hover:text-kesari-800"
                      onClick={() => open("booking", { bookingFor: item.name })}
                    >
                      {t.modals.services.book}
                      <IconArrowRight size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>

      {/* Booking request */}
      <Modal open={state.kind === "booking"} onClose={close} title={t.modals.booking.title}>
        {bookingRef ? (
          <SuccessView
            title={t.modals.booking.okT}
            desc={t.modals.booking.okD}
            refCode={bookingRef}
            actionLabel={t.modals.booking.again}
            onAction={() => {
              setBookingRef(null);
              setFormKey((k) => k + 1);
            }}
          />
        ) : (
          <BookingForm key={`b${formKey}`} prefill={state.bookingFor} onDone={setBookingRef} />
        )}
      </Modal>

      {/* Join as pandit */}
      <Modal open={state.kind === "join"} onClose={close} title={t.modals.join.title}>
        {joinRef ? (
          <SuccessView
            title={t.modals.join.okT}
            desc={t.modals.join.okD}
            refCode={joinRef}
            actionLabel={t.modals.booking.again}
            onAction={() => {
              setJoinRef(null);
              setFormKey((k) => k + 1);
            }}
          />
        ) : (
          <JoinForm key={`j${formKey}`} onDone={setJoinRef} />
        )}
      </Modal>

      {/* Sign in */}
      <Modal open={state.kind === "login"} onClose={close} title={t.modals.login.title}>
        {loginDone ? (
          <SuccessView
            title={t.modals.login.okT}
            desc={t.modals.login.okD}
            actionLabel={t.modals.booking.again}
            onAction={() => {
              setLoginDone(false);
              setFormKey((k) => k + 1);
            }}
          />
        ) : (
          <LoginForm key={`l${formKey}`} onDone={() => setLoginDone(true)} />
        )}
      </Modal>

      {/* Puja details */}
      <Modal open={state.kind === "puja" && !!puja} onClose={close} title={puja ? puja.name : ""}>
        {puja && (
          <div>
            <div className="flex flex-wrap gap-1.5">
              {puja.tags.map((tag) => (
                <Badge key={tag} tone="ink">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{puja.desc}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 rounded-sm border border-line bg-surface px-3.5 py-3">
                <IconClock size={18} className="text-kesari-600" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{t.modals.puja.dur}</p>
                  <p className="text-[13.5px] font-bold text-ink-900">{puja.dur}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-sm border border-line bg-surface px-3.5 py-3">
                <IconRupee size={18} className="text-kesari-600" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{t.modals.puja.from}</p>
                  <p className="text-[13.5px] font-bold text-ink-900">{formatINR(puja.from)}</p>
                </div>
              </div>
            </div>
            <h4 className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-kesari-700">
              <IconBell size={15} className="text-kesari-500" />
              {t.modals.puja.includes}
            </h4>
            <ul className="mt-3 space-y-2">
              {puja.included.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5 text-[13.5px] text-ink-700">
                  <IconCheck size={15} className="mt-0.5 shrink-0 text-peepal-600" />
                  {inc}
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={() => open("booking", { bookingFor: puja.name })}
            >
              {t.modals.puja.book}
              <IconArrowRight size={16} />
            </Button>
          </div>
        )}
      </Modal>

      {/* Legal */}
      <Modal open={state.kind === "legal"} onClose={close} title={legalTitle}>
        <div className="space-y-3.5">
          {legalBody.map((para, i) => (
            <p key={i} className="text-[13.5px] leading-relaxed text-ink-500">
              {para}
            </p>
          ))}
        </div>
        <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[12px] text-ink-400">
          <IconShield size={15} className="text-peepal-600" />
          namaste@panditz.in
        </p>
      </Modal>

      {/* Help & FAQ */}
      <Modal open={state.kind === "help"} onClose={close} title={t.modals.help.title} wide>
        <HelpContent />
      </Modal>
    </LandingCtx.Provider>
  );
}
