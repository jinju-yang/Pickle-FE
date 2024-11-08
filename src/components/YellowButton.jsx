import styled from "styled-components";

const YellowButton = ({ content, onClick }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <YellowButtonContainer onClick={onClick}>{content}</YellowButtonContainer>
    </div>
  );
};

export default YellowButton;

const YellowButtonContainer = styled.button`
  display: inline-block;
  padding: 30px;
  display: flex;
  align-items: center;
  height: 66px;
  background: #e4ff37;
  border-radius: 50px;
  border: none;
  font-size: 22px;
  margin: 20px;
  &:hover {
    box-shadow: 0 0 0 6px white inset;
  }
`;
