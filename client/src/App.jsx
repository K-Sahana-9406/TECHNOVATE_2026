import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import { initEmailJS } from './utils/emailjs';

function App() {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 bg-mesh custom-scrollbar flex flex-col">
        <Navbar />
        <main className="pt-16 md:pt-20 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#f8fafc',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#0ea5e9',
                secondary: '#f8fafc',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#f8fafc',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
