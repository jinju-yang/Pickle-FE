import styled from "styled-components";
import { BoldContainer } from "./Comment";

const GalleryContent = ({ img, title }) => {
  return (
    <GalleryContentContainer>
      <Poster src={img} />
      <BoldContainer>{title}</BoldContainer>
    </GalleryContentContainer>
  );
};

export default GalleryContent;

const GalleryContentContainer = styled.div`
  width: 195px;
  height: 308px;
  background: #ffffff;
  border-radius: 19px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const Poster = styled.img`
  width: 150px;
`;
