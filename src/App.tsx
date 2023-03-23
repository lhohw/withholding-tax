// import { useCallback, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Table from "pages/Table";
import Main from "pages/Main";
import SocialInsurance from "pages/SocialInsurance";
import EmploymentIncrease from "pages/EmploymentIncrease";

import Variation from "components/Variation";

const App = () => {
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
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Table />} />
          <Route path="/" element={<VariationWithOutlet />}>
            <Route path="socialInsurance" element={<SocialInsurance />} />
            <Route path="employmentIncrease" element={<EmploymentIncrease />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const VariationWithOutlet = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (max-width: 1240px) {
        align-items: flex-start;
      }
    `}
  >
    <Variation />
    <Outlet />
  </div>
);
export default App;
