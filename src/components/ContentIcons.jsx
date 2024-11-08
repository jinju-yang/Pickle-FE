// ContentIcons.jsx
import styled from "styled-components";
import {
  IoHeartCircleOutline,
  IoHeartCircleSharp,
  IoCloudCircle,
  IoCloudCircleOutline,
} from "react-icons/io5";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { useState } from "react";

const ContentIcons = () => {
  const [heart, setHeart] = useState(false);
  const [check, setCheck] = useState(false);
  const [memo, setMemo] = useState(false);

  const handleHeart = () => setHeart(!heart);
  const handleCheck = () => setCheck(!check);
  const handleMemo = () => setMemo(!memo);

  return (
    <ContentIconsContainer>
      <div onClick={handleHeart}>
        {heart ? (
          <IoHeartCircleSharp style={{ color: "red", fontSize: "40px" }} />
        ) : (
          <IoHeartCircleOutline style={{ fontSize: "40px" }} />
        )}
      </div>
      <div onClick={handleCheck}>
        {check ? (
          <IoIosCheckmarkCircle style={{ color: "blue", fontSize: "40px" }} />
        ) : (
          <IoIosCheckmarkCircleOutline style={{ fontSize: "40px" }} />
        )}
      </div>
      <div onClick={handleMemo}>
        {memo ? (
          <IoCloudCircle style={{ color: "brown", fontSize: "40px" }} />
        ) : (
          <IoCloudCircleOutline style={{ fontSize: "40px" }} />
        )}
      </div>
    </ContentIconsContainer>
  );
};

export default ContentIcons;

const ContentIconsContainer = styled.div`
  display: flex;
  position: absolute;
  top: 30px;
  right: 60px;
`;
