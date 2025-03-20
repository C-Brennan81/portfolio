import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DeveloperTools() {
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");

  const handleFormat = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsedJson, null, 2));
    } catch (error) {
      setFormattedJson("Invalid JSON");
    }
  };

  return (
    <motion.div
      className="text-center py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-5xl font-serif mb-4">Developer Tools Showcase</h2>
      <p className="text-xl text-amber-300 mb-4">Build a simple tool with a clean UI.</p>
      <textarea
        className="w-full p-2 border-2 border-amber-300 rounded mb-4"
        rows="10"
        value={inputJson}
        onChange={(e) => setInputJson(e.target.value)}
        placeholder="Paste your JSON here..."
      ></textarea>
      <button
        className="px-4 py-2 bg-amber-300 text-white rounded mb-4"
        onClick={handleFormat}
      >
        Format
      </button>
      <pre className="text-left bg-gray-100 p-4 rounded overflow-auto">
        {formattedJson}
      </pre>
    </motion.div>
  );
}
