import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaUserTie,
  FaMoneyBillWave,
  FaLaptopCode,
  FaPalette,
  FaUsers,
  FaStar
} from 'react-icons/fa';
import { contactInfo } from '../data/events';
import gct_logo from '../assets/gct_logo.png';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  // Desktop Contact Card
  const ContactCard = ({ title, icon: Icon, members, color }) => (
    <motion.div
      {...fadeInUp}
      className="glass-card rounded-2xl p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={index} className="glass-card rounded-xl p-4 bg-slate-800/30">
            <p className="text-cyan-400 text-sm font-medium mb-1">{member.role}</p>
            <p className="text-white font-semibold mb-2">{member.name}</p>
            <a
              href={`tel:${member.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
            >
              <FaPhone className="w-3 h-3" />
              {member.phone}
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Mobile Contact Card (Compact)
  const MobileContactCard = ({ title, icon: Icon, members, color }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-xl p-4 flex-shrink-0 w-64 snap-center"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
      </div>

      <div className="space-y-2">
        {members.map((member, index) => (
          <div key={index} className="bg-slate-800/30 rounded-lg p-2">
            <p className="text-cyan-400 text-xs">{member.role}</p>
            <p className="text-white text-sm font-medium">{member.name}</p>
            <a
              href={`tel:${member.phone.replace(/\s/g, '')}`}
              className="text-slate-400 text-xs flex items-center gap-1 mt-1"
            >
              <FaPhone className="w-3 h-3" />
              {member.phone}
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );

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
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg">
            Get in touch with our team for any queries or support
          </p>
        </motion.div>

        {/* Desktop: Contact Cards Grid */}
        <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <ContactCard
            title={contactInfo.secretaries.title}
            icon={FaUserTie}
            members={contactInfo.secretaries.members}
            color="from-cyan-500 to-blue-600"
          />
          <ContactCard
            title={contactInfo.treasurers.title}
            icon={FaMoneyBillWave}
            members={contactInfo.treasurers.members}
            color="from-cyan-500 to-blue-600"
          />
          <ContactCard
            title={contactInfo.eventCoordinators.title}
            icon={FaUsers}
            members={contactInfo.eventCoordinators.members}
            color="from-cyan-500 to-blue-600"
          />
          
        </div>

        {/* Mobile: Horizontal Scroll Contact Cards */}
        <div className="md:hidden mb-8">
          <div className="mobile-scroll snap-x-mandatory">
            <MobileContactCard
              title={contactInfo.secretaries.title}
              icon={FaUserTie}
              members={contactInfo.secretaries.members}
              color="from-cyan-500 to-blue-600"
            />
            <MobileContactCard
              title={contactInfo.treasurers.title}
              icon={FaMoneyBillWave}
              members={contactInfo.treasurers.members}
              color="from-cyan-500 to-blue-600"
            />
            <MobileContactCard
              title={contactInfo.eventCoordinators.title}
              icon={FaUsers}
              members={contactInfo.eventCoordinators.members}
              color="from-cyan-500 to-blue-600"
            />
         
          </div>
        </div>

        {/* College Info & Map */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* College Details */}
          <motion.div {...fadeInUp} className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
              College <span className="gradient-text">Information</span>
            </h2>

            <div className="space-y-4 md:space-y-6">
              {/* College Logo and Name */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                  <img 
                    src={gct_logo} 
                    alt="GCT Logo" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{contactInfo.college.name}</h3>
                  <p className="text-slate-400 flex items-center gap-2 mt-1 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4 text-cyan-400" />
                    {contactInfo.college.address}
                  </p>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <a
                  href={contactInfo.college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                >
                  <FaGlobe className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-300 group-hover:text-white text-sm">Official Website</span>
                </a>
                <a
                  href={contactInfo.college.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                >
                  <FaLinkedin className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300 group-hover:text-white text-sm">LinkedIn</span>
                </a>
                <a
                  href={contactInfo.college.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                >
                  <FaInstagram className="w-5 h-5 text-pink-400" />
                  <span className="text-slate-300 group-hover:text-white text-sm">Instagram</span>
                </a>
                <a
                  href={contactInfo.college.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                >
                  <FaWhatsapp className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300 group-hover:text-white text-sm">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div {...fadeInUp} className="glass-card rounded-2xl md:rounded-3xl p-2 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.186942743017!2d76.93568731480338!3d11.01839589215709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858dc68b80bbf%3A0x24ef2643caa0f49e!2sGovernment%20College%20of%20Technology!5e0!3m2!1sen!2sin!4v1647887777777!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '250px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl md:rounded-2xl"
              title="GCT Location"
            />
          </motion.div>
        </div>

        {/* Quick Contact CTA */}
        <motion.div
          {...fadeInUp}
          className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Have <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-slate-400 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
            Reach out to us directly. Our team is here to help you with any queries about Technovate 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a
              href={`mailto:technovate26@gmail.com`}
              className="btn-primary inline-flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <FaEnvelope className="w-4 h-4 md:w-5 md:h-5" />
              Email Us
            </a>
            <a
              href={contactInfo.college.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
