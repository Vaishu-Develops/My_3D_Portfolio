import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LoadingScreen from './components/ui/LoadingScreen';
import Home from './pages/Home';
import HireMe from './pages/HireMe';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="relative min-h-screen text-white" style={{ overflowX: 'clip' }}>
      {/* Loading Screen and Navbar persist across pages */}
      <LoadingScreen />
      <Navbar />

      {/* Route setup */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hire-me" element={<HireMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
