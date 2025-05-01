import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: '/', label: t('home.title') },
    { path: '/vision', label: t('vision.title') },
    { path: '/problems', label: t('problems.title') },
    { path: '/companies', label: t('companies.title') },
    { path: '/companies-2', label: t('companies2.title') },
    { path: '/workers', label: t('workers.title') },
    { path: '/workers-2', label: t('workers2.title') },
    { path: '/final', label: t('differences.title') },
    { path: '/bulgaria', label: t('bulgaria.title') },
    { path: '/levers', label: t('levers.title') },
    { path: '/phases', label: t('phases.title') }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-800/80 p-2 rounded-lg shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Apri menu"
      >
        <Menu className="text-white w-7 h-7" />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-full w-[200px] z-40 transition-transform duration-300
          bg-blue-800/50 backdrop-blur-sm border-r border-white/10 py-8
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block`}
        style={{ maxWidth: 240 }}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end md:hidden px-4 mb-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl font-bold"
            aria-label="Chiudi menu"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col space-y-2 px-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`text-left px-4 py-2.5 rounded-lg transition-all duration-300 text-white
                ${location.pathname === item.path ? 'bg-blue-600/50 font-medium shadow-lg' : 'hover:bg-blue-700/30'}
                text-base md:text-lg`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      {/* Overlay when sidebar is open on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;