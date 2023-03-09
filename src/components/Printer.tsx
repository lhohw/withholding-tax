import { useCallback } from "react";
import Metaphor from "./Metaphor";
import { AiFillPrinter } from "react-icons/ai";

const Printer = () => {
  const print = useCallback(() => window.print(), []);
  return (
    <Metaphor title="프린트" onClick={print}>
      <AiFillPrinter size={"100%"} />
    </Metaphor>
  );
};

export default Printer;
