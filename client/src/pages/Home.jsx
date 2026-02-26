import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaLightbulb, 
  FaUsers, 
  FaUser,
  FaGraduationCap,
  FaArrowRight,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaLaptopCode,
  FaHandshake,
  FaBook,
  FaAward,
  FaTicketAlt,
  FaCheckCircle,
  FaChevronRight
} from 'react-icons/fa';
import Countdown from '../components/Countdown';
import { eventDate, contactInfo, events } from '../data/events';
import gct_logo from '../assets/gct_logo.png';
import img1 from '../assets/IMG_4045.JPG.JPG';
import img2 from '../assets/IMG_4085.JPG.JPG';
import img3 from '../assets/IMG_4171.JPG.JPG';
import img4 from '../assets/IMG_4202.JPG.JPG';
import img5 from '../assets/background.JPG'
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: FaTrophy, value: '₹10,000+', label: 'Prize Pool' },
    { icon: FaLightbulb, value: '5+', label: 'Events' },
    { icon: FaUsers, value: '500+', label: 'Participants' },
    { icon: FaGraduationCap, value: '20+', label: 'Colleges' },
  ];

  const highlights = [
    {
      title: 'Coding Excellence',
      description: 'Showcase your programming skills in competitive coding challenges',
      icon: FaLaptopCode
    },
    {
      title: 'Networking',
      description: 'Connect with like-minded tech enthusiasts and industry experts',
      icon: FaHandshake
    },
    {
      title: 'Learning',
      description: 'Gain practical knowledge through workshops and competitions',
      icon: FaBook
    },
    {
      title: 'Prizes',
      description: 'Win exciting cash prizes and certificates of excellence',
      icon: FaAward
    }
  ];

  const allEvents = [...events.technical, ...events.nonTechnical];

  return (
   <div className="overflow-x-hidden">
      {/* Hero Section - Professional Header */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={img5}
            alt="Technology Circuit Board"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 pt-14 pb-12 md:pt-24 md:pb-16">
          <div className="flex flex-col items-center justify-center">
            
            {/* DESKTOP: Header Row - Logo Left, College Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex w-full flex-row items-center justify-center gap-5 mb-4"
            >
              <div className="w-20 h-20 flex-shrink-0">
                <img 
                  src={gct_logo} 
                  alt="GCT Logo" 
                  className="w-full h-full object-contain drop-shadow-lg" 
                />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white tracking-tight">Government College of Technology</p>
              </div>
            </motion.div>

            {/* MOBILE: Header - Logo and College inline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex md:hidden w-full items-center justify-center gap-3 mb-3"
            >
              <div className="w-14 h-14 flex-shrink-0">
                <img 
                  src={gct_logo} 
                  alt="GCT Logo" 
                  className="w-full h-full object-contain drop-shadow-lg" 
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white tracking-tight leading-snug">Government College<br/>of Technology</p>
              </div>
            </motion.div>

            {/* Date below college name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 md:mb-5"
            >
              <p className="text-base md:text-xl font-medium text-cyan-400">March 13, 2026</p>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3 md:mb-4 text-center"
            >
              <span className="text-white">Technovate</span>
              <span className="gradient-text"> 2026</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-3xl text-slate-300 mb-6 md:mb-8 font-light text-center"
            >
              Department of Information Technology
            </motion.p>

            {/* DESKTOP: Normal Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block mb-10"
            >
              <p className="text-slate-400 mb-5 text-sm uppercase tracking-widest text-center">Event Starts In</p>
              <Countdown targetDate={eventDate} />
            </motion.div>

            {/* MOBILE: Inline Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:hidden mb-8"
            >
              <p className="text-slate-400 mb-3 text-xs uppercase tracking-widest text-center">Event Starts In</p>
              <div className="glass-card rounded-xl px-4 py-3">
                <Countdown targetDate={eventDate} inline={true} />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register" className="btn-primary group">
                <span className="flex items-center gap-2">
                  Register Now
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/events" className="btn-secondary">
                <span className="flex items-center gap-2">
                  <FaLightbulb className="w-5 h-5" />
                  Explore Events
                </span>
              </Link>
            </motion.div>

            {/* Lunch & Refreshments Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 md:mt-8"
            >
              <div className="glass-card rounded-xl px-4 py-3 md:px-6 md:py-4 border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                <p className="text-cyan-400 text-xs md:text-sm font-medium text-center flex items-center justify-center gap-2">
                  <span className="text-lg md:text-xl">🍽️</span>
                  Lunch (Non-Veg) & Refreshments will be provided for everyone
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile: Horizontal Scroll */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
        <div className="container-wide">
          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="mobile-scroll snap-x-mandatory">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-5 text-center flex-shrink-0 w-40 snap-center"
                >
                  <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold gradient-text mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                <FaChevronRight className="w-3 h-3 animate-pulse" />
                Scroll for more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview Section - NEW */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-wide">
          <motion.div {...fadeInUp} className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Our <span className="gradient-text">Events</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Explore exciting technical and non-technical competitions
            </p>
          </motion.div>

          {/* DESKTOP: Technical Events Section */}
          <div className="hidden md:block mb-12">
            <motion.div {...fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl  flex items-center justify-center">
                <FaLaptopCode className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Technical Events</h3>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {events.technical.map((event, index) => (
                <motion.div
                  key={event.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer"
                  onClick={() => window.location.href = '/events'}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <event.icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">{event.name}</h3>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">{event.shortDescription}</p>
                  <div className="mt-4 flex items-center text-cyan-400 text-sm">
                    <span>View Details</span>
                    <FaArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DESKTOP: Non-Technical Events Section */}
          <div className="hidden md:block">
            <motion.div {...fadeInUp} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl  flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Non-Technical Events</h3>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {events.nonTechnical.map((event, index) => (
                <motion.div
                  key={event.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer"
                  onClick={() => window.location.href = '/events'}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <event.icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">{event.name}</h3>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2">{event.shortDescription}</p>
                  <div className="mt-4 flex items-center text-cyan-400 text-sm">
                    <span>View Details</span>
                    <FaArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Technical Events Row */}
          <div className="md:hidden mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaLaptopCode className="text-cyan-400" />
              Technical Events
            </h3>
            <div className="mobile-scroll snap-x-mandatory">
              {events.technical.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4 flex-shrink-0 w-64 snap-center cursor-pointer"
                  onClick={() => window.location.href = '/events'}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                      <event.icon className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="font-semibold text-white text-sm">{event.name}</h4>
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-2">{event.shortDescription}</p>
                </motion.div>
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                <FaChevronRight className="w-3 h-3 animate-pulse" />
                Scroll for more
              </span>
            </div>
          </div>

          {/* Mobile: Non-Technical Events Row */}
          <div className="md:hidden">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaUsers className="text-cyan-400" />
              Non-Technical Events
            </h3>
            <div className="mobile-scroll snap-x-mandatory">
              {events.nonTechnical.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4 flex-shrink-0 w-64 snap-center cursor-pointer"
                  onClick={() => window.location.href = '/events'}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                      <event.icon className="w-3 h-3 text-white" />
                    </div>
                    <h4 className="font-semibold text-white text-sm">{event.name}</h4>
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-2">{event.shortDescription}</p>
                </motion.div>
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                <FaChevronRight className="w-3 h-3 animate-pulse" />
                Scroll for more
              </span>
            </div>
          </div>

          {/* View All Events Button */}
          <motion.div {...fadeInUp} className="text-center mt-8">
            <Link to="/events" className="btn-secondary inline-flex items-center gap-2">
              complete details
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Event Pass Section - Mobile: Horizontal Scroll */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
        <div className="container-wide">
          <motion.div {...fadeInUp} className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Event Pass <span className="gradient-text">Details</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              One Pass = Access to All Events
            </p>
          </motion.div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Individual Pass', price: '₹200', members: '1 Member', icon: FaUser, desc: 'Full access to all events' },
              { name: 'Duo Pass', price: '₹350', members: '2 Members', icon: FaUsers, desc: 'Perfect for pairs' },
              { name: 'Quad Pass', price: '₹700', members: '4 Members', icon: FaUsers, desc: 'Great for small teams' },
              { name: 'Octa Pass', price: '₹1400', members: '8 Members', icon: FaUsers, desc: 'Best value for teams' }
            ].map((pass, index) => (
              <motion.div
                key={pass.name}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-cyan-500/20"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <FaTicketAlt className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{pass.name}</h3>
                <p className="text-2xl font-bold gradient-text mb-1">{pass.price}</p>
                <p className="text-slate-400 text-sm mb-3">{pass.members}</p>
                <p className="text-slate-300 text-sm">{pass.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="mobile-scroll snap-x-mandatory">
              {[
        { name: 'Individual Pass', price: '₹200', members: '1 Member', icon: FaUser, desc: 'Full access to all events' },
              { name: 'Duo Pass', price: '₹350', members: '2 Members', icon: FaUsers, desc: 'Perfect for pairs' },
              { name: 'Quad Pass', price: '₹700', members: '3 Members', icon: FaUsers, desc: 'Great for small teams' },
              { name: 'Octa Pass', price: '₹1400', members: '4 Members', icon: FaUsers, desc: 'Best value for teams' }
              ].map((pass, index) => (
                <motion.div
                  key={pass.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4 flex-shrink-0 w-44 snap-center border border-cyan-500/20"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <FaTicketAlt className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{pass.name}</h3>
                  <p className="text-xl font-bold gradient-text mb-1">{pass.price}</p>
                  <p className="text-slate-400 text-xs mb-2">{pass.members}</p>
                  <p className="text-slate-300 text-xs">{pass.desc}</p>
                </motion.div>
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                <FaChevronRight className="w-3 h-3 animate-pulse" />
                Scroll for more
              </span>
            </div>
          </div>

          {/* One Pass Info Box */}
          <motion.div {...fadeInUp} className="mt-8 md:mt-12 p-4 md:p-6 glass-card rounded-2xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaLightbulb className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">One Pass = All Events!</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  Purchase any pass and get unlimited access to participate in ALL events. No additional fees required!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Participate Section - Mobile: Horizontal Scroll */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-wide">
          <motion.div {...fadeInUp} className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Why <span className="gradient-text">Participate?</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Join Technovate 2026 for an unforgettable experience
            </p>
          </motion.div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="mobile-scroll snap-x-mandatory">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-4 flex-shrink-0 w-56 snap-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-3">{item.description}</p>
                </motion.div>
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                <FaChevronRight className="w-3 h-3 animate-pulse" />
                Scroll for more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About IT Department */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
        <div className="container-wide">
          {/* Mobile View - Single Column Layout */}
          <div className="lg:hidden">
            <motion.div {...fadeInUp}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <FaGraduationCap className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold">
                  About <span className="gradient-text">IT Department</span>
                </h2>
              </div>
              
              {/* Description - Properly Wrapped */}
              <p className="text-slate-300 text-sm mb-5 leading-relaxed text-justify">
                The Information Technology Department at GCT Coimbatore is a hub of innovation 
                and excellence. We nurture future technology leaders with state-of-the-art 
                facilities and experienced faculty.
              </p>
              
              {/* Stats Row */}
              <div className="flex gap-3 mb-6">
                <div className="glass-card rounded-lg p-3 flex-1 text-center">
                  <p className="text-lg font-bold gradient-text">25+</p>
                  <p className="text-slate-400 text-xs">Years of Excellence</p>
                </div>
                <div className="glass-card rounded-lg p-3 flex-1 text-center">
                  <p className="text-lg font-bold gradient-text">1000+</p>
                  <p className="text-slate-400 text-xs">Alumni Network</p>
                </div>
              </div>
            </motion.div>

            {/* Mobile: Horizontal Scroll Gallery */}
            <motion.div {...fadeInUp} className="mt-2">
              <div className="mobile-scroll snap-x-mandatory">
                <img
                  src={img1}
                  alt="IT Department Event"
                  className="rounded-xl glass-card h-32 w-48 object-cover flex-shrink-0 snap-center"
                />
                <img
                  src={img2}
                  alt="Tech Workshop"
                  className="rounded-xl glass-card h-32 w-48 object-cover flex-shrink-0 snap-center"
                />
                <img
                  src={img3}
                  alt="Student Activities"
                  className="rounded-xl glass-card h-32 w-48 object-cover flex-shrink-0 snap-center"
                />
                <img
                  src={img4}
                  alt="Department Celebration"
                  className="rounded-xl glass-card h-32 w-48 object-cover flex-shrink-0 snap-center"
                />
              </div>
              {/* Scroll Indicator */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-xs text-cyan-400 flex items-center gap-1">
                  <FaChevronRight className="w-3 h-3 animate-pulse" />
                  Scroll for more
                </span>
              </div>
            </motion.div>
          </div>

          {/* Desktop View - Two Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <FaGraduationCap className="w-8 h-8 text-cyan-400" />
                <h2 className="text-4xl font-bold">
                  About <span className="gradient-text">IT Department</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-slate-300">
                <p>
                  The Information Technology Department at Government College of Technology, Coimbatore 
                  is a hub of innovation and excellence. Established with a vision to nurture future 
                  technology leaders, we consistently strive for academic and research excellence.
                </p>
                <p>
                  Our department boasts state-of-the-art laboratories, experienced faculty, and a 
                  vibrant student community that has consistently excelled in national and international 
                  competitions.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="glass-card rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold gradient-text">25+</p>
                  <p className="text-slate-400 text-sm">Years of Excellence</p>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold gradient-text">1000+</p>
                  <p className="text-slate-400 text-sm">Alumni Network</p>
                </div>
              </div>
            </motion.div>

            {/* Desktop: Image Grid */}
            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4">
              <img
                src={img1}
                alt="IT Department Event"
                className="rounded-2xl glass-card h-48 object-cover"
              />
              <img
                src={img2}
                alt="Tech Workshop"
                className="rounded-2xl glass-card h-48 object-cover mt-8"
              />
              <img
                src={img3}
                alt="Student Activities"
                className="rounded-2xl glass-card h-48 object-cover -mt-8"
              />
              <img
                src={img4}
                alt="Department Celebration"
                className="rounded-2xl glass-card h-48 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Community - Mobile: Icons Only */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container-wide">
          <motion.div {...fadeInUp} className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Join Our <span className="gradient-text">Community</span>
            </h2>
            <p className="hidden md:block text-slate-400 max-w-2xl mx-auto">
              Stay connected with us for updates, announcements, and behind-the-scenes content
            </p>
          </motion.div>

          {/* Desktop: Cards with text */}
          <motion.div {...fadeInUp} className="hidden md:flex flex-wrap justify-center gap-4">
            <a
              href={contactInfo.college.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <FaWhatsapp className="w-6 h-6 text-green-400" />
              <div>
                <p className="font-semibold text-white">WhatsApp</p>
                <p className="text-sm text-slate-400">Join Group</p>
              </div>
            </a>
            <a
              href={contactInfo.college.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <FaInstagram className="w-6 h-6 text-pink-400" />
              <div>
                <p className="font-semibold text-white">Instagram</p>
                <p className="text-sm text-slate-400">Follow Us</p>
              </div>
            </a>
            <a
              href={contactInfo.college.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <FaLinkedin className="w-6 h-6 text-blue-400" />
              <div>
                <p className="font-semibold text-white">LinkedIn</p>
                <p className="text-sm text-slate-400">Connect</p>
              </div>
            </a>
            <a
              href={`mailto:technovate26@gmail.com`}
              className="glass-card glass-card-hover rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <FaEnvelope className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <p className="text-sm text-slate-400">Contact Us</p>
              </div>
            </a>
          </motion.div>

          {/* Mobile: Icons Only */}
          <motion.div {...fadeInUp} className="md:hidden flex justify-center gap-6">
            <a
              href={contactInfo.college.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 glass-card rounded-xl flex items-center justify-center"
            >
              <FaWhatsapp className="w-7 h-7 text-green-400" />
            </a>
            <a
              href={contactInfo.college.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 glass-card rounded-xl flex items-center justify-center"
            >
              <FaInstagram className="w-7 h-7 text-pink-400" />
            </a>
            <a
              href={contactInfo.college.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 glass-card rounded-xl flex items-center justify-center"
            >
              <FaLinkedin className="w-7 h-7 text-blue-400" />
            </a>
            <a
              href={`mailto:technovate26@gmail.com`}
              className="w-14 h-14 glass-card rounded-xl flex items-center justify-center"
            >
              <FaEnvelope className="w-7 h-7 text-cyan-400" />
            </a>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default Home;
