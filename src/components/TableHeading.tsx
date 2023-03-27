import Heading from "./Row/Heading";
import Spreader from "./Spreader";

const TableHeading = () => {
  return (
    <Heading
      key="heading"
      handler={<Spreader />}
      data={[
        "이름",
        "생년월일",
        "입사일",
        "퇴사일",
        "청년",
        "장년",
        ...new Array(12).fill(0).map((_, i) => `${i + 1}월`),
      ]}
    />
  );
};

export default TableHeading;
