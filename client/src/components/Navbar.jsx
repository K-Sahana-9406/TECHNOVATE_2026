import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import IT_logo from "../assets/IT_logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Register', path: '/register' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'navbar-glass shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              <img 
                src={IT_logo} 
                alt="IT Logo" 
                className="w-full h-full object-contain rounded-xl" 
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Technovate
              </span>
              <span className="hidden md:block text-xs text-cyan-400 font-medium -mt-1">
                Intercollege IT Fest
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
            <Link
              to="/register"
              className="ml-4 btn-primary text-sm py-2.5"
            >
              <span>Register Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden navbar-glass border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/register"
                className="block btn-primary text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Register Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
