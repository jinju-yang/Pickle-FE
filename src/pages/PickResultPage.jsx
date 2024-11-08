import styled from "styled-components";
import { InitialPages } from "./InitialPage";
import { BoldContainer } from "../components/Comment";
import { useResult } from "../context/ResultContext";
import { CircularProgressChart } from "../components/CircularProgressChart";

const PickResultPage = () => {
  const { result } = useResult();

  return (
    <InitialPages>
      <ResultContainer>
        <div>
          <BoldContainer>{"오늘의 선택은...?"}</BoldContainer>
          <img src={result.img} style={{ margin: "15px" }} />
        </div>
        <DescribeContainer style={{ fontSize: "15px" }}>
          <BoldContainer>{result.title}</BoldContainer>
          <div>{result.releasedAt}</div>
          <div>{result.category}</div>
          <div>{result.author}</div>
          <div>{result.description}</div>
          <div>{result.genre}</div>
          <div>{result.emotion}</div>
        </DescribeContainer>
        <div>나의 대답과 일치도</div>
        <CircularProgressChart />
      </ResultContainer>
    </InitialPages>
  );
};

export default PickResultPage;

const ResultContainer = styled.div`
  width: 943px;
  height: 632px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 39px;
  padding: 30px;
  display: flex;
  gap: 15px;
`;

const DescribeContainer = styled.div`
  margin: 35px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
