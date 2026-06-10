import { useState, useEffect } from "react";
import App from "./App";
import ForBrandsPage from "./pages/for-brands";
import ForSchoolsPage from "./pages/for-schools";
import ForAgenciesPage from "./pages/for-agencies";
import PressPage from "./pages/press";
import LegalPage from "./pages/legal";
import { privacyPolicy, termsOfUse } from "./data/legal-content";

function getRoute() {
  return window.location.hash.replace("#", "") || "/";
}

export default function Router() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  switch (route) {
    case "/for-brands":
      return <ForBrandsPage />;
    case "/for-schools":
      return <ForSchoolsPage />;
    case "/for-agencies":
      return <ForAgenciesPage />;
    case "/press":
      return <PressPage />;
    case "/privacy":
      return <LegalPage doc={privacyPolicy} />;
    case "/terms":
      return <LegalPage doc={termsOfUse} />;
    default:
      return <App />;
  }
}
