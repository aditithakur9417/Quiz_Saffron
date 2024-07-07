import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz";
import questionsData from "./data/questions.json";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const shuffledQuestions = questionsData.questions.sort(
      () => Math.random() - 0.5
    );
    setQuestions(shuffledQuestions);
  }, []);

  return (
    <div className="App">
      {questions.length > 0 ? (
        <Quiz questions={questions} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
