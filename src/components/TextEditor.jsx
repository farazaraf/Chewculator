// src/components/TextEditor.jsx
import React, { useState, useEffect } from 'react';

const TextEditor = () => {
  const [inputText, setInputText] = useState('');
  const [savedText, setSavedText] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (/^[a-zA-Z]$/.test(key)) {
        // Allow only letters in the TextEditor
        event.preventDefault();
        handleInputKey(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputText]);

  const handleInputKey = (key) => {
    setInputText((prevInput) => prevInput + key);
  };

  const handleClearClick = () => {
    setInputText('');
  };

  const handleSaveClick = () => {
    setSavedText(inputText);
    alert('Message saved!');
  };

  const handleLoadClick = () => {
    alert('Loading last saved text: ' + savedText);
  };

  return (
    <div>
      <h2>Text Editor</h2>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={() => {}}
        placeholder="Write anything here..."
      ></textarea>
      <br />
      <button onClick={handleClearClick}>Clear</button>
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleLoadClick}>Load Last Saved</button>
    </div>
  );
};

export default TextEditor;
