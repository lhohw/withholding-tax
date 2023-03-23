import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

import useYear from "hooks/useYear";
import useCorporate from "hooks/useCorporate";

import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/Header";
import Layout from "components/Layout";

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
        <Layout>
          <Outlet />
        </Layout>
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
      text-shadow: 1px 1px 5px var(--placeholder);
    `}
  >
    {message}
  </div>
);

export default Main;
