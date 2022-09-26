import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import colors from "constants/colors";
import * as font from "constants/font";

import { yearRegex } from "constants/regex";

import {
  mergePerson,
  setPersonnel,
  CorporateState,
} from "features/corporate/corporateSlice";
import { setPayment } from "features/payment/paymentSlice";

import { readPDF } from "lib/readPDF";
import { Person } from "features/person/personAPI";

const Title = () => (
  <h2
    css={css`
      font-weight: bold;
      margin: 0 0 1rem 0;
    `}
  >
    Withholding Tax
  </h2>
);
type InputProps = {
  // onClick: () => void;
  onClick: any;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ onClick, onFileChange }: InputProps) => (
  <div
    css={css`
      display: flex;
      width: 100px;
      padding: 0.3rem;
      margin: 0;
      align-items: center;
      justify-content: center;
      border: 1px solid ${colors.black800};
      border-radius: 6px;
      position: relative;
      font-size: ${font.size.small};
      cursor: pointer;
    `}
    onClick={onClick}
  >
    <label
      css={css`
        cursor: pointer;
      `}
      htmlFor="reader"
    >
      PDF 불러오기
    </label>
    <input
      id="reader"
      css={css`
        display: none;
      `}
      name="reader"
      title="PDF 불러오기"
      type="file"
      accept=".pdf"
      onChange={onFileChange}
      multiple
    />
  </div>
);
type CorporatesProps = {
  corporates: CorporateState["list"];
  onCorporateClick: (id: string) => void;
  selected?: string;
};
const Corporates = ({
  corporates,
  onCorporateClick,
  selected,
}: CorporatesProps) => (
  <ul
    css={css`
      padding: 1rem;
      font-weight: bold;
      font-size: ${font.size.medium};
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-left: 2rem;
      max-width: 50vw;
    `}
  >
    {Object.entries(corporates).map(([key, value]) => (
      <li
        css={css`
          display: flex;
          padding: 0.5rem;
          color: ${key === selected ? colors.main : colors.black100};
          border: 1px solid ${colors.main};
          border-radius: 6px;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          & + & {
            margin-left: 1rem;
          }
        `}
        key={key}
        onClick={() => onCorporateClick(key)}
      >
        {value.name}
      </li>
    ))}
  </ul>
);
type HeaderProps = {
  children: React.ReactNode;
};
const Header = ({ children }: HeaderProps) => (
  <header
    css={css`
      width: 100%;
      padding: 1rem;
      margin: 0;
      border-bottom: 0.5px solid ${colors.black700};
      box-shadow: 0 3px 3px ${colors.blue700};
      display: flex;
      flex-direction: row;
    `}
  >
    {children}
  </header>
);

const Reader = () => {
  const dispatch = useAppDispatch();
  const { list, selected } = useAppSelector((state) => state.corporate);

  const onCorporateClick = useCallback(
    (id: string) => {
      dispatch(setPersonnel(id));
      dispatch(setPayment(list[id]));
    },
    [dispatch, list]
  );
  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fReader = new FileReader();
      const { files } = e.target;
      if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
          fReader.readAsDataURL(files[0]);
          fReader.onloadend = async ({ target: { result } }: any) => {
            const withholdingTaxData = await readPDF(result);
            for (const { data, left } of withholdingTaxData) {
              const year = parseInt(data[0][0].replace(yearRegex, ""));
              const person = new Person({ data, left });
              dispatch(mergePerson({ year, data: JSON.stringify(person) }));
            }
          };
        }
      }
    },
    [dispatch]
  );
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      // @ts-ignore
      if (e.target.tagName === "DIV") {
        const input = document.querySelector("#reader") as HTMLInputElement;
        input.click();
        e.stopPropagation();
      }
    },
    []
  );
  return (
    <Header>
      <div
        css={css`
          flex-direction: column;
        `}
      >
        <Title />
        <Input onClick={onClick} onFileChange={onFileChange} />
      </div>
      <Corporates
        corporates={list}
        onCorporateClick={onCorporateClick}
        selected={selected}
      />
    </Header>
  );
};

export default Reader;
