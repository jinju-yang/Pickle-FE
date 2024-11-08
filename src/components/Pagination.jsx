import styled from "styled-components";
import { useState } from "react";

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-bottom: 10px;
`;

const SquareContainer = styled.div`
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  background: ${(props) => (props.selected ? "#E4FF37" : "#FAFAFA")};
  color: "#282828";
  border: 1px solid #b8b8b8;
  border-radius: 100%;
  flex: none;
  padding: 12px;
  text-align: center;
  cursor: pointer;
`;

const Square = ({ content, selected, onClick }) => {
  return (
    <SquareContainer selected={selected} onClick={onClick}>
      {content}
    </SquareContainer>
  );
};

const Pagination = () => {
  const [selected, setSelected] = useState(1);

  const handleSelected = (page) => {
    setSelected(page);
  };

  return (
    <PaginationContainer>
      {[1, 2, 3, 4, 5].map((num) => (
        <Square
          key={num}
          content={num}
          selected={selected === num}
          onClick={() => handleSelected(num)}
        />
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
