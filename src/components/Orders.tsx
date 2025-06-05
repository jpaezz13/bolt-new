import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  shippingCompany: 'ChileExpress' | 'Starken' | 'Glovo';
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  };
  total: number;
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-20',
    status: 'delivered',
    trackingNumber: 'CLX123456789',
    shippingCompany: 'ChileExpress',
    items: [
      {
        name: 'Mediterráneo',
        quantity: 1,
        price: 29990,
        image: 'https://www.banderasperfumes.com/uploads/products/images/classic-mediterraneo-gal1_1674821557.jpg'
      }
    ],
    shippingAddress: {
      street: 'Av. Providencia 1234',
      city: 'Santiago',
      region: 'Región Metropolitana',
      postalCode: '7500000'
    },
    total: 33980
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-22',
    status: 'shipped',
    trackingNumber: 'XX-12345-XX',
    shippingCompany: 'Starken',
    items: [
      {
        name: 'Phantom EDT',
        quantity: 1,
        price: 84990,
        image: 'https://moodiedavittreport.com/wp-content/uploads/2023/07/Paco_Phantom_-PackPackaging-%C2%A9FLORIAN-JOYE-scaled.jpg'
      }
    ],
    shippingAddress: {
      street: 'Los Carrera 567',
      city: 'Concepción',
      region: 'Región del Biobío',
      postalCode: '4030000'
    },
    total: 89980
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-23',
    status: 'shipped',
    trackingNumber: 'GLV12345678',
    shippingCompany: 'Glovo',
    items: [
      {
        name: 'Blue Seduction',
        quantity: 2,
        price: 32990,
        image: 'https://www.banderasperfumes.com/uploads/products/images/seduction-blue-head_1678534868.jpg'
      }
    ],
    shippingAddress: {
      street: 'Arturo Prat 890',
      city: 'Viña del Mar',
      region: 'Región de Valparaíso',
      postalCode: '2520000'
    },
    total: 69970
  }
];

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'processing':
      return <Clock className="h-6 w-6 text-yellow-500" />;
    case 'shipped':
      return <Truck className="h-6 w-6 text-blue-500" />;
    case 'delivered':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    default:
      return <Package className="h-6 w-6 text-gray-500" />;
  }
};

const StatusText = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'processing':
      return <span className="text-yellow-500">En Preparación</span>;
    case 'shipped':
      return <span className="text-blue-500">En Camino</span>;
    case 'delivered':
      return <span className="text-green-500">Entregado</span>;
    default:
      return <span className="text-gray-500">Desconocido</span>;
  }
};

const getTrackingUrl = (company: Order['shippingCompany'], trackingNumber: string) => {
  switch (company) {
    case 'ChileExpress':
      return `https://www.chilexpress.cl/tracking?n=${trackingNumber}`;
    case 'Starken':
      return `https://www.starken.cl/seguimiento?codigo=${trackingNumber}`;
    case 'Glovo':
      return `https://glovoapp.com/tracking/${trackingNumber}`;
    default:
      return '#';
  }
};

export const Orders: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>
        
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Pedido #{order.id}</h2>
                    <p className="text-gray-600">
                      Realizado el {new Date(order.date).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon status={order.status} />
                    <StatusText status={order.status} />
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600">Empresa de Envíos:</p>
                        <p className="text-lg font-medium">{order.shippingCompany}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Número de Seguimiento:</p>
                        <p className="text-lg font-medium">{order.trackingNumber}</p>
                      </div>
                    </div>
                    <a
                      href={getTrackingUrl(order.shippingCompany, order.trackingNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center mt-2"
                    >
                      Ver seguimiento
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}

                <div className="border-t border-b border-gray-200 py-4 my-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600">
                          Cantidad: {item.quantity} × ${item.price.toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Dirección de Envío</h3>
                    <p className="text-gray-600">
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.region}<br />
                      CP: {order.shippingAddress.postalCode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 mb-1">Total del Pedido:</p>
                    <p className="text-2xl font-bold">${order.total.toLocaleString('es-CL')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};