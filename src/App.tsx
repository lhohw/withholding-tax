import Reader from "features/reader/Reader";
import Corporate from "features/corporate/Corporate";
import Loading from "features/loading/Loading";

import { useAppSelector } from "app/hooks";

document
  .querySelector("body")!
  .addEventListener("selectstart", (e) => e.preventDefault());

const App = () => {
  const { loading } = useAppSelector((state) => state.loading);
  const { list, selected } = useAppSelector((state) => state.reader);
  const { year, corporate } = selected;

  return (
    <div style={{ paddingBottom: "1rem" }}>
      <Reader />
      {year && corporate && (
        <Corporate RN={corporate} year={year} data={list[corporate]} />
      )}
      {loading && <Loading />}
    </div>
  );
};

export default App;
