import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookTeaserPage from './pages/BookTeaserPage';
import DevToolsPage from './pages/DevToolsPage';
import WritingToolkitPage from './pages/WritingToolkitPage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-teaser" element={<BookTeaserPage />} />
        <Route path="/dev-tools" element={<DevToolsPage />} />
        <Route path="/writing-toolkit" element={<WritingToolkitPage />} />
      </Routes>
    </>
  );
}
