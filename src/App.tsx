import React, { useState, useEffect } from "react";
import { ClassicProfilePage } from "./classic-profile/ClassicProfilePage";
import { EditorialProfilePage } from "./editorial-profile/EditorialProfilePage";
import {
  RouteViewSwitcher,
  AppRouteMode,
} from "./Layouts/components/RouteViewSwitcher";

const resolveRouteFromLocation = (): AppRouteMode => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search);

  if (
    path.includes("/classic") ||
    hash.includes("classic") ||
    params.get("view") === "classic"
  ) {
    return "classic";
  }

  return "editorial";
};

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRouteMode>(
    resolveRouteFromLocation,
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(resolveRouteFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSwitchRoute = (targetRoute: AppRouteMode) => {
    const nextPath = targetRoute === "editorial" ? "/editorial" : "/classic";
    window.history.pushState({}, "", nextPath);
    setCurrentRoute(targetRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {currentRoute === "editorial" ? (
        <EditorialProfilePage id="editorial-view" />
      ) : (
        <ClassicProfilePage id="classic-view" />
      )}
      <RouteViewSwitcher
        id="global-route-switcher"
        currentRoute={currentRoute}
        onSwitchRoute={handleSwitchRoute}
      />
    </>
  );
};

export default App;
