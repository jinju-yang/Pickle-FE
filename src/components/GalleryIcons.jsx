// GalleryIcons.jsx
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

const GalleryIcons = ({ heart, setHeart, check, setCheck, memo, setMemo }) => {
  const handleHeart = () => setHeart(!heart);
  const handleCheck = () => setCheck(!check);
  const handleMemo = () => setMemo(!memo);

  return (
    <GalleryIconsContainer>
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
    </GalleryIconsContainer>
  );
};

export default GalleryIcons;

const GalleryIconsContainer = styled.div`
  display: flex;
  position: absolute;
  top: 60px;
  left: 110px;
`;
