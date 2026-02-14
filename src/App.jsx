import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import ChoicePage from './pages/ChoicePage';
import ResultPage from './pages/ResultPage';
import SharePage from './pages/SharePage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-dark-bg">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/choice" element={<ChoicePage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/share" element={<SharePage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
