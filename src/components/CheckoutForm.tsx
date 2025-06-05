import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Props {
  amount: number;
  paymentMethod: 'debit' | 'credit';  // Recibimos método seleccionado desde el padre
  onSuccess: (paymentMethod: string) => void;  // Recibimos callback
}

export const CheckoutForm: React.FC<Props> = ({ amount, paymentMethod, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe no está listo');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al crear PaymentIntent');
      }

      const { clientSecret } = await res.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError('Error: no se encontró el elemento de la tarjeta');
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message || 'Error al procesar el pago');
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // Aquí pasamos el método de pago que viene del padre
        onSuccess(paymentMethod);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Pagar'}
      </button>
    </form>
  );
};

