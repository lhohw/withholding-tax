import { useMemo } from "react";
import { Outlet } from "react-router-dom";

import useYear from "hooks/useYear";
import useCorporate from "hooks/useCorporate";

import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/Header";
import TextFallback from "components/TextFallback";
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
        <TextFallback message={message} />
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </ErrorBoundary>
  );
};

export default Main;
