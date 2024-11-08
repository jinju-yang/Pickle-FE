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
  const [historyData, setHistoryData] = useState([]); // State for history data
  const [loading, setLoading] = useState(true);

  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  // Fetch history data with accessToken for user authentication
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // Retrieve accessToken from localStorage
        const accessToken = localStorage.getItem("accessToken");

        // Ensure token exists before making request
        if (!accessToken) {
          console.error("No access token found. Redirecting to login.");
          navigate("/login"); // Redirect to login if no token is available
          return;
        }

        const response = await fetch("/gallery", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include accessToken in headers
          },
        });

        if (!response.ok) throw new Error("Failed to fetch history data.");

        const data = await response.json();
        setHistoryData(data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchHistoryData();
  }, [navigate]);

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

      {/* Render history data */}
      <HistoryContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          historyData.map((item) => (
            <HistoryItem key={item.contentId}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>Created at: {item.createdAt}</p>
            </HistoryItem>
          ))
        )}
      </HistoryContainer>
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

const HistoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const HistoryItem = styled.div`
  margin: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;

  img {
    max-width: 150px;
    border-radius: 5px;
  }

  h3 {
    margin: 5px 0;
  }

  p {
    color: #555;
  }
`;
