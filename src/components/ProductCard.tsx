import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, X } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-800 font-medium mb-1">{product.brand}</div>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${product.price.toLocaleString('es-CL')}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="aspect-w-16 aspect-h-9 mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Categoría</h3>
                  <p className="text-gray-600 capitalize">{product.category}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold">
                    ${product.price.toLocaleString('es-CL')}
                  </div>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      setShowModal(false);
                    }}
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};