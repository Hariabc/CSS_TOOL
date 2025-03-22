import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GradientGenerator from './components/GradientGenerator';
import ColorPalette from './components/ColorPalette';
import SavedItems from './pages/SavedItems';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gradient" element={<GradientGenerator />} />
            <Route path="/palette" element={<ColorPalette />} />
            <Route path="/saved" element={<SavedItems />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
