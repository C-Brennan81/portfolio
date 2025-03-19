import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // or './components/Navbar' depending on where you saved it

import Home from './pages/Home';
import BookTeaserPage from './pages/BookTeaserPage';
import GamePage from './pages/GamePage';
import DevToolsPage from './pages/DevToolsPage';
import WritingToolkitPage from './pages/WritingToolkitPage';

const App = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);
    const move = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none; }
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          background: radial-gradient(circle, #ff9900 0%, transparent 80%);
          pointer-events: none;
          border-radius: 50%;
          mix-blend-mode: screen;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }
      `}</style>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-teaser" element={<BookTeaserPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/dev-tools" element={<DevToolsPage />} />
          <Route path="/writing-toolkit" element={<WritingToolkitPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
