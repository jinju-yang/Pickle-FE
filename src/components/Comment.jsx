import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const CommentContainer = styled.div`
  width: 90%;
  height: ${({ height }) => height || "148px"};
  border: 5px solid #e4ff37;
  border-radius: 39px;
  padding: 20px;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  gap: 25px;
  margin: 20px auto;
  position: relative;
`;
export const BoldContainer = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  /* identical to box height */
  color: #000000;
`;

const MemoContainer = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
  /* identical to box height */
  color: #1e1e1e;
`;
const PiDotsThreeVerticalBoldContainer = styled.div`
  position: absolute;
  right: 50px;
  top: 25px;
`;
const Popup = styled.div`
  position: absolute;
  top: 30px; /* Position the popup below the icon */
  right: 0;
  width: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;
const PopUpButton = styled.button`
  width: 100%;
  border-radius: 10px;
  top: 50px;
  padding: 7px;
  background-color: white;
  font-size: 17px;
  border: none;
  &:hover {
    background-color: #e8e8e8;
  }
`;
export const Comment = ({ memberName, memo }) => {
  return (
    <CommentContainer>
      <BoldContainer>{memberName}</BoldContainer>
      <MemoContainer>{memo}</MemoContainer>
    </CommentContainer>
  );
};

export const MyComment = ({ myMemo }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const iconRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close the popup when clicking outside
  const handleClickOutside = (event) => {
    if (iconRef.current && !iconRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <CommentContainer flexDirection="row" height="80px">
      <MemoContainer>{myMemo}</MemoContainer>
      <PiDotsThreeVerticalBoldContainer ref={iconRef} onClick={togglePopup}>
        <PiDotsThreeVerticalBold size={24} />
      </PiDotsThreeVerticalBoldContainer>

      {isPopupOpen && (
        <Popup>
          <PopUpButton>메모 수정하기</PopUpButton>
          <PopUpButton>메모 삭제하기</PopUpButton>
        </Popup>
      )}
    </CommentContainer>
  );
};
