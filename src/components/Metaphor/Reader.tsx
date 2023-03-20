import { useCallback } from "react";
import { css } from "@emotion/react";
import { VscBook } from "react-icons/vsc";

import useCorporate from "hooks/useCorporate";
import { read } from "lib/api/readerAPI";

import Metaphor from ".";
import Employee from "models/Employee";

const Reader = () => {
  const { addEmployees } = useCorporate();

  const readFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return null;
      const res: Employee[][] = [];
      for (let i = 0; i < files.length; i++) {
        const fReader = new FileReader();
        fReader.readAsArrayBuffer(files[i]);
        fReader.onloadend = async ({ target: { result: data } }: any) => {
          const employees = (await read(data))!;
          res.push(employees);
          if (res.length === files.length) {
            addEmployees(
              res.reduce((acc, employees) => acc.concat(employees), [])
            );
          }
        };
      }
    },
    [addEmployees]
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
