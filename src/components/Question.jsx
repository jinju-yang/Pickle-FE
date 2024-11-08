// Question.js
import styled from "styled-components";
import ChoiceButton from "./ChoiceButton";

const Question = ({
  question,
  selectedChoices,
  onSelectChoice,
  hiddenChoices,
}) => {
  return (
    <QuestionContainer>
      <div>{`❓ ${question.question}`}</div>
      <ChoiceContainer>
        {question.choices.map((choice, idx) => {
          const isNoneChoice = idx === 0;
          const isChoiceHidden = hiddenChoices[question.Qnum] && !isNoneChoice;

          return (
            <ChoiceButton
              key={idx}
              isSelected={selectedChoices[question.Qnum]?.[idx] || false}
              onClick={() =>
                onSelectChoice(question.Qnum, idx, question.isSingleChoice)
              }
              hidden={isChoiceHidden}
            >
              {choice}
            </ChoiceButton>
          );
        })}
      </ChoiceContainer>
    </QuestionContainer>
  );
};

export default Question;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  gap: 4px;
  width: 543px;
  min-width: 360px;
  height: 200px;
  gap: 20px;
  border: 6px solid #e4ff37;
  background: #ffffff;
  border-radius: 40px;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;
