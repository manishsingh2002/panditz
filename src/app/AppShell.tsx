import { useNavigate } from "react-router-dom";
import { useI18n } from "../landing/i18n";
import { signOut, useSession } from "../landing/modals";
import { Button, Container } from "../design-system/primitives";
import { IconKalash, Logo } from "../design-system/icons";

/* ============================================================
   AppShell — placeholder for the authenticated application
   ("/app"). Visiting the landing page never destroys an
   existing session; signed-in users get a clear entry back
   into the product from the header.
   ============================================================ */

export function AppShell() {
  const { t } = useI18n();
  const session = useSession();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#/" aria-label="PanditZ — home" className="rounded-xs transition hover:opacity-85">
            <Logo descriptor />
          </a>
          <div className="flex items-center gap-2.5">
            <Button size="sm" variant="outline" href="#/">
              {t.nav.home}
            </Button>
            {session && (
              <Button size="sm" variant="ghost" onClick={handleSignOut}>
                {t.nav.signOut}
              </Button>
            )}
          </div>
        </Container>
      </header>

      <main className="flex min-h-[72vh] items-center justify-center px-5 py-16">
        <div className="w-full max-w-md text-center">
          <span className="mx-auto flex h-20 w-16 items-end justify-center overflow-hidden rounded-t-full rounded-b-md border border-kesari-200 bg-kesari-100 pb-3 text-kesari-700">
            <IconKalash size={26} />
          </span>
          <h1 className="mt-6 text-[1.6rem] text-ink-900">
            {session ? `${t.app.title}, ${session.name}` : t.app.guestTitle}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink-500">
            {session ? t.app.body : t.app.guestBody}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button variant="outline" href="#/">
              {t.nav.home}
            </Button>
            {session ? (
              <Button variant="ghost" onClick={handleSignOut}>
                {t.nav.signOut}
              </Button>
            ) : (
              <Button onClick={() => navigate("/")}>{t.nav.login}</Button>
            )}
          </div>
          <p className="mt-6 font-dev text-[15px] text-kesari-500" aria-hidden="true">
            ॐ
          </p>
        </div>
      </main>
    </div>
  );
}
