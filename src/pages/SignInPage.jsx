import { useState } from "react";
import { InitialPages } from "./InitialPage";
import { Phrase } from "./InitialPage";
import { BoldContainer } from "../components/Comment";
import { LogInput } from "./LogInPage";
import YellowButton from "../components/YellowButton";

const SignUpPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [loginIdError, setLoginIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(null); // Track sign-up status

  const validateLoginId = (id) => {
    // Check if `loginId` is unique (a placeholder for actual unique check logic)
    if (!/^[a-zA-Z0-9_.-]+$/.test(id)) {
      setLoginIdError("ID에는 영어, 숫자, 언더바만 포함할 수 있습니다");
      return false;
    }
    setLoginIdError("");
    return true;
  };

  const validatePassword = (pw) => {
    // Password validation: must contain letters, numbers, and special characters
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(pw)) {
      setPasswordError(
        "비밀번호는 8자 이상, 영어, 숫자, 특수문자가 포함되어야 합니다"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateLoginId(loginId) && validatePassword(password)) {
      const requestBody = {
        username: loginId,
        password: password,
        nickName: nickName,
      };

      // Send the POST request to the backend
      fetch("/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (response.ok) {
            setSignUpSuccess("회원가입에 성공했습니다!");
            console.log("회원가입 성공:", requestBody);
          } else {
            // Attempt to parse error JSON, handle empty or invalid JSON response
            return response.text().then((text) => {
              let errorMessage = "회원가입에 실패했습니다.";
              try {
                const data = JSON.parse(text);
                errorMessage = data.message || errorMessage;
              } catch {
                console.warn("Invalid JSON response:", text);
              }
              throw new Error(errorMessage);
            });
          }
        })
        .catch((error) => {
          setSignUpSuccess(`에러: ${error.message}`);
          console.error("회원가입 에러:", error);
        });
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
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            onBlur={() => validateLoginId(loginId)}
          />
        </div>
        {loginIdError && (
          <div style={{ color: "#ff7777", textAlign: "center" }}>
            {loginIdError}
          </div>
        )}

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
            onBlur={() => validatePassword(password)}
          />
        </div>
        {passwordError && (
          <div style={{ color: "#ff7777", textAlign: "center" }}>
            {passwordError}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <BoldContainer style={{ color: "white" }}>닉네임</BoldContainer>
          <LogInput
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "140%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <YellowButton content={"로그인하기"} onClick={handleSubmit} />
        </div>

        {signUpSuccess && (
          <div
            style={{
              color: signUpSuccess.includes("성공") ? "#4CAF50" : "#ff7777",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {signUpSuccess}
          </div>
        )}
      </div>
    </InitialPages>
  );
};

export default SignUpPage;
