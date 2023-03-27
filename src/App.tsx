import { css } from "@emotion/react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Table from "pages/Table";
import Main from "pages/Main";
import SocialInsurance from "pages/SocialInsurance";
import EmploymentIncrease from "pages/EmploymentIncrease";

import Variation from "components/Variation";

const App = () => {
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
