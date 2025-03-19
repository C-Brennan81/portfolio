// src/pages/CharacterCreator.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const races = [
  { name: 'Scorchborn', lore: 'Flame-forged descendants born near volcanic realms.' },
  { name: 'Harengon', lore: 'Swift rabbitfolk known for cunning and speed.' },
  { name: 'Orclight', lore: 'Orc-blooded wanderers touched by celestial magic.' },
  { name: 'Duskwalker', lore: 'Shadow-bound travelers between life and death.' },
  { name: 'Feykin', lore: 'Mischievous beings touched by the fae realms.' }
];

const roles = [
  { name: 'Shadow Rogue', lore: 'Stealthy assassins, experts in striking from the dark.' },
  { name: 'Runeseeker', lore: 'Arcane scholars wielding ancient glyphs and forgotten magics.' },
  { name: 'Blade Dancer', lore: 'Warriors who blend martial grace with deadly precision.' },
  { name: 'Skyforged Knight', lore: 'Elite guardians who channel elemental winds and skyward might.' },
  { name: 'Whispersong Bard', lore: 'Enchanting minstrels weaving tales that alter reality.' }
];

const traits = [
  { name: 'Brave', effect: { health: 2 }, lore: 'Extra resilience in perilous journeys.' },
  { name: 'Cunning', effect: { food: 1 }, lore: 'Finds more supplies during scavenging.' },
  { name: 'Loyal', effect: { health: 1 }, lore: 'Protects allies and endures hardships.' },
  { name: 'Reckless', effect: { health: -1, food: 1 }, lore: 'Charges into danger, gains more rewards.' },
  { name: 'Wise', effect: { water: 2 }, lore: 'Knows how to survive in wild terrain.' },
  { name: 'Vengeful', effect: { health: 1 }, lore: 'Drives forward through sheer will.' },
  { name: 'Kindhearted', effect: { water: 1 }, lore: 'Fosters goodwill, leading to unexpected aid.' },
  { name: 'Ambitious', effect: { food: 2 }, lore: 'Driven to thrive, gains more resources.' }
];

const initialStats = {
  health: 10,
  food: 5,
  water: 5
};

export default function CharacterCreator() {
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTrait, setSelectedTrait] = useState('');
  const [name, setName] = useState('');
  const [stats, setStats] = useState(initialStats);
  const [adventureLog, setAdventureLog] = useState([]);
  const [storyPrompt, setStoryPrompt] = useState('Your journey begins in a windswept vale.');
  const [inventory, setInventory] = useState(['Torch', 'Bread', 'Canteen']);
  const [messageLog, setMessageLog] = useState([]);
  const [tone, setTone] = useState('Serious');
  const [genre, setGenre] = useState('Fantasy');
  const [customAction, setCustomAction] = useState('');
  const tones = ['Serious', 'Whimsical', 'Dark', 'Heroic'];
  const genres = ['Fantasy', 'Post-Apocalyptic', 'Mystery', 'Steampunk'];
  const [selectedSeed, setSelectedSeed] = useState('');


  const storySeeds = [
    'Steampunk City',
    'Eldritch Forest',
    'Cave Ruins',
    'Frozen Mountains',
    'Desert Wastes'
  ];

  const handleTraitSelection = (traitName) => {
    const trait = traits.find(t => t.name === traitName);
    if (!trait) return;
    const updatedStats = { ...initialStats };
    Object.entries(trait.effect).forEach(([key, val]) => {
      updatedStats[key] = Math.max(0, updatedStats[key] + val);
    });
    setStats(updatedStats);
    setSelectedTrait(traitName);
  };

  const handleCustomAdventure = () => {
    if (!customAction.trim()) return;
    handleAdventureChoice(customAction);
    setCustomAction('');
  };
  
  const handleAdventureChoice = async (choice) => {
    const itemUsed = inventory[Math.floor(Math.random() * inventory.length)];
    const updatedInventory = inventory.filter(item => item !== itemUsed);
    setInventory(updatedInventory);

    const updatedStats = {
      ...stats,
      health: Math.max(0, stats.health - 1),
      food: Math.max(0, stats.food - 1),
      water: Math.max(0, stats.water - 1)
    };
    setStats(updatedStats);

    const newLog = [
      ...messageLog,
      { role: 'user', content: `${name || 'The hero'} decides to ${choice}.` }
    ];
    setMessageLog(newLog);

    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageLog: newLog, tone, genre, maxTokens: 350,
        settingSeed: selectedSeed     
         })
      });

      const data = await response.json();

      if (!response.ok || !data.reply || !data.reply.content) {
        setAdventureLog(prev => [...prev, '⚠ The LLM failed to respond correctly.']);
        return;
      }

      const story = data.reply.content;
      setAdventureLog(prev => [...prev, story]);
      setStoryPrompt(`Inventory used: ${itemUsed}. Next move?`);

      if (updatedStats.health <= 0 || updatedStats.food <= 0 || updatedStats.water <= 0) {
        setAdventureLog(prev => [...prev, '❌ Your journey ends here. You succumb to the harsh world.']);
      }
    } catch (error) {
      setAdventureLog(prev => [...prev, '❌ A network or server error occurred.']);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e0f0a] text-amber-100 p-10 font-serif">
      <motion.h2 className="text-4xl mb-4 text-center font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Character Creator</motion.h2>

      <div className="max-w-3xl mx-auto bg-[#2a120d] p-6 rounded-lg shadow-lg border border-amber-600">
        <label className="block mb-4">
          <span className="block mb-1 font-medium">Character Name:</span>
          <input className="w-full p-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your character's name" />
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Race:</span>
          <select className="w-full p-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100" value={selectedRace} onChange={(e) => setSelectedRace(e.target.value)}>
            <option value="">-- Select Race --</option>
            {races.map((race) => (<option key={race.name} value={race.name} title={race.lore}>{race.name}</option>))}
          </select>
          {selectedRace && <p className="mt-1 text-sm italic text-amber-300">{races.find(r => r.name === selectedRace).lore}</p>}
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Role/Class:</span>
          <select className="w-full p-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="">-- Select Role --</option>
            {roles.map((role) => (<option key={role.name} value={role.name} title={role.lore}>{role.name}</option>))}
          </select>
          {selectedRole && <p className="mt-1 text-sm italic text-amber-300">{roles.find(r => r.name === selectedRole).lore}</p>}
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Character Trait:</span>
          <select className="w-full p-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100" value={selectedTrait} onChange={(e) => handleTraitSelection(e.target.value)}>
            <option value="">-- Select Trait --</option>
            {traits.map((trait) => (<option key={trait.name} value={trait.name} title={trait.lore}>{trait.name}</option>))}
          </select>
          {selectedTrait && <p className="mt-1 text-sm italic text-amber-300">{traits.find(t => t.name === selectedTrait).lore}</p>}
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Tone:</span>
          <select className="w-full p-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100" value={tone} onChange={(e) => setTone(e.target.value)}>
            {tones.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <label className="block mb-4">
          <span className="block mb-1 font-medium">Genre:</span>
          <select className="w-full p-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100" value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
        
        <label className="block mb-4">
        <span className="block mb-1 font-medium">Story Setting / Seed:</span>
        <select
            className="w-full p-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100"
            value={selectedSeed}
            onChange={(e) => setSelectedSeed(e.target.value)}
        >
            <option value="">-- Select a Story Seed --</option>
            {storySeeds.map(seed => (
            <option key={seed} value={seed}>{seed}</option>
            ))}
        </select>
        {selectedSeed && <p className="mt-1 text-sm italic text-amber-300">Selected: {selectedSeed}</p>}
        </label>


        <div className="mt-6 text-sm text-amber-200">
          <p className="mb-1 font-semibold">Current Stats:</p>
          <ul className="list-disc list-inside">
            <li>Health: {stats.health}</li>
            <li>Food: {stats.food}</li>
            <li>Water: {stats.water}</li>
          </ul>
          <p className="mt-2">Inventory: {inventory.join(', ')}</p>
        </div>

        <div className="mt-6">
          <p className="font-bold mb-2">{storyPrompt}</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => handleAdventureChoice('explore')} className="bg-amber-600 text-black px-4 py-2 rounded hover:bg-amber-400 transition">Explore</button>
            <button onClick={() => handleAdventureChoice('rest')} className="bg-amber-600 text-black px-4 py-2 rounded hover:bg-amber-400 transition">Rest</button>
            <button onClick={() => handleAdventureChoice('forage')} className="bg-amber-600 text-black px-4 py-2 rounded hover:bg-amber-400 transition">Forage</button>
            <button onClick={() => handleAdventureChoice('scout')} className="bg-amber-600 text-black px-4 py-2 rounded hover:bg-amber-400 transition">Scout</button>
          </div>
        </div>

        <div className="mt-4">
            <label className="block mb-1 font-medium">Custom Action:</label>
            <input
                className="w-full p-2 mb-2 rounded bg-[#1c0a06] border border-amber-500 text-amber-100"
                type="text"
                value={customAction}
                onChange={(e) => setCustomAction(e.target.value)}
                placeholder="Type your own action (e.g., 'sneak into the ruins')"
            />
            <button
                onClick={handleCustomAdventure}
                className="bg-amber-600 text-black px-4 py-2 rounded hover:bg-amber-400 transition"
            >
                Submit Custom Action
            </button>
            </div>


        {adventureLog.length > 0 && (
          <div className="mt-6">
            <p className="font-bold text-lg mb-2">Adventure Log:</p>
            <ul className="space-y-2 text-amber-300 text-sm max-h-60 overflow-y-auto border border-amber-600 p-4 rounded bg-[#1c0a06]">
              {adventureLog.map((entry, index) => (
                <li key={index}>• {entry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
