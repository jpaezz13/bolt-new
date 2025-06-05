import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Instagram } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div id="contact" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contáctanos</h2>
          <p className="text-lg text-gray-600">
            ¿Tienes preguntas? Nos encantaría ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-800 mr-3" />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-800 mr-3" />
                <span>perfumes.tys@gmail.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-800 mr-3" />
                <span>Av. Providencia 1234, Santiago, Chile</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Síguenos en Instagram</h4>
              <div className="flex">
                <a href="https://instagram.com/perfumes.tys" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Send className="h-5 w-5 mr-2" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};