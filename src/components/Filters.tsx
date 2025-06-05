import React from 'react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Buscar perfumes..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange('brand', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Todas las Marcas</option>
            <option value="Antonio Banderas">Antonio Banderas</option>
            <option value="Paco Rabanne">Paco Rabanne</option>
            <option value="Armaf">Armaf</option>
            <option value="Victoria's Secret">Victoria's Secret</option>
            <option value="Jean Lowe">Jean Lowe</option>
            <option value="Bharara">Bharara</option>
            <option value="Ralph Lauren">Ralph Lauren</option>
            <option value="Lancôme">Lancôme</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Todas las Categorías</option>
            <option value="floral">Floral</option>
            <option value="woody">Amaderado</option>
            <option value="fresh">Fresco</option>
            <option value="oriental">Oriental</option>
            <option value="sweet">Dulce</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rango de Precio
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => onFilterChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Todos los Precios</option>
            <option value="0-35000">Menos de $35.000</option>
            <option value="35000-50000">$35.000 - $50.000</option>
            <option value="50000-80000">$50.000 - $80.000</option>
            <option value="80000-200000">Más de $80.000</option>
          </select>
        </div>
      </div>
    </div>
  );
};