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
    const questionJSON = localStorage.getItem("questions");
    const savedQuestions = questionJSON ? JSON.parse(questionJSON) : null;
    if (savedQuestions && savedQuestions.length !== 0) {
      setQuestions(savedQuestions.questions);
      setCurrentQuestionIndex(savedQuestions.currentQuestionIndex);
      setScore(savedQuestions.score);
    } else {
      // Tworzenie kopii pytań, aby nie zmieniać oryginalnej tablicy
      const shuffledQuestions = [...questionsData.questions];
      // Losowe sortowanie pytań
      shuffledQuestions.sort(() => Math.random() - 0.5);
      const questionsAndIndexToSave = {
        questions: shuffledQuestions,
        currentQuestionIndex,
        score,
      };
      localStorage.setItem(
        "questions",
        JSON.stringify(questionsAndIndexToSave)
      );
      setQuestions(shuffledQuestions);
    }
  }, []);

  const handleFinish = () => {
    localStorage.removeItem("questions");
    setFinished(true);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleNextQuestion = (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const newCurrentQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(newCurrentQuestionIndex);
    const questionsAndIndexToSave = {
      questions,
      currentQuestionIndex: newCurrentQuestionIndex,
      score: newScore,
    };
    localStorage.setItem("questions", JSON.stringify(questionsAndIndexToSave));
    if (newCurrentQuestionIndex >= questions.length) {
      handleFinish();
    }
  };

  if (currentQuestionIndex >= questions.length || finished) {
    return (
      <>
        <div className="app-container">
          <h2>Test zakończony</h2>
          <p>
            Poprawne odpowiedzi: {score} z {currentQuestionIndex}
          </p>{" "}
          <button onClick={handleRefresh}>Shrek! Ja chcę jeszcze raz!</button>
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
