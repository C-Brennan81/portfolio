import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#1a0c07] border-b border-amber-600 shadow sticky top-0 z-50 text-amber-200">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-serif text-amber-300">Craig Brennan</h1>
        <ul className="flex gap-6 text-lg">
          <li><Link to="/" className="hover:text-amber-500 transition">Home</Link></li>
          <li><Link to="/book-teaser" className="hover:text-amber-500 transition">Book Teaser</Link></li>
          <li><Link to="/game" className="hover:text-amber-500 transition">Mini Game</Link></li>
          <li><Link to="/dev-tools" className="hover:text-amber-500 transition">Dev Tools</Link></li>
          <li><Link to="/writing-toolkit" className="hover:text-amber-500 transition">Writing Toolkit</Link></li>
        </ul>
      </div>
    </nav>
  );
}
