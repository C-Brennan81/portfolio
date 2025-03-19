// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookTeaserPage from './pages/BookTeaserPage';
import GamePage from './pages/GamePage';
import DevToolsPage from './pages/DevToolsPage';
import WritingToolkitPage from './pages/WritingToolkitPage';

function App() {
  return (
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
  );
}

export default App;
