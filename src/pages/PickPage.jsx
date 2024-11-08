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
  {
    Qnum: 1,
    question: "어떤 분위기의 작품을 원하시나요?",
    choices: [
      "상관 없음",
      "웃긴",
      "감동적인",
      "무서운",
      "눈물 나는",
      "긴박한",
      "차분한",
    ],
    isSingleChoice: false,
  },
  {
    Qnum: 2,
    question: "어떤 형태의 작품을 원하시나요?",
    choices: ["상관 없음", "책", "음악", "영화", "시리즈"],
    isSingleChoice: false,
  },
  {
    Qnum: 3,
    question: "혼자인가요? 함께인가요?",
    choices: ["상관 없음", "1인", "2인", "3인 이상"],
    isSingleChoice: false,
  },
  {
    Qnum: 4,
    question: "지금 시간이 얼마나 있나요?",
    choices: [
      "상관 없음",
      "30분 이하",
      "30분 ~ 1시간",
      "1시간 ~ 2시간",
      "2시간 이상",
    ],
    isSingleChoice: true, // Mark as single choice
  },
];

const PickPage = () => {
  const navigate = useNavigate();
  const { setResult } = useResult(); // Access setResult from context
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
      navigate("/result");

      const response = await fetch("your_backend_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
