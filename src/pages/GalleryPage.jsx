// GalleryPage.jsx
import styled from "styled-components";
import Header from "../components/Header";
import GalleryContent from "../components/GalleryContent";
import GalleryIcons from "../components/GalleryIcons";
import Pagination from "../components/Pagination";
import { useState } from "react";
import poster from "/moviePoster.png";

const gallery_data = [
  { img: poster, title: "청설", liked: true, watched: true, memoed: true },
  { img: poster, title: "위키드", liked: true, watched: false, memoed: true },
  {
    img: poster,
    title: "소년이 온다",
    liked: false,
    watched: true,
    memoed: true,
  },
  { img: poster, title: "영화~", liked: false, watched: false, memoed: true },
  { img: poster, title: "드라마~", liked: true, watched: true, memoed: false },
  { img: poster, title: "책", liked: true, watched: false, memoed: false },
  { img: poster, title: "음악", liked: false, watched: true, memoed: true },
  { img: poster, title: "앨범", liked: true, watched: true, memoed: true },
  { img: poster, title: "픽클", liked: false, watched: false, memoed: false },
  { img: poster, title: "드라마~", liked: true, watched: false, memoed: true },
];

const GalleryPage = () => {
  const [heart, setHeart] = useState(false);
  const [check, setCheck] = useState(false);
  const [memo, setMemo] = useState(false);

  // Filtering the gallery data based on the selected icons
  const filteredData = gallery_data.filter((item) => {
    if (heart && !item.liked) return false;
    if (check && !item.watched) return false;
    if (memo && !item.memoed) return false;
    return true;
  });

  return (
    <GalleryPageContainer>
      <Header />
      <GalleryIcons
        heart={heart}
        setHeart={setHeart}
        check={check}
        setCheck={setCheck}
        memo={memo}
        setMemo={setMemo}
      />
      <div style={{ display: "flex", flexWrap: "wrap", padding: "30px 80px" }}>
        {filteredData.map((item, idx) => (
          <GalleryContent key={idx} img={item.img} title={item.title} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination />
      </div>
    </GalleryPageContainer>
  );
};

export default GalleryPage;

export const GalleryPageContainer = styled.div`
  background-color: #007c5f;
  min-height: 100vh;
`;
