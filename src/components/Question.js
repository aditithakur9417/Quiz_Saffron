import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Question.scss";

function Question({ question, onAnswer, previousQuestion }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [previousQuestiont, setPreviousQuestiont] = useState(false);
  useEffect(() => {
    // Associate index with prefined order of data
    let alphabetOptions = question.options.map((option, index) => ({
      option,
      index: String.fromCharCode(97 + index), // 97 is the ASCII code for 'a'
    }));
    // Randomize the order of options with assocaited indeces
    let RandomizedOptions = alphabetOptions.sort(() => Math.random() - 0.5);
    setOptions(RandomizedOptions);
  }, [question]);

  useEffect(() => {
    setPreviousQuestiont(previousQuestion);
  }, [previousQuestion]);

  // Handle the post-flow of option selection
  const handleOptionClick = (option, index) => {
    setSelectedOption(index);
    setTimeout(() => onAnswer(option.isCorrect, setSelectedOption), 500); // Delay to show transition
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="question"
    >
      {/* Animation for question title */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={
            question.question + (previousQuestion ? "_backward" : "_forward")
          }
          initial={{ x: previousQuestion ? "-10%" : "10%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: previousQuestion ? "10%" : "-10%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {question.question}
        </motion.h2>
      </AnimatePresence>

      <div className="bottom-wrapper">
        <div className="question-type">History of Art</div>
        <div className="options">
          {/* Animation for question related options */}
          <AnimatePresence mode="wait">
            {options.map((option, index) => (
              <motion.button
                key={option.option.label} // Using unique key for each option
                initial={
                  previousQuestion
                    ? { x: "-7%", opacity: 0 }
                    : { x: "7%", opacity: 0 }
                }
                animate={{ x: 0, opacity: 1 }}
                exit={
                  previousQuestion
                    ? { x: "5%", opacity: 0 }
                    : { x: "-5%", opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                onClick={() => handleOptionClick(option, index)}
                className={`option-button ${
                  selectedOption === index ? "selected" : ""
                }`}
              >
                <span className="option-index">{option.index}. </span>
                <span>{option.option.label}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Question;
