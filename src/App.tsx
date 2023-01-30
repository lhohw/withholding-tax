import ErrorBoundary from "components/ErrorBoundary";
import Reader from "features/reader/Reader";
import Corporate from "features/corporate/Corporate";
import Loading from "features/loading/Loading";

import { useAppSelector } from "app/hooks";

const App = () => {
  const { loading } = useAppSelector((state) => state.loading);
  const { list, selected } = useAppSelector((state) => state.reader);
  const { year, corporate } = selected;
  return (
    <ErrorBoundary>
      <div>
        <Reader />
        {loading ? (
          <Loading />
        ) : year && corporate ? (
          <Corporate RN={corporate} year={year} data={list[corporate]} />
        ) : null}
      </div>
    </ErrorBoundary>
  );
};

export default App;
