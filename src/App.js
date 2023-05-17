// App.js
import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import questionsData from './questions.json';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Tworzenie kopii pytań, aby nie zmieniać oryginalnej tablicy
    const shuffledQuestions = [...questionsData.questions];
    // Losowe sortowanie pytań
    shuffledQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h2>Quiz completed!</h2>
        <p>Your score: {score}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <Question
        question={questions[currentQuestionIndex]}
        options={questions[currentQuestionIndex].options}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
};

export default App;
