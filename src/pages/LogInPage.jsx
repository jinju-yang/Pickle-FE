import { useState } from "react";
import styled from "styled-components";
import { InitialPages, Phrase } from "./InitialPage";
import { BoldContainer } from "../components/Comment";
import YellowButton from "../components/YellowButton";
import { useNavigate } from "react-router-dom";

export const LogInPage = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Construct the request body for login
    const requestBody = {
      loginId,
      password,
    };

    // Log request body to the console (simulating the login request)
    console.log("Request Body:", requestBody);
    navigate("/main");
  };

  return (
    <InitialPages>
      <Phrase />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <BoldContainer style={{ color: "white" }}>ID</BoldContainer>
          <LogInput
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <BoldContainer style={{ color: "white" }}>비밀번호</BoldContainer>
          <LogInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "150%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <YellowButton content={"로그인하기"} onClick={handleLogin} />
        </div>
      </div>
    </InitialPages>
  );
};

export const LogInput = styled.input`
  display: inline-block;
  padding: 30px;
  display: flex;
  align-items: center;
  height: 66px;
  background: #e4ff37;
  border-radius: 50px;
  border: none;
  font-size: 22px;
  margin: 20px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 6px white inset;
  }
`;
