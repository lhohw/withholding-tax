import { css } from "@emotion/react";

const color = "#e0c97b";
const borderColor = "#ffffff";
const backgroundColor = "#323030";
const Item = ({ title, desc }: { title: string; desc: string }) => (
  <div
    css={css`
      display: inline-block;
      min-width: 180px;
      padding: 0.2rem;
      color: ${color};
      font-size: 0.6rem;
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding-left: 0.3rem;
      `}
    >
      <span
        css={css`
          font-weight: bold;
        `}
      >
        {title}
      </span>
      <span
        css={css`
          margin-left: 0.2rem;
        `}
      >
        {desc}
      </span>
    </div>
  </div>
);
const Card = () => {
  const T = "02-6412-0227";
  const M = "010-7620-8624";
  const F = "0503-777-7777";
  const E = "Kangjunhyeong@naver.com";
  const infos = { T, M, F, E };
  const address = "서울특별시 송파구 법원로92 파트너스1, 802호";

  const tax = [
    "기장·조정·신고",
    "세무조사·조세불복",
    "상속세·경정청구",
    "양도·상속·증여 신고 및 컨설팅",
  ];

  return (
    <div
      css={css`
        border: 1px solid ${borderColor};
        width: 400px;
        height: 200px;
        display: flex;
        flex-direction: column;
        background-color: ${backgroundColor};
        margin: 1rem;
        padding: 0.5rem;
        font-weight: bold;
      `}
    >
      <div
        css={css`
          flex: 7;
          flex-direction: column;
          position: relative;
          color: ${color};
          border-bottom: 0.5px solid ${borderColor};
        `}
      >
        <div
          css={css`
            position: absolute;
            left: 0.5rem;
            top: 0.5rem;
          `}
        >
          {tax.map((t) => (
            <div
              css={css`
                font-size: 0.6rem;
                color: ${color};
                margin-top: 0.2rem;
              `}
            >
              -{t}
            </div>
          ))}
        </div>
        <div
          css={css`
            position: absolute;
            right: 0.5rem;
            bottom: 0.5rem;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
          `}
        >
          대표세무사{" "}
          <span
            css={css`
              font-size: 1.5rem;
              font-weight: bold;
              margin-left: 1rem;
            `}
          >
            강 준 형
          </span>
        </div>
      </div>
      <div
        css={css`
          flex: 3;
          flex-direction: row;
          flex-wrap: wrap;
        `}
      >
        {Object.entries(infos).map(([key, val]) => (
          <Item title={key} desc={val} />
        ))}
        <div
          css={css`
            color: ${color};
            font-size: 0.8em;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-left: 0.3rem;
            justify-content: flex-start;
            height: 20px;
            padding: 0.7rem 0;
            font-size: 0.6rem;
          `}
        >
          <span
            css={css`
              font-weight: bold;
              margin-left: 0.2rem;
            `}
          >
            A
          </span>
          <span
            css={css`
              margin-left: 0.3rem;
            `}
          >
            {address}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Front = () => {
  return (
    <div
      css={css`
        border: 1px solid ${borderColor};
        width: 400px;
        height: 200px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: ${color};
        font-weight: bolder;
        font-size: 1.2rem;
        background-color: ${backgroundColor};
        margin-left: 1rem;
      `}
    >
      <img
        src={`https://sohodoc.nicedata.co.kr/cm/CM_ImgLoader.do?fileSeq=M000349212`}
        css={css`
          width: 30px;
          height: 30px;
          object-fit: contain;
        `}
        alt={""}
      />
      <span
        css={css`
          margin-left: 1rem;
        `}
      >
        강준형 세무회계
      </span>
    </div>
  );
};

export default Card;
