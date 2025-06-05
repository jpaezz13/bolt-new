import React from 'react';

export const Hero: React.FC = () => {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Descubre Tu Aroma Ideal
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Explora nuestra colección exclusiva de fragancias que cuentan tu historia única
          </p>
          <button 
            onClick={scrollToCatalog}
            className="bg-gray-800 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};