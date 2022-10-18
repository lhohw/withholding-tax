import React from "react";
import { CorporateState } from "../corporateSlice";
import { CorporateRow } from "./index";

type CorporateResultProps = {
  payment: CorporateState[string]["data"][string]["total"]["payment"];
  generation: CorporateState[string]["data"][string]["total"]["generation"];
};
const CorporateResult = ({ payment, generation }: CorporateResultProps) => {
  return (
    <>
      {["total", "youth", "manhood"].map((type) => (
        <CorporateRow
          key={type}
          isHeading
          type={type}
          payments={payment}
          generations={generation[type as keyof typeof generation].map((v) =>
            v.toString()
          )}
        />
      ))}
    </>
  );
};

export default React.memo(CorporateResult);
