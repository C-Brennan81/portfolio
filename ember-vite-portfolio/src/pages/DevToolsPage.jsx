// src/pages/DevToolsPage.jsx
import React, { useState } from 'react';

const categories = [
  'All',
  'Frontend',
  'Backend',
  'AI & APIs',
  'Styling',
  'Tooling',
  'Hosting',
  'Workflow',
  'Languages',
  'Development',
];

const tools = [
  // Frontend
  { name: 'React', category: 'Frontend', description: 'Component-based UI library' },
  { name: 'Framer Motion', category: 'Frontend', description: 'Animation library for smooth UI transitions' },

  // Styling
  { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS framework' },

  // Backend
  { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for server-side dev' },
  { name: 'Express', category: 'Backend', description: 'Fast web framework for Node.js' },

  // Tooling
  { name: 'Vite', category: 'Tooling', description: 'Lightning-fast dev build tool' },
  { name: 'Git & GitHub', category: 'Workflow', description: 'Version control and collaboration tools' },

  // AI & APIs
  { name: 'Groq API', category: 'AI & APIs', description: 'Fast, affordable LLM API for generative content' },
  { name: 'OpenAI API', category: 'AI & APIs', description: 'Advanced language model integration (GPT)' },

  // Hosting
  { name: 'Netlify', category: 'Hosting', description: 'Modern static deployment platform' },
  { name: 'Vercel', category: 'Hosting', description: 'Serverless deployment for React/Next.js apps' },

  // Languages
  { name: 'Java', category: 'Languages', description: 'Strongly-typed object-oriented language' },
  { name: 'C++', category: 'Languages', description: 'High-performance systems programming language' },
  { name: 'Python', category: 'Languages', description: 'Versatile scripting language used in automation and data work' },
  { name: 'SQL', category: 'Languages', description: 'Database query language for relational data' },
  { name: 'C#', category: 'Languages', description: 'Primary language for Unity game development' },

  // Game/VR Dev
  { name: 'Unity Engine', category: 'Game/VR Dev', description: 'Cross-platform game development engine with VR support' },
  { name: 'ArcPy (Python for ArcGIS)', category: 'Game/VR Dev', description: 'Automating GIS workflows and spatial data tasks' },
];

export default function DevToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');

  const filteredTools = selectedCategory === 'All'
    ? tools
    : tools.filter(tool => tool.category === selectedCategory);

  const handleJsonChange = (e) => {
    const input = e.target.value;
    setJsonInput(input);
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
    } catch {
      setFormattedJson('⚠ Invalid JSON');
    }
  };

  return (
    <div className="p-10 text-amber-100 bg-[#1e0f0a] min-h-screen font-serif">
      <h2 className="text-4xl mb-6 font-bold">Developer Tools</h2>
      <p className="text-lg text-amber-300 mb-8">
        A showcase of my current tech stack, skills, and practical developer utilities.
      </p>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded border border-amber-600 transition ${
              selectedCategory === cat ? 'bg-amber-600 text-black' : 'hover:bg-amber-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {filteredTools.map((tool, idx) => (
          <div
            key={idx}
            className="bg-[#2a120d] p-4 border border-amber-700 rounded shadow hover:scale-[1.01] transition"
            title={tool.description}
          >
            <h4 className="text-xl font-semibold">{tool.name}</h4>
            <p className="text-sm text-amber-300 italic">{tool.description}</p>
          </div>
        ))}
      </div>

      {/* JSON Formatter */}
      <div className="bg-[#2a120d] border border-amber-700 rounded-lg p-6 mb-8">
        <h3 className="text-2xl mb-3 font-semibold">Live JSON Formatter</h3>
        <textarea
          className="w-full h-40 p-3 bg-[#1c0a06] text-amber-100 border border-amber-500 rounded mb-4 font-mono"
          placeholder='Paste your JSON here...'
          value={jsonInput}
          onChange={handleJsonChange}
        />
        <pre className="bg-[#1c0a06] p-3 border border-amber-600 text-sm rounded overflow-x-auto whitespace-pre-wrap text-amber-300">
          {formattedJson}
        </pre>
      </div>
    </div>
  );
}
