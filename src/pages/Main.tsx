import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import useYear from "hooks/useYear";
import useCorporate from "hooks/useCorporate";

import { loadingState } from "recoil/base/atom";

import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/Header";
import TextFallback from "components/TextFallback";
import Layout from "components/Layout";
import Loading from "components/Loading";

const Main = () => {
  const { selectedYear } = useYear();
  const { selectedCorporate } = useCorporate();
  const isLoading = useRecoilValue(loadingState({ type: "reader" }));

  const message = useMemo(
    () => `Please Select ${!selectedCorporate.selected ? "CORPORATE" : "YEAR"}`,
    [selectedCorporate]
  );
  return (
    <ErrorBoundary>
      <Header />
      {isLoading ? (
        <Loading />
      ) : !selectedYear.selected || !selectedCorporate.selected ? (
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
