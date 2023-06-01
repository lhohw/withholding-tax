import { useCallback } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { VscBook } from "react-icons/vsc";

import useCorporate from "hooks/useCorporate";

import { read } from "lib/api/readerAPI";

import { loadingState } from "recoil/base/atom";

import Employee from "models/Employee";

import Metaphor from ".";

const Reader = () => {
  const { addEmployees } = useCorporate();
  const setLoading = useSetRecoilState(loadingState({ type: "reader" }));

  const readFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return null;
      setLoading(true);

      const res: Employee[][] = [];
      for (let i = 0; i < files.length; i++) {
        const fReader = new FileReader();
        fReader.readAsArrayBuffer(files[i]);
        fReader.onloadend = async ({ target: { result: data } }: any) => {
          let employees;
          try {
            employees = (await read(data as ArrayBuffer))!;
            res.push(employees);
          } catch (e) {
            console.log(`Error in file read - "${files[i].name}"\n`, e);
            setLoading(false);
            return;
          }
          if (res.length === files.length) {
            await addEmployees(
              res.reduce((acc, employees) => acc.concat(employees), [])
            );
            setLoading(false);
          }
        };
        fReader.onerror = (e) => {
          console.log(e);
        };
      }
    },
    [addEmployees, setLoading]
  );

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      readFiles(files);
    },
    [readFiles]
  );

  const onInputClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON") {
        const input = document.querySelector("#reader") as HTMLInputElement;
        input.click();
        e.stopPropagation();
      }
    },
    []
  );
  return (
    <Metaphor title="PDF 불러오기" onClick={onInputClick}>
      <label
        css={css`
          cursor: pointer;
        `}
        htmlFor="reader"
      >
        <VscBook size={"100%"} />
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
    </Metaphor>
  );
};

export default Reader;
