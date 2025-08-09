// File: Header.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component anak-anak
const AnimatedHeaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ukuran canvas mengikuti viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Partikel untuk efek bawah laut
    const particles: any[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.1,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 70%)`,
        life: Math.random() * 100 + 50,
      });
    }
    
    // Animasi partikel
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        p.opacity = Math.max(0, p.opacity - 0.002);
        
        // Memantul dari tepi
        if (p.x < 0 || p.x > canvas.width) p.angle = Math.PI - p.angle;
        if (p.y < 0 || p.y > canvas.height) p.angle = -p.angle;
        
        // Menggambar partikel
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        
        // Regenerasi partikel yang mati
        if (p.life <= 0 || p.opacity <= 0) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1,
            angle: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.5 + 0.1,
            color: `hsl(${Math.random() * 60 + 180}, 70%, 70%)`,
            life: Math.random() * 100 + 50,
          };
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

const Logo = () => (
  <motion.a 
    href="/" 
    className="text-2xl font-bold"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-500 animate-logo-glow">
      Ensiklopedia Ikan
    </span>
  </motion.a>
);

const NavDesktop = () => {
  const [currentPath, setCurrentPath] = useState('');

  // Dapatkan path saat ini setelah komponen dimuat di client
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Belajar", href: "/learn" },
    { name: "Habitat", href: "/habitats" },
    { name: "Eksplorasi", href: "/explore" },
    { name: "Galeri Ikan", href: "/gallery" },
  ];
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.href}
          className={`relative font-medium px-3 py-2 transition-colors ${
            currentPath === item.href ? 'text-teal-300' : 'text-white hover:text-blue-200'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {item.name}
          {/* Garis bawah aktif */}
          {currentPath === item.href ? (
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-teal-400 shadow-lg shadow-blue-400/50"
              layoutId="underline"
            />
          ) : (
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-teal-400"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.a>
      ))}
    </nav>
  );
};

const MobileMenuToggle = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    className="md:hidden text-white focus:outline-none"
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
    aria-label="Toggle menu"
  >
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M4 6H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          open: { d: "M4 6H20", rotate: 0 },
          closed: { d: "M4 6H20", rotate: 45, originX: "50%", originY: "50%" }
        }}
      />
      <motion.path
        d="M4 12H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 }
        }}
      />
      <motion.path
        d="M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          open: { d: "M4 18H20", rotate: 0 },
          closed: { d: "M4 18H20", rotate: -45, originX: "50%", originY: "50%" }
        }}
      />
    </svg>
  </motion.button>
);

const SearchOverlay = ({ onClose }: { onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProtectedOnly, setShowProtectedOnly] = useState(false);
  
  // Data ikan dummy
  const fishData = [
    { id: 1, name: "Ikan Mas", category: "Air Tawar", isProtected: false },
    { id: 2, name: "Pari Manta", category: "Laut", isProtected: true },
    { id: 3, name: "Arwana", category: "Air Tawar", isProtected: true },
    { id: 4, name: "Koi", category: "Air Tawar", isProtected: false },
    { id: 5, name: "Hiu Paus", category: "Laut", isProtected: true },
    { id: 6, name: "Nemo", category: "Laut", isProtected: false },
    { id: 7, name: "Barakuda", category: "Laut", isProtected: false },
    { id: 8, name: "Cupang", category: "Air Tawar", isProtected: false },
    { id: 9, name: "Napoleon", category: "Laut", isProtected: true },
    { id: 10, name: "Belida", category: "Air Tawar", isProtected: true },
  ];
  
  // Filter ikan berdasarkan pencarian
  const filteredFish = fishData.filter(fish => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProtected = !showProtectedOnly || fish.isProtected;
    return matchesSearch && matchesProtected;
  });
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background gradien */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-teal-800 opacity-95" />
      
      {/* Dekorasi bawah laut */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20">
          <svg width="120" height="60" viewBox="0 0 100 50">
            <path 
              d="M10,25 Q30,5 50,25 T90,25" 
              fill="none" 
              stroke="#7dd3fc" 
              strokeWidth="2" 
            />
          </svg>
        </div>
        <div className="absolute bottom-10 right-20 opacity-30">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#0ea5e9" />
          </svg>
        </div>
      </div>
      
      {/* Konten overlay */}
      <motion.div 
        className="relative z-10 w-full max-w-2xl bg-blue-800/30 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-blue-400/30"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Cari Ikan</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
            aria-label="Close search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Input pencarian */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Cari nama ikan..."
            className="w-full bg-blue-900/50 border border-blue-600 rounded-lg py-3 px-4 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <div className="absolute right-3 top-3 text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Filter ikan dilindungi */}
        <div className="flex items-center mb-6">
          <button 
            className={`relative inline-flex items-center h-6 rounded-full w-11 mr-3 transition-colors ${showProtectedOnly ? 'bg-blue-500' : 'bg-blue-700'}`}
            onClick={() => setShowProtectedOnly(!showProtectedOnly)}
            aria-label="Toggle protected filter"
          >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${showProtectedOnly ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="text-white font-medium">Hanya Tampilkan Dilindungi</span>
        </div>
        
        {/* Hasil pencarian */}
        <div className="max-h-60 overflow-y-auto pr-2">
          {filteredFish.length > 0 ? (
            <ul className="space-y-2">
              {filteredFish.map(fish => (
                <motion.li 
                  key={fish.id}
                  className="bg-blue-700/40 hover:bg-blue-600/50 transition-colors rounded-lg p-3 cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">{fish.name}</h3>
                      <p className="text-blue-200 text-sm">{fish.category}</p>
                    </div>
                    {fish.isProtected && (
                      <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-md text-xs font-medium">
                        Dilindungi
                      </span>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Tidak ditemukan ikan yang sesuai</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const MobileOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentPath, setCurrentPath] = useState('');

  // Dapatkan path saat ini setelah komponen dimuat di client
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Belajar", href: "/learn" },
    { name: "Habitat", href: "/habitats" },
    { name: "Eksplorasi", href: "/explore" },
    { name: "Galeri Ikan", href: "/gallery" },
  ];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-40 bg-blue-900/95 backdrop-blur-md flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <nav className="flex flex-col items-center space-y-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`text-2xl font-bold py-2 px-4 rounded-lg transition-colors ${
                  currentPath === item.href ? 'text-teal-300 bg-blue-800/50' : 'text-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={onClose}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Notification = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <motion.div
    className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
  >
    <span>{message}</span>
    <button 
      onClick={onClose}
      className="ml-3 text-blue-200 hover:text-white"
      aria-label="Close notification"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    </button>
  </motion.div>
);

// Komponen Header Utama
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Contoh penggunaan notifikasi
  const handleFishSelect = (fishName: string) => {
    showNotification(`Ikan ${fishName} dipilih`);
    closeSearch();
  };
  
  return (
    <header className="relative w-full bg-gradient-to-r from-blue-700 to-teal-800 shadow-lg z-30">
      {/* Latar belakang animasi */}
      <AnimatedHeaderBackground />
      
      {/* Konten header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />
          
          {/* Navigasi desktop */}
          <NavDesktop />
          
          {/* Tombol aksi */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="text-white hover:text-blue-200 transition-colors"
              onClick={openSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>
            
            <MobileMenuToggle onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>
      
      {/* Overlay untuk pencarian */}
      <AnimatePresence>
        {isSearchOpen && <SearchOverlay onClose={closeSearch} />}
      </AnimatePresence>
      
      {/* Overlay untuk menu mobile */}
      <MobileOverlay isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Notifikasi */}
      <AnimatePresence>
        {notification && (
          <Notification 
            message={notification} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}
