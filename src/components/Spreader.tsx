import { css } from "@emotion/react";
import { AiOutlineShrink, AiOutlineExpandAlt } from "react-icons/ai";

import Item from "./Item";
import { useRecoilState } from "recoil";
import { toggleState } from "recoil/base";
import { useCallback } from "react";

const Spreader = () => {
  const [isSpread, setSpread] = useRecoilState(toggleState("spread"));
  const toggleSpread = useCallback(
    () => setSpread(!isSpread),
    [isSpread, setSpread]
  );
  return (
    <Item
      key="spreader"
      width={50}
      css={css`
        cursor: pointer;
      `}
      onClick={toggleSpread}
    >
      {isSpread ? (
        <AiOutlineShrink size={"100%"} />
      ) : (
        <AiOutlineExpandAlt size={"100%"} />
      )}
    </Item>
  );
};

export default Spreader;
