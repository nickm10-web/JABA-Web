import { useState, useEffect } from "react";
import App from "./App";
import ForBrandsPage from "./pages/for-brands";
import ForSchoolsPage from "./pages/for-schools";
import ForAgenciesPage from "./pages/for-agencies";
import DoordashPage from "./pages/doordash";
import PressPage from "./pages/press";

function getRoute() {
  const hashRoute = window.location.hash.replace("#", "");
  if (hashRoute) return hashRoute;
  return window.location.pathname || "/";
}

export default function Router() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const syncRoute = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  switch (route) {
    case "/for-brands":
      return <ForBrandsPage />;
    case "/for-schools":
      return <ForSchoolsPage />;
    case "/for-agencies":
      return <ForAgenciesPage />;
    case "/doordash":
      return <DoordashPage />;
    case "/press":
      return <PressPage />;
    default:
      return <App />;
  }
}
