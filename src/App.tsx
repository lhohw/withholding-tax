import Reader from "features/reader/Reader";
import Corporate from "features/corporate/Corporate";

import { useAppSelector } from "app/hooks";

const App = () => {
  const { list, selected } = useAppSelector((state) => state.reader);
  const { year, corporate } = selected;
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <Reader />
      {year && corporate && <Corporate year={year} data={list[corporate]} />}
    </div>
  );
};

export default App;
