import React from "react";
import { css } from "@emotion/react";

import Reader from "features/reader/Reader";
import Corporate from "features/corporate/Corporate";

const App = () => {
  return (
    <div>
      <Reader />
      <Corporate />
    </div>
  );
};

export default App;
