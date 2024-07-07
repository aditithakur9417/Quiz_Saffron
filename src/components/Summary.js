import React from "react";
import "../styles/Summary.scss";

function Summary({ score, total, questionStatus, onRetry }) {
  return (
    <div className="summary">
      <h2>Quiz Summary</h2>
      <p>
        Your score: {score} / {total}
      </p>
      <ul>
        {questionStatus.map((status, index) => (
          <li
            key={index}
            className={
              status.answered ? (status.correct ? "correct" : "incorrect") : ""
            }
          >
            Question {index + 1}:{" "}
            {status.answered
              ? status.correct
                ? "Correct"
                : "Incorrect"
              : "Not Answered"}
          </li>
        ))}
      </ul>
      <button className="retry-button" onClick={onRetry}>
        Re-attempt Quiz
      </button>
    </div>
  );
}

export default Summary;
