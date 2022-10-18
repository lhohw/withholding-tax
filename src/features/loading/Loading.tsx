import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import { degToRad } from "lib/utils";
import colors from "constants/colors";

const opacityAnim = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner>
        {new Array(12).fill(0).map((_, i) => (
          <SpinnerItem key={i} idx={i} />
        ))}
      </Spinner>
    </LoadingContainer>
  );
};

const SpinnerItem = styled.div<{ idx: number }>(
  {
    width: "14px",
    height: "26px",
    position: "absolute",
    backgroundColor: colors.main,
    borderRadius: "50%",
    opacity: 0.1,
  },
  (props) => ({
    top: 60 - 47 * Math.cos(degToRad(30 * props.idx)) + "px",
    left: 60 + 47 * Math.sin(degToRad(30 * props.idx)) + "px",
    transform: `translate(-50%, -50%) rotateZ(${props.idx * 30}deg)`,
    animation: `${opacityAnim} 1s ease-in ${props.idx * (1 / 12)}s infinite`,
  })
);

const LoadingContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${colors.black300};
  opacity: 0.7;
  z-index: 20;
`;
const Spinner = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;
export default React.memo(Loading);
