import { useState, useEffect } from "react";

import { useSmoothScroll } from "./hooks/useSmoothScroll";
import App from "./App";
import ForBrandsPage from "./pages/for-brands";
import ForSchoolsPage from "./pages/for-schools";
import ForAgenciesPage from "./pages/for-agencies";
import PressPage from "./pages/press";
import ContactPage from "./pages/contact";
import LegalPage from "./pages/legal";
import { privacyPolicy, termsOfUse } from "./data/legal-content";

function getRoute() {
  return window.location.hash.replace("#", "") || "/";
}

export default function Router() {
  const [route, setRoute] = useState(getRoute);

  useSmoothScroll();

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // "/press/<releaseId>" opens the newsroom scrolled to that release's plate.
  if (route.startsWith("/press")) {
    return <PressPage focusRelease={route.split("/")[2] || null} />;
  }

  switch (route) {
    case "/for-brands":
      return <ForBrandsPage />;
    case "/for-schools":
      return <ForSchoolsPage ucla />;
    case "/for-agencies":
      return <ForAgenciesPage />;
    case "/contact":
      return <ContactPage />;
    case "/privacy":
      return <LegalPage doc={privacyPolicy} />;
    case "/terms":
      return <LegalPage doc={termsOfUse} />;
    default:
      return <App />;
  }
}
