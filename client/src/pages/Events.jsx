import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers,
  FaPhone,
  FaWhatsapp,
  FaTimes,
  FaListOl,
  FaUserTie,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { events } from '../data/events';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const EventCard = ({ event }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card glass-card-hover rounded-2xl p-5 cursor-pointer"
        onClick={() => setSelectedEvent(event)}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl">{event.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-1 truncate">{event.name}</h3>
            <p className="text-slate-400 text-sm line-clamp-2">{event.shortDescription}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20 flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            {event.date}
          </span>
          <span className="px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs font-medium flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            {event.time}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <FaUsers className="w-3 h-3" />
            {event.teamSize}
          </span>
          <span className="text-sm text-cyan-400 font-medium flex items-center gap-1">
            View <FaArrowRight className="w-3 h-3" />
          </span>
        </div>
      </motion.div>
    );
  };

  // Mobile Accordion Event Card
  const MobileEventItem = ({ event }) => {
    const isExpanded = expandedEvent === event.id;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-xl overflow-hidden"
      >
        <button
          onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
          className="w-full p-4 flex items-center gap-3 text-left"
        >
          <div className="text-2xl">{event.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm truncate">{event.name}</h3>
            <p className="text-slate-400 text-xs line-clamp-1">{event.shortDescription}</p>
          </div>
          {isExpanded ? (
            <FaChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          )}
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-0 border-t border-slate-700/50">
                <p className="text-slate-300 text-xs mb-3 mt-3">{event.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 text-xs flex items-center gap-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    {event.date}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-300 text-xs flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {event.time}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-300 text-xs flex items-center gap-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    {event.venue}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-slate-400 mb-1">Team Size: <span className="text-white">{event.teamSize}</span></p>
                </div>

                {/* Rounds Section */}
                {event.rounds && event.rounds.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-cyan-400 mb-2">Rounds:</p>
                    <div className="space-y-2">
                      {event.rounds.map((round, idx) => (
                        <div key={idx} className="flex gap-2 text-xs">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 font-bold">
                            {idx + 1}
                          </span>
                          <p className="text-slate-300">{round}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.coordinators && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-cyan-400 mb-1">Coordinators:</p>
                    {event.coordinators.map((coord, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs mb-1">
                        <span className="text-white">{coord.name}</span>
                        <a href={`tel:${coord.phone.replace(/\s/g, '')}`} className="text-cyan-400">
                          {coord.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t border-slate-700/50">
                  <a
                    href={event.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium text-center flex items-center justify-center gap-1"
                  >
                    <FaWhatsapp className="w-3 h-3" />
                    Join
                  </a>
                  <Link
                    to="/register"
                    className="flex-1 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs font-medium text-center"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-card rounded-3xl p-6 md:p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6 pr-12">
                <div className="text-5xl">{event.icon}</div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{event.name}</h2>
                  <p className="text-slate-400">{event.description}</p>
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span className="text-sm font-medium">Date</span>
                  </div>
                  <p className="text-white">{event.date}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <FaClock className="w-4 h-4" />
                    <span className="text-sm font-medium">Time</span>
                  </div>
                  <p className="text-white">{event.time}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span className="text-sm font-medium">Venue</span>
                  </div>
                  <p className="text-white text-sm">{event.venue}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <FaUsers className="w-4 h-4" />
                    <span className="text-sm font-medium">Team Size</span>
                  </div>
                  <p className="text-white">{event.teamSize}</p>
                </div>
              </div>

              {/* Rounds */}
              {event.rounds && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FaListOl className="w-5 h-5 text-cyan-400" />
                    Event Rounds
                  </h3>
                  <div className="space-y-3">
                    {event.rounds.map((round, index) => (
                      <div key={index} className="glass-card rounded-xl p-4 flex gap-3">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-slate-300 text-sm pt-1">{round}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coordinators */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaUserTie className="w-5 h-5 text-cyan-400" />
                  Event Coordinators
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.coordinators?.map((coordinator, index) => (
                    <div key={index} className="glass-card rounded-xl p-4">
                      <p className="font-semibold text-white mb-1">{coordinator.name}</p>
                      <a 
                        href={`tel:${coordinator.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 text-cyan-400 text-sm hover:text-cyan-300"
                      >
                        <FaPhone className="w-3 h-3" />
                        {coordinator.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Link */}
              <a
                href={event.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary flex items-center justify-center gap-2 mb-4"
              >
                <FaWhatsapp className="w-5 h-5" />
                Join Event WhatsApp Group
              </a>

              {/* Register Button */}
              <Link
                to="/register"
                onClick={onClose}
                className="w-full btn-secondary flex items-center justify-center gap-2"
              >
                Register for This Event
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Event <span className="gradient-text">Showcase</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg">
            Explore our exciting lineup of technical and non-technical events
          </p>
        </motion.div>

        {/* Technical Events Section - Desktop */}
        <div className="hidden md:block mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl">
              💻
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Technical Events</h2>
              <p className="text-slate-400">Challenge your technical skills</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.technical.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Technical Events Section - Mobile Accordion */}
        <div className="md:hidden mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl">
              💻
            </div>
            <h2 className="text-xl font-bold text-white">Technical Events</h2>
          </motion.div>

          <div className="space-y-3">
            {events.technical.map((event) => (
              <MobileEventItem key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Non-Technical Events Section - Desktop */}
        <div className="hidden md:block mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl">
              🎨
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Non-Technical Events</h2>
              <p className="text-slate-400">Showcase your creativity</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.nonTechnical.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Non-Technical Events Section - Mobile Accordion */}
        <div className="md:hidden mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl">
              🎨
            </div>
            <h2 className="text-xl font-bold text-white">Non-Technical Events</h2>
          </motion.div>

          <div className="space-y-3">
            {events.nonTechnical.map((event) => (
              <MobileEventItem key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Ready to <span className="gradient-text">Participate?</span>
          </h2>
          <p className="text-slate-400 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
            Register now to secure your spot in Technovate 2026!
          </p>
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-sm md:text-base">
            Register Now
            <FaArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default Events;
