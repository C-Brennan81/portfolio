import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const sampleText = "Cast your spell by typing this text as quickly and accurately as you can.";

export default function MiniGame() {
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputText.length === 1) {
      setStartTime(Date.now());
    }
    if (inputText === sampleText) {
      const duration = (Date.now() - startTime) / 1000 / 60;
      setWpm((sampleText.split(" ").length / duration).toFixed(2));
      const correctChars = inputText.split("").filter((char, idx) => char === sampleText[idx]).length;
      setAccuracy(((correctChars / sampleText.length) * 100).toFixed(2));
    }
  }, [inputText]);

  const handleRestart = () => {
    setInputText("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    inputRef.current.focus();
  };

  return (
    <motion.div
      className="text-center py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-5xl font-serif mb-4">Spellcasting Challenge</h2>
      <p className="text-xl text-amber-300 mb-4">{sampleText}</p>
      <input
        ref={inputRef}
        type="text"
        className="text-xl p-2 border-2 border-amber-300 rounded"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Start typing..."
      />
      <div className="mt-4">
        <p className="text-xl text-amber-300">WPM: {wpm}</p>
        <p className="text-xl text-amber-300">Accuracy: {accuracy}%</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-amber-300 text-white rounded"
        onClick={handleRestart}
      >
        Restart
      </button>
    </motion.div>
  );
}
