import { css } from "@emotion/react";
import * as font from "constants/font";

type StatDataType = {
  title: string;
  data: number;
  month?: number;
};
const StatData = ({ title, data, month = 12 }: StatDataType) => (
  <div
    css={css`
      display: flex;
      flex-direction: row;
      font-size: ${font.size.medium};
    `}
  >
    <span
      css={css`
        font-weight: ${font.weight.semibold};
        width: 40px;
        text-align: center;
      `}
    >
      {title}
    </span>
    <span>{`${(data / month).toFixed(2)} [${data}]`}</span>
  </div>
);

const Stats = () => (
  <div
    css={css`
      display: flex;
      flex: 1;
      border: 1px solid black;
      padding: 1rem;
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      `}
    >
      <StatData title="합" data={15} />
      <StatData title="청년" data={15} />
      <StatData title="장년" data={15} />
    </div>
  </div>
);

export default Stats;
