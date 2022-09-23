import { css } from "@emotion/react";
import React from "react";

const App = () => {
  return (
    <div>
      <div
        css={css`
          color: red;
        `}
      >
        blue
      </div>
    </div>
  );
};

export default App;
