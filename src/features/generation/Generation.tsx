import React, { useCallback } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Item from "components/Item";
import List from "components/List";

import Info from "features/info/Info";

import * as font from "constants/font";
import colors from "constants/colors";

import { getLastYears } from "lib/utils";

import { InfoState, toggle } from "features/info/infoSlice";
import { check } from "features/generation/generationSlice";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { GenerationState } from "./generationSlice";

type GenerationFolderItemProps = {
  title: string;
  content: string;
  month?: number;
};
const GenerationFolderItem = ({
  title,
  content,
  month = 12,
}: GenerationFolderItemProps) => (
  <li
    css={css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `}
  >
    {title}
    {`${(+content / month).toFixed(2)} [${content}]`}
  </li>
);

type GenerationFolderProps = {
  year: string;
};
const GenerationFolder = ({ year }: GenerationFolderProps) => (
  <div
    css={css`
      position: absolute;
      left: 0;
      top: -100px;
      border: 1px solid black;
      height: 100px;
      width: 600px;
      display: flex;
      flex-direction: row;
      align-items: center;
    `}
  >
    <span
      css={css`
        font-size: ${font.size.large};
        font-weight: ${font.weight.bold};
        margin-left: 1rem;
      `}
    >
      {year}
    </span>
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        font-size: ${font.size.medium};
        margin-left: 0.5rem;
      `}
    >
      {["합", "전체", "청년", "장년"].map((title) => (
        <GenerationFolderItem key={title} title={title} content={"10"} />
      ))}
    </ul>
  </div>
);

type GenerationItemProps = {
  contents: string[];
  year?: string;
};
const GenerationItem = ({ contents, year }: GenerationItemProps) => (
  <List
    css={css`
      /* border-left: 1px solid ${colors.base}; */
      position: relative;
    `}
  >
    {year && <GenerationFolder year={year} />}
    {contents.map((content, idx) => (
      <Item key={content + idx} width={50}>
        {content}
      </Item>
    ))}
  </List>
);

const GenerationRowHeading = ({ years }: { years: string[] }) => (
  <List
    css={css`
      margin-top: 100px;
      font-weight: ${font.weight.bold};
      min-width: 3370px;
    `}
  >
    <Info.Heading />
    {years.map((year) => (
      <GenerationItem
        key={year}
        year={year}
        contents={new Array(12).fill(0).map((_, i) => `${i + 1}월`)}
      />
    ))}
  </List>
);

type GenerationRowProps = {
  id: string;
  onToggle: (id: string) => void;
  info: InfoState[keyof InfoState];
  generation: GenerationState["generation"][string];
  years: string[];
};
const GenerationRow = ({
  id,
  onToggle,
  info,
  generation,
  years,
}: GenerationRowProps) => {
  const { checked } = info;
  return (
    <List
      css={css`
        min-width: 3370px;
        color: ${checked ? colors.red600 : colors.base};
        text-decoration: ${checked ? "line-through" : "none"};
      `}
    >
      <Info id={id} info={info} onToggle={onToggle} />
      {years.map((year) => (
        <GenerationItem key={year} contents={generation[year]} />
      ))}
    </List>
  );
};

type GenerationTotalProps = {
  years: string[];
  total: GenerationState["total"];
};
const PaymentTotal = ({ years, total }: GenerationTotalProps) => (
  <ul
    css={css`
      display: flex;
      font-weight: ${font.weight.semibold};
      flex-direction: column;
    `}
  >
    {(["total", "youth", "manhood"] as (keyof typeof total[string])[]).map(
      (key) => (
        <List
          key={key}
          css={css`
            min-width: 3370px;
          `}
        >
          <Info.Heading
            data={[
              key === "total" ? "전체" : key === "youth" ? "청년" : "장년",
            ]}
          />
          {years.map((year) => (
            <GenerationItem
              contents={total[year][key].map((e) => e.toString())}
            />
          ))}
        </List>
      )
    )}
  </ul>
);

const Generation = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.info);
  const { generation, total } = useAppSelector((state) => state.generation);
  const years = getLastYears(5);

  const onToggle = useCallback(
    (id: string) => {
      dispatch(check({ id, checked: info[id].checked }));
      dispatch(toggle(id));
    },
    [dispatch, info]
  );
  return (
    <ul>
      <GenerationRowHeading years={years} />
      <ul
        css={css`
          max-height: 220px;
          min-width: 3371px;
          overflow-y: scroll;
          border: 0.5px dotted ${colors.base};
        `}
      >
        {Object.keys(info).map((id) => (
          <GenerationRow
            key={id}
            id={id}
            onToggle={onToggle}
            info={info[id]}
            generation={generation[id]}
            years={years}
          />
        ))}
      </ul>
      {Object.keys(total).length && (
        <PaymentTotal years={years} total={total} />
      )}
    </ul>
  );
};

export default Generation;
