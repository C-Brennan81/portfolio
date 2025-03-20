import React, { useState } from 'react';
import { motion } from 'framer-motion';

const archetypes = ["Hero", "Villain", "Mentor", "Sidekick"];
const professions = ["Warrior", "Mage", "Thief", "Healer"];
const traits = ["Brave", "Cunning", "Wise", "Impulsive"];

export default function CreativeWritingToolkit() {
  const [characterPrompt, setCharacterPrompt] = useState("");

  const generatePrompt = () => {
    const randomArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
    const randomProfession = professions[Math.floor(Math.random() * professions.length)];
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    setCharacterPrompt(`A ${randomTrait} ${randomArchetype} who is a ${randomProfession}.`);
  };

  return (
    <motion.div
      className="text-center py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-5xl font-serif mb-4">Creative Writing Toolkit</h2>
      <p className="text-xl text-amber-300 mb-4">Generate random character prompts, plot hooks, etc.</p>
      <button
        className="px-4 py-2 bg-amber-300 text-white rounded mb-4"
        onClick={generatePrompt}
      >
        Generate Character Prompt
      </button>
      {characterPrompt && (
        <p className="text-xl text-amber-300 mt-4">{characterPrompt}</p>
      )}
    </motion.div>
  );
}
