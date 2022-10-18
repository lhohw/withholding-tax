import React, { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";

import { readAsync, select } from "./readerSlice";
import { setLoading } from "features/loading/loadingSlice";

import {
  Title,
  Input,
  Corporates,
  Sidebar,
  Years,
  Printer,
} from "./components";

const Reader = () => {
  const dispatch = useAppDispatch();
  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (files && files.length) {
        dispatch(setLoading(true));
        const results: any[] = [];
        for (let i = 0; i < files.length; i++) {
          const fReader = new FileReader();
          fReader.readAsArrayBuffer(files[i]);
          fReader.onloadend = async ({ target: { result } }: any) => {
            results.push(await dispatch(readAsync(result)));
            if (results.length === files.length) dispatch(setLoading(false));
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
  const onSelect = useCallback(
    ({ type, data }: { type: "year" | "corporate"; data: string }) =>
      dispatch(select({ type, data })),
    [dispatch]
  );
  const { selected, list } = useAppSelector((state) => state.reader);
  const { year, corporate } = selected;

  return (
    <Sidebar>
      <div className="column">
        <Title />
        <Printer />
        <Input onClick={onInputClick} onFileChange={onFileChange} />
      </div>
      {corporate && <Years onSelect={onSelect} selectedYear={year} />}
      <Corporates
        corporates={list}
        onSelect={onSelect}
        selectedCorporate={corporate}
      />
    </Sidebar>
  );
};

export default React.memo(Reader);
