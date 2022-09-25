import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import colors from "constants/colors";

import { setPersonnel } from "./readerSlice";
import { readPDF } from "lib/readPDF";

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
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ onFileChange }: InputProps) => (
  <div
    css={css`
      display: flex;
      width: 100px;
      padding: 0.3rem;
      align-items: center;
      justify-content: center;
      border: 1px solid ${colors.black800};
      border-radius: 6px;
      position: relative;
      font-size: 0.8rem;
    `}
  >
    PDF 불러오기
    <input
      css={css`
        margin: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
      `}
      title="file"
      type="file"
      accept=".pdf"
      onChange={onFileChange}
      multiple
    />
  </div>
);
type CorporatesProps = {
  corporates: string[];
  onCorporateClick: (id: number) => void;
  selected: number;
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
      font-size: 0.9rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-left: 2rem;
      max-width: 50vw;
    `}
  >
    {corporates.map((corporate, idx) => (
      <li
        css={css`
          display: flex;
          padding: 0.5rem;
          color: ${idx === selected ? colors.blue800 : colors.black800};
        `}
        key={corporate}
        onClick={() => onCorporateClick(idx)}
      >
        {corporate}
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
  const { corporates, selected } = useAppSelector((state) => state.reader);
  const onCorporateClick = useCallback(
    (id: number) => {
      dispatch(setPersonnel(id));
    },
    [dispatch]
  );
  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fReader = new FileReader();
      const { files } = e.target;
      if (files && files.length) {
        console.log(files);
        for (let i = 0; i < files.length; i++) {
          fReader.readAsDataURL(files[0]);
          fReader.onloadend = async ({ target: { result } }: any) => {
            const withholdingTaxData = await readPDF(result);
            for (const { data, left } of withholdingTaxData) {
              // const person = new Person({ data, left });
              // dispatch(mergePerson(JSON.stringify(person)));
            }
          };
        }
      }
    },
    [dispatch]
  );
  return (
    <Header>
      <div
        css={css`
          flex-direction: column;
        `}
      >
        <Title />
        <Input onFileChange={onFileChange} />
      </div>
      <Corporates
        corporates={corporates}
        onCorporateClick={onCorporateClick}
        selected={selected}
      />
    </Header>
  );
};

export default Reader;
