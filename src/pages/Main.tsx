import { useMemo } from "react";
import { css } from "@emotion/react";

import useYear from "hooks/useYear";
import useCorporate from "hooks/useCorporate";

import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  const { selectedYear } = useYear();
  const { selectedCorporate } = useCorporate();

  const message = useMemo(
    () => `Please Select ${!selectedCorporate.selected ? "CORPORATE" : "YEAR"}`,
    [selectedCorporate]
  );
  return (
    <ErrorBoundary>
      <Header />
      {!selectedYear.selected || !selectedCorporate.selected ? (
        <Fallback message={message} />
      ) : (
        <Outlet />
      )}
    </ErrorBoundary>
  );
};

const Fallback = ({ message }: { message: string }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
      align-items: center;
      font-size: 2rem;
      color: var(--black);
      background: var(--main-gradient);
      text-shadow: 1px 1px 5px var(--placeholder);
    `}
  >
    {message}
  </div>
);
export default Main;
