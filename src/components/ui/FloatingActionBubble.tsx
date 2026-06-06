import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, Folder, MessageSquare, GraduationCap } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Work', href: '#experience', icon: Briefcase },
  { label: 'Skills', href: '#skills', icon: Code },
  { label: 'Projects', href: '#projects', icon: Folder },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Contact', href: '/contact', icon: MessageSquare },
];

export default function FloatingActionBubble() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Show FAB when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (!isHome && href.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (isHome && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Radial positions (semicircle blooming towards top-left)
  const getRadialCoordinates = (index: number, total: number) => {
    const radius = 95; // distance from center button
    const startAngle = Math.PI; // 180 degrees (left)
    const endAngle = (3 * Math.PI) / 2; // 270 degrees (up)
    const angle = startAngle + (index / (total - 1)) * (endAngle - startAngle);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-[999] md:hidden">
          {/* Radial Menu Items */}
          <AnimatePresence>
            {isOpen &&
              navItems.map((item, idx) => {
                const { x, y } = getRadialCoordinates(idx, navItems.length);
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="absolute w-11 h-11 rounded-full bg-slate-900/90 text-white border border-[#E0AA3E]/30 flex items-center justify-center shadow-lg backdrop-blur-md hover:border-[#E0AA3E]"
                    style={{
                      left: '4px',
                      top: '4px',
                    }}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x,
                      y,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: idx * 0.04,
                      },
                    }}
                    exit={{
                      scale: 0,
                      opacity: 0,
                      x: 0,
                      y: 0,
                      transition: {
                        duration: 0.25,
                        delay: (navItems.length - 1 - idx) * 0.03,
                      },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5 text-[#EDC967]" />
                    {/* Tooltip */}
                    <span className="absolute right-14 text-[10px] font-semibold bg-slate-950/80 border border-white/5 backdrop-blur-sm px-2.5 py-1 rounded-md text-white/80 shadow-md pointer-events-none uppercase tracking-wider">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
          </AnimatePresence>

          {/* Main FAB Toggle Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#AE8625] to-[#D2AC47] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(224,170,62,0.4)] relative z-50 border border-white/10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.92 }}
            style={{
              boxShadow: '0 0 15px rgba(224, 170, 62, 0.3)',
            }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
