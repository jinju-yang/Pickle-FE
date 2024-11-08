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
  const [galleryData, setGalleryData] = useState([]);

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  // Fetch gallery data from the backend with accessToken
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        // Retrieve accessToken from localStorage (or wherever it's stored)
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch("your_backend_url", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add the accessToken to the request
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setGalleryData(data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
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
        {galleryData.map((item, index) => (
          <GalleryItem key={index}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Liked: {item.liked ? "Yes" : "No"}</p>
            <p>Watched: {item.watched ? "Yes" : "No"}</p>
            <p>Memoed: {item.memoed ? "Yes" : "No"}</p>
          </GalleryItem>
        ))}
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
