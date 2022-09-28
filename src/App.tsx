import React from "react";

import Reader from "features/reader/Reader";
import Corporate from "features/corporate/Corporate";

import Card, { Front } from "Card";
import { css } from "@emotion/react";

const App = () => {
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <Reader />
      <Corporate />
    </div>
  );
};

export default App;
