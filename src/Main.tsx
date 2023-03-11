// import { useCallback, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "App";
// import Calculator from "features/calculator/Calculator";

const Main = () => {
  // const onSelectStart = useCallback((e: Event) => e.preventDefault(), []);

  // const onModeChange = useCallback(
  //   (e: { matches: boolean }) => {
  //     dispatch(setTheme(e.matches ? "dark" : "light"));
  //   },
  //   [dispatch]
  // );

  // const matched = useMemo(
  //   () => window.matchMedia("(prefers-color-scheme: dark)"),
  //   []
  // );
  // const body = useMemo(() => document.querySelector("body")!, []);
  // useEffect(() => {
  //   body.addEventListener("selectstart", onSelectStart);
  //   matched.addEventListener("change", onModeChange);
  //   window.onbeforeprint = () => {
  //     matched.removeEventListener("change", onModeChange);
  //   };
  //   window.onafterprint = () => {
  //     matched.addEventListener("change", onModeChange);
  //   };
  //   return () => {
  //     body.removeEventListener("onselectstart", onSelectStart);
  //     matched.removeEventListener("change", onModeChange);
  //   };
  // }, [body, matched, onModeChange, onSelectStart]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/calculator" element={<Calculator />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
