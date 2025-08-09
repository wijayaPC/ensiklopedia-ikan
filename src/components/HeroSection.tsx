// components/HeroSection.tsx
import React from 'react';
import Header from './Header';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-b from-blue-500 to-teal-600 flex items-center justify-center">
        <div className="text-center px-4 py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Temukan Keindahan Dunia Ikan
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Jelajahi ribuan spesies ikan, habitat mereka, dan cara merawatnya dalam satu platform lengkap
          </p>

          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300">
              Mulai Eksplorasi
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-8 rounded-full shadow-lg transform hover:-translate-y-1 transition duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}