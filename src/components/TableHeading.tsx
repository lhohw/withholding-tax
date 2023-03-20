import { css } from "@emotion/react";

import Row from "./Row";
import Spreader from "./Spreader";

const TableHeading = () => {
  return (
    <Row
      key="heading"
      css={css`
        border-bottom: 1.2px dashed var(--navy);
      `}
      handler={<Spreader />}
      isHeading
      data={[
        "이름",
        "생년월일",
        "입사일",
        "퇴사일",
        "청년",
        "장년",
        ...new Array(12).fill(0).map((_, i) => `${i + 1}월`),
      ]}
    />
  );
};

export default TableHeading;
