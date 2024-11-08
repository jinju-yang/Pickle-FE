// ChoiceButton.js
import styled from "styled-components";

const ChoiceButton = styled.button`
  display: ${({ hidden }) => (hidden ? "none" : "inline-block")};
  background-color: ${({ isSelected }) => (isSelected ? "#007c5f" : "#ffffff")};
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#007c5f")};
  border: 1px solid #007c5f;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #54aa96;
    color: #ffffff;
  }
`;

export default ChoiceButton;
