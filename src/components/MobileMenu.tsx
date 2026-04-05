import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavLink {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
}

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setActiveDropdown(null);
    }
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { 
      name: 'Services', 
      subLinks: [
        { name: 'Pool Remodeling', href: '/pool-remodeling' },
        { name: 'Pool Resurfacing', href: '/pool-resurfacing' },
        { name: 'Pool Crack Repair', href: '/pool-crack-repair' },
        { name: 'Custom Pool Construction', href: '/custom-pool-construction' },
        { name: 'Pool Equipment Installation', href: '/pool-equipment-installation' },
        { name: 'Pool Tile Installation', href: '/pool-tile-installation' },
        { name: 'Pool Coping Installation', href: '/pool-coping-installation' },
        { name: 'Pool Finishing', href: '/pool-finishing' },
        { name: 'Spa Installation', href: '/spa-installation' },
      ]
    },
    { 
      name: 'Service Area', 
      subLinks: [
        { name: 'Sherman Oaks', href: '/sherman-oaks' },
        { name: 'Los Angeles', href: '/los-angeles' },
        { name: 'Beverly Hills', href: '/beverly-hills' },
        { name: 'Santa Monica', href: '/santa-monica' },
        { name: 'Marvista', href: '/marvista' },
        { name: 'West Wood', href: '/west-wood' },
        { name: 'Malibu', href: '/malibu' },
        { name: 'Pacific Palisades', href: '/pacific-palisades' },
        { name: 'Thousand Oaks', href: '/thousand-oaks' },
        { name: 'Aguora Hills', href: '/aguora-hills' },
        { name: 'West Hills', href: '/west-hills' },
        { name: 'Simi Valley', href: '/simi-valley' },
        { name: 'Chatsworth', href: '/chatsworth' },
        { name: 'Porter Ranch', href: '/porter-ranch' },
        { name: 'Northridge', href: '/northridge' },
        { name: 'Granada Hills', href: '/granada-hills' },
        { name: 'Santa Clarita', href: '/santa-clarita' },
        { name: 'Pasadena', href: '/pasadena' },
        { name: 'Altadena', href: '/altadena' },
        { name: 'West Chester', href: '/west-chester' },
        { name: 'Marina del Rey', href: '/marina-del-rey' },
        { name: 'Playa Vista', href: '/playa-vista' },
      ]
    },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100001] md:hidden text-black hover:scale-110 active:scale-90 transition-transform p-2"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
      </button>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[100000] bg-white pt-24 px-8 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 pb-12">
              {navLinks.map((link, index) => (
                <div key={link.name} className="flex flex-col">
                  {link.subLinks ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className="flex items-center justify-between text-3xl font-black text-gray-900 border-b border-gray-100 pb-4 text-left"
                      >
                        {link.name}
                        <motion.div
                          animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        >
                          <ChevronDown className="h-8 w-8 text-primary" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-3 pl-4 pt-4"
                          >
                            {link.subLinks.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-bold text-gray-600 hover:text-primary transition-colors"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.a
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-black text-gray-900 hover:text-primary transition-colors border-b border-gray-100 pb-4"
                    >
                      {link.name}
                    </motion.a>
                  )}
                </div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 bg-gray-50 rounded-2xl"
              >
                <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Quick Contact</h4>
                <a href="tel:+18185216120" className="text-xl font-bold block mb-2">(818) 521-6120</a>
                <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
