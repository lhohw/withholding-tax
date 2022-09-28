import styled from "@emotion/styled";

export type ListProps = {
  width?: number;
};

const List = styled.ul<ListProps>(
  {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    height: "40px",
  },
  (props) => ({
    minWidth: props.width + "px",
    width: props.width + "px",
  })
);

export default List;
