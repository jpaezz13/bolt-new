import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import FAQ from './components/FAQ';
import { Filters } from './components/Filters';
import { Contact } from './components/Contact';
import { Orders } from './components/Orders';
import { products } from './data/products';
import { Product, CartItem, FilterState } from './types';
import { AuthModal } from './components/AuthModal';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'main' | 'orders' | 'faq'>('main');
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    category: '',
    priceRange: '',
    searchQuery: '',
  });

  /*const handleRegister = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('¡Usuario registrado!');
        setShowModal(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error al registrar');
    }
  };

  const handleLogin = (email: string, password: string) => {
    console.log("Inicio de sesión aún no implementado");
  };
*/

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'searchQuery') {
      setSearchQuery(value);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesCategory = !filters.category || product.category === filters.category;

    let matchesPrice = true;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        matchesPrice = product.price >= min && product.price <= max;
      } else {
        matchesPrice = product.price >= min;
      }
    }

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
  });

  const renderContent = () => {
    switch (currentView) {
      case 'orders':
        return <Orders />;
      case 'faq':
        return <FAQ />;
      default:
        return (
          <>
            <Hero />
            <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                <div className="md:col-span-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onOrdersClick={() => setCurrentView('orders')}
        onHomeClick={() => setCurrentView('main')}
        onFaqClick={() => setCurrentView('faq')}
      />

      {/* Botón Mi Cuenta */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Mi Cuenta
      </button>

      {renderContent()}

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart} 
      />

      {/* Modal de autenticación */}
      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
