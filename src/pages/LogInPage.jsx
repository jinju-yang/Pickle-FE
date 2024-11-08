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

  // Example login function
  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const accessToken = data.accessToken; // Assuming your backend returns { accessToken: "your_token" }

      // Store the token in localStorage
      localStorage.setItem("accessToken", accessToken);

      // Redirect to another page or update UI as needed
      navigate("/main"); // Example: navigate to the main page
    } catch (error) {
      console.error("Error during login:", error);
    }
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
