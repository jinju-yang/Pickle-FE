import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const score = 70;

export const CircularProgressChart = ({
  size = "100px",
  value = score,
  pathColor = "#007C5F",
  trailColor = "#dee6ac",
  textColor = "#2B2D36",
}) => {
  return (
    <ProgressbarContainer $size={size}>
      <CircularProgressbar
        value={value}
        text={`${value}점`}
        className="progressbar"
        strokeWidth={10}
        styles={buildStyles({
          pathColor,
          trailColor,
          textColor,
        })}
      />
    </ProgressbarContainer>
  );
};

const ProgressbarContainer = styled.div`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
`;
