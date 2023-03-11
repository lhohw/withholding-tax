import React from "react";
import { CorporateState } from "../corporateSlice";
import { CorporateRow } from "./index";

type CorporateResultProps = {
  salary: CorporateState[string]["data"][string]["total"]["salary"];
  generation: CorporateState[string]["data"][string]["total"]["generation"];
};
const CorporateResult = ({ salary, generation }: CorporateResultProps) => {
  return (
    <>
      {["total", "youth", "manhood"].map((type) => (
        <CorporateRow
          key={type}
          isHeading
          type={type}
          payments={salary}
          generations={generation[type as keyof typeof generation].map((v) =>
            v.toString()
          )}
        />
      ))}
    </>
  );
};

export default React.memo(CorporateResult);
