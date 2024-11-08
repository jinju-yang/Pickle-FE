import { useResult } from "../context/ResultContext";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";
import YellowButton from "../components/YellowButton";
import { cleanSelectedChoices, toggleChoice } from "../components/Util";
import { useState } from "react";
import styled from "styled-components";
import LOGO from "../assets/logo3.svg";
import { InitialPages } from "./InitialPage";

const questions = [
  // ... your question objects
];

const PickPage = () => {
  const navigate = useNavigate();
  const { setResult } = useResult();
  const [selectedChoices, setSelectedChoices] = useState({});
  const [hiddenChoices, setHiddenChoices] = useState({});

  const handleChoiceSelect = (questionId, choiceIdx, isSingleChoice) => {
    const isNoneSelected = choiceIdx === 0;

    setSelectedChoices((prevSelectedChoices) => {
      if (isNoneSelected) {
        const allChoicesSelected = selectAllChoices(questionId);
        return { ...prevSelectedChoices, [questionId]: allChoicesSelected };
      } else {
        return toggleChoice(prevSelectedChoices, questionId, choiceIdx);
      }
    });
  };

  const selectAllChoices = (questionId) => {
    return questions[questionId - 1].choices
      .slice(1)
      .reduce((acc, _, idx) => ({ ...acc, [idx + 1]: true }), {});
  };

  const handleSaveAsJson = async () => {
    const cleanedChoices = cleanSelectedChoices(selectedChoices);
    const selectedChoicesJson = JSON.stringify(cleanedChoices, null, 2);

    try {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve token if available

      // Configure headers with accessToken if the user is logged in
      const headers = {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), // Add Authorization header if logged in
      };

      const response = await fetch("lets-pickle", {
        method: "POST",
        headers,
        body: selectedChoicesJson,
      });

      if (!response.ok) throw new Error("Failed to send data.");

      const resultData = await response.json();
      setResult(resultData); // Store response in context
      navigate("/result"); // Navigate to Result page
    } catch (error) {
      console.error("Error:", error);
    } finally {
      console.log(selectedChoicesJson);
    }
  };

  return (
    <InitialPages>
      <div style={{ backgroundColor: "#ffffff", display: "inline-block" }}>
        <img src={LOGO} alt="Logo" />
      </div>
      <QuestionWrapper>
        {questions.map((question) => (
          <Question
            key={question.Qnum}
            question={question}
            selectedChoices={selectedChoices}
            onSelectChoice={handleChoiceSelect}
            hiddenChoices={hiddenChoices}
          />
        ))}
      </QuestionWrapper>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <YellowButton
          content={"Let's Pick-Click!"}
          onClick={handleSaveAsJson}
        />
      </div>
    </InitialPages>
  );
};

export default PickPage;

const QuestionWrapper = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px;
`;
