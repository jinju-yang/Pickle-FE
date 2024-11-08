import { createContext, useContext, useState } from "react";

// Create a context to hold the result data
const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState(null); // State to hold the result data

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useResult = () => useContext(ResultContext);
