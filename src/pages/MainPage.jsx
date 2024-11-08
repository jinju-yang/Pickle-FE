import styled from "styled-components";
import ICON from "../assets/ICON.svg";
import { LuMenu } from "react-icons/lu";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";

const MainPage = () => {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [galleryData, setGalleryData] = useState([]); // State for gallery data
  const [loading, setLoading] = useState(true);

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  // Fetch gallery data from the backend when the component mounts
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch("/lets-pickle", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // If you need authentication, add the Authorization header
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },
        });

        if (!response.ok) throw new Error("Failed to fetch gallery data.");

        const data = await response.json();
        setGalleryData(data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchGalleryData();
  }, []);

  return (
    <div>
      <Header noBackKey={true} />
      {sideBar ? (
        <SideBar onClose={handleSideBar} />
      ) : (
        <StyledLuMenu size={"70px"} onClick={handleSideBar} />
      )}
      <Search />
      <PICKLEContainer>
        <PICKLE
          src={ICON}
          alt="App Icon"
          onClick={() => {
            navigate("/pickle");
          }}
        />
      </PICKLEContainer>

      {/* Render the gallery items */}
      <GalleryContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          galleryData.map((item, index) => (
            <GalleryItem key={item.contentId}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>Released: {item.releasedAt}</p>
              <p>Category: {item.category}</p>
              <p>Author: {item.author}</p>
              <p>Description: {item.description}</p>
              <p>Genre: {item.genre}</p>
              <p>Emotion: {item.emotion}</p>
            </GalleryItem>
          ))
        )}
      </GalleryContainer>
    </div>
  );
};

export default MainPage;

// Styled components
const StyledLuMenu = styled(LuMenu)`
  position: absolute;
  z-index: 10;
  left: 10px;
  top: -5px;
`;

const PICKLE = styled.img`
  cursor: pointer;
  position: fixed;
  left: 50%;
  top: 40%;
  &:hover {
    transform: scale(1.1);
  }
`;

const PICKLEContainer = styled.div`
  position: relative;
  width: 99%;
  height: 100%;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const GalleryItem = styled.div`
  margin: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;

  img {
    max-width: 150px;
    border-radius: 5px;
  }
`;
