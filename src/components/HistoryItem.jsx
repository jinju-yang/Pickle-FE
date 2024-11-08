import { useState } from "react";
import styled from "styled-components";
import { BoldContainer } from "./Comment";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const HistoryItem = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <CreatedAt>{history.createdAt}</CreatedAt>
      <HistoryContainer $isOpen={isOpen}>
        <BoldContainer>{history.title}</BoldContainer>
        <ToggleContainer onClick={toggleOpen}>
          나의 대답과 일치도
          {isOpen ? (
            <IoMdArrowDropup size={"30px"} />
          ) : (
            <IoMdArrowDropdown size={"30px"} />
          )}
        </ToggleContainer>
      </HistoryContainer>
    </div>
  );
};

export default HistoryItem;

const CreatedAt = styled.div`
  color: white;
  text-align: center;
`;

const HistoryContainer = styled.div`
  width: 90%;
  height: ${({ $isOpen }) => ($isOpen ? "200px" : "100px")};
  background: #ffffff;
  border: 1px solid #e4ff37;
  border-radius: 19px;
  padding: 10px;
  margin: 10px;
`;

const ToggleContainer = styled.div`
  text-align: right;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
