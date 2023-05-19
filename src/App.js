import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import questionsData from "./questions.json";
import Footer from "./components/Footer";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Tworzenie kopii pytań, aby nie zmieniać oryginalnej tablicy
    const shuffledQuestions = [...questionsData.questions];
    // Losowe sortowanie pytań
    shuffledQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleFinish = () => {
    setFinished(true);
  };

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length || finished) {
    return (
      <>
        <div className="app-container">
          <h2>Test zakończony</h2>
          <p>
            Poprawne odpowiedzi: {score} z {currentQuestionIndex}
          </p>{" "}
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="app-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Pytanie {currentQuestionIndex + 1}</h2>{" "}
          <button onClick={handleFinish} style={{ height: "fit-content" }}>
            zakończ
          </button>
        </div>
        <Question
          question={questions[currentQuestionIndex]}
          options={questions[currentQuestionIndex].options}
          onNextQuestion={handleNextQuestion}
        />
        <Footer />
      </div>
    </>
  );
};

export default App;
