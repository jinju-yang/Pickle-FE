import styled from "styled-components";
import LOGO from "../assets/logo3.svg";
import YellowButton from "../components/YellowButton";
import { useNavigate } from "react-router-dom";

export const InitialPages = styled.div`
  background-color: #007c5f;
  min-height: 100vh;
  padding: 70px;
  position: relative;
`;

export const Phrase = () => {
  return (
    <>
      <div
        style={{
          color: "white",
          fontSize: "36px",
          fontFamily: "Inter",
          marginBottom: "10px",
        }}
      >
        <strong>오늘은 뭐볼까? 픽-클로 간단하게 픽하자!</strong>
      </div>
      <div style={{ backgroundColor: "#ffffff", display: "inline-block" }}>
        <img src={LOGO} />
      </div>
    </>
  );
};

export const InitialPage = () => {
  const navigate = useNavigate();
  return (
    <InitialPages>
      <Phrase />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <YellowButton
            content={"로그인"}
            onClick={() => {
              navigate("/log-in");
            }}
          />
          <YellowButton
            content={"회원가입"}
            onClick={() => {
              navigate("/sign-up");
            }}
          />
        </div>
        <div>
          <YellowButton
            content={"컨텐츠 추천 바로가기 🍿"}
            onClick={() => {
              navigate("/pickle");
            }}
          />
        </div>
      </div>
    </InitialPages>
  );
};
