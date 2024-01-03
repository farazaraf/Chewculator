// src/components/TypingTest.jsx
import React, { useState, useEffect, useRef } from 'react';

const TypingTest = () => {
  const [textToType, setTextToType] = useState('');
  const [userInput, setUserInput] = useState('');
  const [letterIndex, setLetterIndex] = useState(0);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    fetchRandomText();
  }, []);

  useEffect(() => {
    if (isRunning && letterIndex < textToType.length) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timerRef.current);
            endTypingTest();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, letterIndex, textToType.length]);

  const fetchRandomText = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
      const data = await response.text();
      const words = data.split('\n').filter((word) => word.length > 2 && word.length < 8);
      const randomIndex = Math.floor(Math.random() * (words.length - 10)); // Display lesser text
      const randomText = words.slice(randomIndex, randomIndex + 10).join(' ');

      setTextToType(randomText);
      setUserInput('');
      setLetterIndex(0);
      setCorrectLetters([]);
      setIncorrectLetters([]);
      setTimeRemaining(60);
      setIsRunning(true);
    } catch (error) {
      console.error('Error fetching random text:', error);
    }
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setUserInput(input);

    const correctLetters = textToType.split('');
    const userLetters = input.split('');
    const incorrectLetters = userLetters.filter((letter, index) => letter !== correctLetters[index]);

    setCorrectLetters(correctLetters);
    setIncorrectLetters(incorrectLetters);

    if (input === textToType.slice(0, input.length)) {
      setLetterIndex(input.length);
    }

    if (input === textToType) {
      endTypingTest();
    }
  };

  const endTypingTest = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTypingTest = () => {
    fetchRandomText();
  };

  return (
    <div>
      <h2>Typing Test</h2>
      <p>
        {correctLetters.map((letter, index) => (
          <span
            key={index}
            style={{ color: incorrectLetters[index] ? 'red' : 'green' }}
          >
            {letter}
          </span>
        ))}
        {textToType.slice(correctLetters.length)}
      </p>
      <textarea
        rows="4"
        cols="50"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        disabled={!isRunning}
      ></textarea>
      <div>
        <p>Time Remaining: {timeRemaining}s</p>
        <p>Letters Typed: {letterIndex}</p>
      </div>
      {!isRunning && (
        <div>
          <p>Typing Test Completed!</p>
          <button onClick={resetTypingTest}>Start New Test</button>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
