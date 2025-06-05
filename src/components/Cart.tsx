import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||'pk_test_51RPbjfHGWU2eRMhjk8iBBRXUO4ov1yA7IX5x7wrzpEPazFBfM4ZNgslT65jHx5bzAV5MVIDx2MHJnlAaiDUlRj2w001BgESNbc'
);

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}


interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

const shippingOptions: ShippingOption[] = [
  { id: 'rm', name: 'Región Metropolitana', price: 3990, estimatedDays: '1-2 días hábiles' },
  { id: 'regiones', name: 'Otras Regiones', price: 4990, estimatedDays: '3-5 días hábiles' },
  { id: 'express', name: 'Envío Express RM', price: 5990, estimatedDays: 'Mismo día' },
];

export const Cart: React.FC<CartProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'credit' | ''>('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = selectedShipping ? shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0 : 0;
  const total = subtotal + shippingCost;

  if (!isOpen) return null;

  /*const handleContinue = () => {
    if (step === 'cart') {
      setStep('shipping');
    } else if (step === 'shipping' && selectedShipping) {
      setStep('payment');
    }
  };
*/
const handleContinue = () => {
  if (step === 'cart') {
    setStep('shipping');
  } else if (step === 'shipping' && selectedShipping) {
    setStep('payment');
  } else if (step === 'payment' && paymentMethod) {
    // Simulación de pago
    const method = paymentMethod === 'debit' ? 'Débito' : 'Crédito';
    alert(`¡Gracias por tu compra!\nMétodo de pago: ${method}\nTotal pagado: $${total.toLocaleString('es-CL')}`);

    // Opcional: cerrar el carrito y reiniciar
    onClearCart();
    setStep('cart');
    setSelectedShipping('');
    setPaymentMethod('');
    onClose(); // cierra el modal
  }
};


  const handleBack = () => {
    if (step === 'shipping') {
      setStep('cart');
    } else if (step === 'payment') {
      setStep('shipping');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">
            {step === 'cart' && 'Tu Carrito'}
            {step === 'shipping' && 'Envío'}
            {step === 'payment' && 'Pago'}
          </h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 'cart' && (
          <div className="p-4 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toLocaleString('es-CL')}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-auto text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 'shipping' && (
          <div className="p-4 space-y-4">
            <h3 className="font-medium mb-4">Selecciona el método de envío:</h3>
            {shippingOptions.map((option) => (
              <div key={option.id} className="border rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping === option.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-gray-600">
                      ${option.price.toLocaleString('es-CL')}
                    </div>
                    <div className="text-sm text-gray-500">
                      Tiempo estimado: {option.estimatedDays}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}


{step === 'payment' && (
  <div className="p-4 space-y-4">
    <h3 className="font-medium mb-4">Selecciona el método de pago:</h3>
    
    <div className="space-y-3">
      <div className="border rounded-lg p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="debit"
            checked={paymentMethod === 'debit'}
            onChange={(e) => setPaymentMethod(e.target.value as 'debit' | 'credit')}
          />
          <span>Tarjeta de Débito</span>
        </label>
      </div>
      <div className="border rounded-lg p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="credit"
            checked={paymentMethod === 'credit'}
            onChange={(e) => setPaymentMethod(e.target.value as 'debit' | 'credit')}
          />
          <span>Tarjeta de Crédito</span>
        </label>
      </div>
    </div>

    {paymentMethod && (
      <div className="mt-4">
        <Elements stripe={loadStripe('pk_test_51RPbjfHGWU2eRMhjk8iBBRXUO4ov1yA7IX5x7wrzpEPazFBfM4ZNgslT65jHx5bzAV5MVIDx2MHJnlAaiDUlRj2w001BgESNbc'
)}>
          <CheckoutForm
            amount={Math.round(total)}
            paymentMethod={paymentMethod}
            onSuccess={(paymentMethod: string) => {
                alert(`¡Gracias por tu compra! Total pagado: $${paymentMethod}\nTotal pagado: $${total.toLocaleString('es-CL')}`);
                onClearCart();
                setStep('cart');
                setSelectedShipping('');
                setPaymentMethod('');
                onClose();
            }}
          />
        </Elements>
      </div>
    )}
  </div>
)}


        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>${subtotal.toLocaleString('es-CL')}</span>
            </div>
            {selectedShipping && (
              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span>${shippingCost.toLocaleString('es-CL')}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            {step !== 'cart' && (
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Volver
              </button>
            )}
            <button
              onClick={handleContinue}
              className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
            >
              {step === 'cart' && 'Continuar al envío'}
              {step === 'shipping' && 'Continuar al pago'}
              {step === 'payment' && 'Finalizar Compra'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
