import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { I18nProvider } from "./landing/i18n";
import { LandingProvider } from "./landing/modals";
import { LandingPage } from "./landing/LandingPage";
import { AppShell } from "./app/AppShell";

/* ============================================================
   PanditZ routing.
   (public)  /      → LandingPage   — no auth guard
   (app)     /app   → AppShell      — authenticated entry
   HashRouter keeps deep links working on static hosting.
   ============================================================ */

export default function App() {
  return (
    <I18nProvider>
      <LandingProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppShell />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </LandingProvider>
    </I18nProvider>
  );
}
