import React, { useState } from "react";
import Question from "./Question";
import Summary from "./Summary";
import "../styles/Quiz.scss";

function Quiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [previousQuestion, setPreviousQuestion] = useState(false);
  const [questionStatus, setQuestionStatus] = useState(
    questions.map(() => ({ answered: false, correct: false }))
  );

  // Handle the post-flow of option selection
  const handleAnswer = (isCorrect, setSelectedOption) => {
    const newStatus = [...questionStatus];
    newStatus[currentQuestionIndex] = { answered: true, correct: isCorrect };
    setPreviousQuestion(false);
    setQuestionStatus(newStatus);

    if (isCorrect) setScore(score + 1);
    if (currentQuestionIndex < questions.length - 1) {
      // Progress to the next question once option is selected
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle the last question to display summary screen
      setCompleted(true);
    }
  };

  // Handle the display of previous question in correct order
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setPreviousQuestion(true);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Re-attempting the questions without reloading the page
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCompleted(false);
    setQuestionStatus(
      questions.map(() => ({ answered: false, correct: false }))
    );
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz">
        {!completed ? (
          <>
            <div className="progress-container">
              <div className="question_title">
                <button
                  className="previous-button"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/left-arrow.svg`}
                    style={{ height: "13px" }}
                    alt="Previous"
                  />
                </button>
                <div className="question-number">
                  <span className="current-number">
                    {`${currentQuestionIndex + 1}`.padStart(2, "0")}
                  </span>
                  <span className="total-number">
                    / {`${questions.length}`.padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="question-container">
              <div
                className={`question ${
                  currentQuestionIndex === questions.length - 1
                    ? "slide-out"
                    : "slide-in"
                }`}
              >
                <Question
                  question={questions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  previousQuestion={previousQuestion}
                />
              </div>
            </div>
          </>
        ) : (
          // Questions summary screen to display the final result
          <Summary
            score={score}
            total={questions.length}
            questionStatus={questionStatus}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
