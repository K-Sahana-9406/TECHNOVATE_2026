import { FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-4 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
      <div className="container-wide">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-slate-400 text-xs md:text-sm">
            © 2026 Technovate – Government College of Technology
          </p>
          <a 
            href="https://maps.google.com/?q=Government+College+of+Technology+Coimbatore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors text-xs md:text-sm"
          >
            <FaMapMarkerAlt className="text-cyan-400" />
            <span className="hidden md:inline">Government College of Technology, Coimbatore</span>
            <span className="md:hidden">GCT, Coimbatore</span>
          </a>
          <p className="text-slate-500 text-xs">Developed by Sahana</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
