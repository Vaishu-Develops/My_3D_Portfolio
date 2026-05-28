import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import LoadingScreen from './components/ui/LoadingScreen';
import FilmGrain from './components/ui/FilmGrain';
import Home from './pages/Home';
import HireMe from './pages/HireMe';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen text-white" style={{ overflowX: 'clip' }}>
      {/* Loading Screen and Navbar persist across pages */}
      <LoadingScreen />
      <Navbar />

      {/* Global Film Grain Overlay */}
      <FilmGrain />

      {/* Route setup */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/hire-me" element={<HireMe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
