import Metaphor from "./Metaphor";
import { VscBook } from "react-icons/vsc";

const Reader = () => {
  return (
    <Metaphor title="PDF 불러오기" onClick={() => null}>
      <VscBook size={"100%"} />
    </Metaphor>
  );
};

export default Reader;
