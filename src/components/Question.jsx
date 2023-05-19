import React, { useState } from "react";

const Question = ({ question, options, onNextQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setIsCorrect(false);
    onNextQuestion(isCorrect);
  };

  const checkAnswer = () => {
    setIsAnswered(true);
    setIsCorrect(selectedOption === question.correctAnswer);
  };
  return (
    <div>
      <h2>[#{question.id}]{" "}{question.text}</h2> 
      {question.image && <img src={question.image} alt="Question" />}
      <ol type="a">
        {options.map((option) => (
          <li
            key={option}
            style={{
              backgroundColor:
                isAnswered && option === question.correctAnswer
                  ? "green"
                  : isAnswered && option === selectedOption
                  ? "red"
                  : "white",
            }}
          >
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                disabled={isAnswered}
              />
              {option}
            </label>
          </li>
        ))}
      </ol>
      <div>
        {isAnswered ? (
          <button style={{ marginLeft: "200px" }} onClick={handleNextQuestion}>
            Następne pytanie
          </button>
        ) : (
          <button
            style={{ marginLeft: "2%", width: "150px" }}
            onClick={checkAnswer}
          >
            Sprawdź odpowiedź
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
