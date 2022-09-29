import React from "react";

import Reader from "features/reader/Reader";
import Corporate from "features/corporate/Corporate";

import { useAppSelector, useAppDispatch } from "app/hooks";

const App = () => {
  const { data, year, selected, list } = useAppSelector(
    (state) => state.corporate
  );
  const name = selected ? list[selected].name : "";
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <Reader />
      {year && <Corporate data={data[year]} year={year} name={name} />}
    </div>
  );
};

export default App;
