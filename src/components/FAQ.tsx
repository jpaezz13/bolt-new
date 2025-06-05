import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full justify-between py-4 text-left font-medium text-gray-900 hover:text-gray-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 pr-12">
          <div className="text-base text-gray-600">{answer}</div>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-200">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Preguntas Frecuentes sobre Envíos
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Información importante sobre nuestro proceso de envíos y despachos
          </p>
          <div className="mt-8">
            <FAQItem
              question="¿Cuánto tardan los envíos?"
              answer={
                <p>
                  En Región Metropolitana: 1-2 días hábiles.<br />
                  A regiones: 3-5 días hábiles.<br />
                  Envíos express disponibles (24 horas) para RM con costo adicional.
                </p>
              }
            />
            <FAQItem
              question="¿Cuánto cuestan los envíos?"
              answer={
                <div>
                  <p>Nuestros costos de envío:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>RM: $3.990 (normal) / $5.990 (express 24h)</li>
                    <li>Regiones: $4.990</li>
                    <li>El costo exacto se calcula al finalizar tu compra</li>
                  </ul>
                </div>
              }
            />
            <FAQItem
              question="¿Hacen envíos a regiones?"
              answer={
                <p>
                  Sí, despachamos a todas las regiones de Chile continental. Los tiempos varían según la ubicación. Para envíos a islas o zonas extremas, contáctanos antes de comprar.
                </p>
              }
            />
            <FAQItem
              question="¿Cómo puedo seguir mi pedido?"
              answer={
                <p>
                  Una vez despachado tu pedido, recibirás un correo con el número de seguimiento. Puedes rastrearlo en nuestra web en "Mis Pedidos" o directamente en el sitio de Chilexpress, Starken o Glovo según la transportadora asignada.
                </p>
              }
            />
            <FAQItem
              question="¿Qué transportadoras usan?"
              answer={
                <p>
                  Principalmente trabajamos con:
                  <br />• Chilexpress para envíos express en RM
                  <br />• Starken para regiones
                  <br />• Glovo para entregas same-day en sectores específicos de Santiago
                </p>
              }
            />
            <FAQItem
              question="¿Qué pasa si mi producto llega dañado?"
              answer={
                <p>
                  Si recibes un producto dañado, contáctanos dentro de 48 horas con fotos del producto y empaque. Te enviaremos uno nuevo o haremos la devolución, sin costo adicional.
                </p>
              }
            />
            <FAQItem
              question="¿Puedo cambiar la dirección de envío después de comprar?"
              answer={
                <p>
                  Solo si el pedido no ha sido despachado. Escríbenos inmediatamente a nuestro WhatsApp +56 9 1234 5678 con tu número de orden y nueva dirección. Una vez enviado, no podemos modificarlo.
                </p>
              }
            />
            <FAQItem
              question="¿Todos los productos tienen envío express?"
              answer={
                <p>
                  No. Algunos productos de edición limitada o importación directa pueden tener plazos diferentes. Los tiempos exactos se muestran en la página de cada producto y durante el checkout.
                </p>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;