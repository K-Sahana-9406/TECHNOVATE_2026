import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
              T
            </div>
            <div>
              <p className="font-bold text-white">Technovate 2026</p>
              <p className="text-sm text-slate-400">Intercollege IT Fest</p>
            </div>
          </div>

          {/* Event Info */}
          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4 text-cyan-400" />
              <span>March 15, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4 text-cyan-400" />
              <span>GCT, Coimbatore</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-6" />

        {/* Copyright */}
        <p className="text-center text-slate-500 text-sm">
          © 2026 Technovate | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
