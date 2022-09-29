import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import { yearRegex } from "constants/regex";

import {
  mergePerson,
  setPersonnel,
  setYear,
} from "features/corporate/corporateSlice";
import { readAsync } from "./readerSlice";

import { readPDF } from "lib/readPDF";
import { Person } from "features/person/personAPI";

import { Title, Input, Corporates, Sidebar, Years } from "./components";

const Reader = () => {
  const dispatch = useAppDispatch();
  const { list, selected } = useAppSelector((state) => state.corporate);

  const onCorporateClick = useCallback(
    (id: string) => dispatch(setPersonnel(id)),
    [dispatch]
  );
  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fReader = new FileReader();
      const { files } = e.target;
      if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
          fReader.readAsDataURL(files[0]);
          fReader.onloadend = async ({ target: { result } }: any) => {
            // const withholdingTaxData = await readPDF(result);
            // for (const { data, left } of withholdingTaxData) {
            //   const year = parseInt(data[0][0].replace(yearRegex, ""));
            //   const person = new Person({ data, left });
            //   dispatch(mergePerson({ year, data: JSON.stringify(person) }));
            // }
            await dispatch(readAsync(result));
          };
        }
      }
    },
    [dispatch]
  );
  const onInputClick = useCallback(
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
  const onYearClick = useCallback(
    (year: string) => dispatch(setYear(year)),
    [dispatch]
  );
  const { year } = useAppSelector((state) => state.corporate);

  return (
    <Sidebar>
      <div
        css={css`
          flex-direction: column;
        `}
      >
        <Title />
        <Input onClick={onInputClick} onFileChange={onFileChange} />
      </div>
      {selected && (
        <Years onYearClick={onYearClick} selectedYear={year || "-1"} />
      )}
      <Corporates
        corporates={list}
        onCorporateClick={onCorporateClick}
        selected={selected}
      />
    </Sidebar>
  );
};

export default Reader;
