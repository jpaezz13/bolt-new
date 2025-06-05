import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, Phone, Mail, Instagram, Package, HelpCircle } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onOrdersClick: () => void;
  onHomeClick: () => void;
  onFaqClick: () => void;
}


export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onCartClick,
  onSearch,
  searchQuery,
  onOrdersClick,
  onHomeClick,
  onFaqClick,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login'); // Para cambiar entre login/registro

  // Inputs para login/registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Simular login (aquí reemplaza con llamada real a backend)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Aquí tu lógica real de login, por ahora simulamos éxito:
      setIsLoggedIn(true);
      setUserName(email.split('@')[0]); // nombre simple sacado del email
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
      setName('');
    } else {
      alert('Por favor ingresa email y contraseña');
    }
  };

  // Simular registro
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name) {
      // Aquí la lógica real de registro
      alert('Registro exitoso! Ahora inicia sesión');
      setAuthMode('login');
      setEmail('');
      setPassword('');
      setName('');
    } else {
      alert('Completa todos los campos para registrarte');
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="bg-gray-800 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +56 9 1234 5678
              </span>
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                perfumes.tys@gmail.com
              </span>
            </div>
            <div className="flex items-center">
              <a href="https://instagram.com/perfumes.tys" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-600 md:hidden" />
              <span className="ml-2 text-2xl font-bold text-gray-800 cursor-pointer" onClick={onHomeClick}>
                TyS
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={onHomeClick} className="text-gray-600 hover:text-gray-900">Inicio</button>
              <button onClick={() => scrollToSection('catalog')} className="text-gray-600 hover:text-gray-900">Tienda</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900">Nosotros</button>
              <button onClick={onFaqClick} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                FAQ Envíos
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900">Contacto</button>
              <button onClick={onOrdersClick} className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Mis Pedidos
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Botón de búsqueda */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Search className="h-6 w-6" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      placeholder="Buscar perfumes..."
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Botón Mi Cuenta */}
              <div className="relative">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M5.121 17.804A8.969 8.969 0 0112 15c2.042 0 3.918.686 5.384 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {isLoggedIn ? `Hola, ${userName}` : 'Mi Cuenta'}
                </button>

                {/* Opciones al estar logueado */}
                {isLoggedIn && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 p-4">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mb-2"
                    >
                      Cerrar sesión
                    </button>
                    <button className="flex items-center text-gray-700 hover:text-black mb-2">
                      <Package className="h-4 w-4 mr-2" /> Mis Pedidos
                    </button>
                    <button className="flex items-center text-gray-700 hover:text-black">
                      <HelpCircle className="h-4 w-4 mr-2" /> Ayuda
                    </button>
                  </div>
                )}
              </div>

              {/* Botón carrito */}
              <button 
                onClick={onCartClick}
                className="relative text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de Login / Registro */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <h2 className="text-xl mb-4 font-semibold text-center">
              {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Entrar
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  ¿No tienes cuenta?{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => setAuthMode('register')}
                  >
                    Regístrate
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Registrarse
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => setAuthMode('login')}
                  >
                    Inicia sesión
                  </button>
                </p>
              </form>
            )}

            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              aria-label="Cerrar modal"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};
