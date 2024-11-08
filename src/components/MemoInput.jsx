// MemoInput.jsx
import { useState } from "react";
import styled from "styled-components";
import YellowButton from "./YellowButton";
import Toggle from "./Toggle";

const MemoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  text-align: center;
`;

const TextArea = styled.textarea`
  margin: 0 auto;
  padding: 20px;
  width: 90%;
  height: 208px;
  border: 5px solid #e4ff37;
  border-radius: 39px;
  font-size: 16px;
  resize: none;
`;

const MemoInput = ({ onSave }) => {
  const [memo, setMemo] = useState("");

  const handleInputChange = (e) => {
    setMemo(e.target.value);
  };

  const handleSaveClick = () => {
    if (memo.trim()) {
      onSave(memo); // Pass memo text to parent
      setMemo(""); // Clear the input after saving
    }
  };

  return (
    <MemoInputContainer>
      <Toggle />
      <TextArea
        placeholder="메모를 입력하세요"
        value={memo}
        onChange={handleInputChange}
      />
      <YellowButton content={"메모 저장"} onClick={handleSaveClick} />
    </MemoInputContainer>
  );
};

export default MemoInput;
