import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Vision from './pages/Vision';
import Problems from './pages/Problems';
import Companies from './pages/Companies';
import Companies2 from './pages/Companies2';
import Workers from './pages/Workers';
import Workers2 from './pages/Workers2';
import Differences from './pages/Differences';
import Bulgaria from './pages/Bulgaria';
import Levers from './pages/Levers';
import Phases from './pages/Phases';
import Navigation from './components/Navigation';
import './i18n/i18n';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/*" element={
          <div className="relative">
            <Navigation />
            <div className="pl-[200px]">
              <Routes>
                <Route path="/vision" element={<Vision />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies-2" element={<Companies2 />} />
                <Route path="/workers" element={<Workers />} />
                <Route path="/workers-2" element={<Workers2 />} />
                <Route path="/final" element={<Differences />} />
                <Route path="/bulgaria" element={<Bulgaria />} />
                <Route path="/levers" element={<Levers />} />
                <Route path="/phases" element={<Phases />} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;