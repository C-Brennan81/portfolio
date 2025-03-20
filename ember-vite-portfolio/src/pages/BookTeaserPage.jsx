// src/pages/BookTeaser.jsx
import React, { useEffect, useState } from 'react';

const teaserTitle = 'Prologue';
const chapterTitle = 'The Queen';

const firstLineText = "The world doesn’t care who you are when it burns.";

const paragraphs = [
  "I’m on my knees in the Throne room, the gilded arches stretched up to the ceiling, and every wall gleamed with some kind of polished metal or priceless decoration. But none of that mattered, not in the same way the dozen swords surrounding me did. The tip of one pressed into my back, not quite enough to break the skin, but I could feel it there.",
  "The Queen's Guard stood like statues around me, their armour catching the coloured light pouring in through some grand stained-glass windows. Everything here is meant to show power, to make you feel small. It’s working.",
  "Blood drips from my chin, staining the marble floor beneath my knees. My hands are bound, my body broken, but I keep grinning. The throne room is silent, the weight of judgment heavy as she stares down at me from her gilded throne. To her, I’m nothing, less than the dirt on her boots.",
  '"Where is it?" she demands.',
  "I cough, the sound rattling deep in my chest, and lift my head just enough to meet her eyes. The grin widens, blood streaking my teeth.",
  '“You want it back?” My voice is hoarse, every word scraping out like it might be my last. “It’s probably halfway to Redmoon by now. Not that it matters—because right now, your focus shouldn’t be there. It should be on me, my Queen. Because I’m about to walk out of here.”',
  "Her expression doesn’t change, but something flickers behind her eyes.",
  '"Because one thing is true in our world," I say, my voice rising, "No matter your rank. No matter your crown. No matter who you are—Queen, Consort, Soldier, or Thief—"',
  "I lean forward, spitting blood onto the pristine floor.",
  '“The flames don’t differentiate.”',
  "And somewhere beneath us, the walls begin to shake."
];

export default function BookTeaser() {
  const [typedLine, setTypedLine] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [fadeInIndex, setFadeInIndex] = useState(0);

  useEffect(() => {
    if (typingIndex < firstLineText.length) {
      const timeout = setTimeout(() => {
        setTypedLine(prev => prev + firstLineText.charAt(typingIndex));
        setTypingIndex(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [typingIndex]);

  useEffect(() => {
    if (typingComplete && fadeInIndex < paragraphs.length) {
      const timeout = setTimeout(() => {
        setFadeInIndex(prev => prev + 1);
      }, 200); // adjust this for slower/faster fade-in per paragraph
      return () => clearTimeout(timeout);
    }
  }, [typingComplete, fadeInIndex]);

  return (
    <div className="min-h-screen bg-[#1e0f0a] text-amber-100 p-10 font-serif">
      <div className="max-w-3xl mx-auto bg-[#2a120d] p-8 rounded-lg shadow-lg border border-amber-600 transition duration-300 ease-in-out">
        <h2 className="text-3xl text-center font-bold mb-1">{teaserTitle}</h2>
        <hr className="border-amber-700 my-2 w-1/2 mx-auto" />
        <h3 className="text-2xl text-center italic mb-6">{chapterTitle}</h3>

        <p className="text-lg text-amber-300 leading-7 mb-6">
          {typedLine}
          {!typingComplete && <span className="animate-pulse">|</span>}
        </p>

        {typingComplete && (
          <div className="text-lg text-amber-200 leading-8 space-y-5 transition-all duration-500">
            {paragraphs.slice(0, fadeInIndex).map((para, idx) => (
              <p
                key={idx}
                className="opacity-0 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {para}
              </p>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
