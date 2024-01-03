// src/components/Calculator.jsx
import React, { useState, useEffect } from 'react';
import Display from './Display';
import Buttons from './Buttons';
import CalculationList from './CalculationList';
import { motion } from 'framer-motion';


const Calculator = () => {
  const [result, setResult] = useState('');
  const [calculations, setCalculations] = useState([]);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    document.title = 'Calculator / React';

    const handleKeyDown = (event) => {
      const key = event.key;

      if (/^[0-9+\-*/.%]$/.test(key)) {
        event.preventDefault();
        handleButtonClick(key);
        playKeyPressSound();
      } else if (key === 'Backspace') {
        event.preventDefault();
        handleButtonClick('c'); // Treat Backspace as AC button
        playKeyPressSound();
      } else if (key === 'Enter') {
        event.preventDefault();
        handleButtonClick('=');
        playKeyPressSound();
      }
    };

    const intervalId = setInterval(() => {
      if (calculations.length > 0) {
        setCalculations((prevCalculations) => prevCalculations.slice(1));
        setShake(true);
        playChewSound();

        setTimeout(() => {
          setShake(false);
        }, 350);
      }
    }, 350);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [result, calculations, shake]);

  const handleButtonClick = (value) => {
    setResult((prevResult) => {
      let newResult;

      if (value === 'c') {
        newResult = '';
      } else if (value === '=') {
        try {
          const resultValue = String(eval(prevResult));
          setCalculations((prevCalculations) => [
            ...prevCalculations,
            `${prevResult} = ${resultValue}`,
          ]);
          return resultValue;
        } catch (error) {
          setCalculations((prevCalculations) => [
            ...prevCalculations,
            `${prevResult} = Error`,
          ]);
          return 'Error';
        }
      } else {
        newResult =
          prevResult +
          (value === '+/-' ? (prevResult === '' ? '' : ' * -1') : value === '%' ? '/ 100' : value);
      }

      return newResult;
    });
  };

  const playKeyPressSound = () => {
    const audio = new Audio('/keypress.wav'); // Adjust the path accordingly
    audio.play();
  };

  const playChewSound = () => {
    const audio = new Audio('/chew.mp3'); // Adjust the path accordingly
    audio.play();
  };

  return (
    <motion.main
      animate={{ x: shake ? [0, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, 0] : 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-l from-indigo-500 to-sky-500 animate-background flex items-center justify-center h-screen w-screen px-2 py-24 md:px-8"
    >
      <div className="w-full md:w-96 bg-white bg-opacity-40 backdrop-blur-lg rounded-xl drop-shadow-lg text-center">
        <div className="p-5 overflow-hidden text-white">
          <Display value={result} />
          <Buttons Buttonclicked={handleButtonClick} />
          <CalculationList calculations={Array.from(new Set(calculations))} />
          {shake}
        </div>
      </div>
    </motion.main>
  );
};

export default Calculator;
