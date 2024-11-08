// utils.js
export const cleanSelectedChoices = (choices) => {
  return Object.fromEntries(
    Object.entries(choices).map(([questionId, choiceIndices]) => [
      questionId,
      Object.keys(choiceIndices)
        .filter((index) => index !== "0")
        .reduce((acc, key) => ({ ...acc, [key]: choiceIndices[key] }), {}),
    ])
  );
};

export const toggleChoice = (choices, questionId, choiceIdx) => {
  return {
    ...choices,
    [questionId]: {
      ...(choices[questionId] || {}),
      [choiceIdx]: !(choices[questionId]?.[choiceIdx] || false),
    },
  };
};
