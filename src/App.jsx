/* src/App.jsx */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import PopularPage from './pages/PopularPage';
import SubmitPage from './pages/SubmitPage';
import FoodRoulettePage from './pages/FoodRoulettePage';  // 🎯 추가
import DetailPage from './pages/DetailPage';
import NotFound from './components/NotFound';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/roulette" element={<FoodRoulettePage />} /> {/* 🎯 추가 */}
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
