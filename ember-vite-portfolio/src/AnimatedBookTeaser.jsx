import React, { useState } from 'react';
import { motion } from 'framer-motion';

const characters = {
  "John Doe": "John is a brave knight from the kingdom of Lorem.",
  "Jane Smith": "Jane is a skilled archer with a mysterious past."
};

export default function AnimatedBookTeaser() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <motion.div
      className="text-center py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-5xl font-serif mb-4">Animated Book Teaser</h2>
      <motion.p
        className="text-xl text-amber-300 overflow-y-auto max-h-96"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        In a land far away, <span className="text-blue-500 cursor-pointer" onClick={() => setSelectedCharacter("John Doe")}>John Doe</span> embarked on a quest. Along the way, he met <span className="text-blue-500 cursor-pointer" onClick={() => setSelectedCharacter("Jane Smith")}>Jane Smith</span>, and together they faced numerous challenges.
      </motion.p>
      {selectedCharacter && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setSelectedCharacter(null)}
        >
          <div className="bg-white p-8 rounded-lg text-left">
            <h3 className="text-2xl font-bold mb-4">{selectedCharacter}</h3>
            <p>{characters[selectedCharacter]}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
