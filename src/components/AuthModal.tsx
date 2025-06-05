import React, { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;

  //onLogin: (email: string, password: string) => void;
  //onRegister: (email: string, password: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
      setError('');

    //const endpoint = isRegister ? '/register' : '/login';

  try {
      const res = await fetch(`http://localhost:3001/${isRegister ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( 
        isRegister
            ? {
                correo_electronico: email,
                contrasena: password,
                nombre_completo: nombreCompleto,
              }
            : {
                correo_electronico: email,
                contrasena: password,
              }
      ),
    });

    const data = await res.json();
    if (!res.ok) {
      onLoginSuccess(data);
        onClose();
      } else {
        setError(data.error || 'Ocurrió un error.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };
     // return (

    //console.log('Usuario autenticado:', data.user);
    //localStorage.setItem('token', data.token); // opcional: guardar sesión

//};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 relative">
        <h2 className="text-xl mb-4 font-semibold">{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
          <input
            type="text"
            placeholder="Nombre Completo"
            required
            value={nombreCompleto}
            onChange={e => setNombreCompleto(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          )}
          <input
            type="email"
            placeholder="Correo Electrónico "
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isRegister ? "Registrar" : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:underline"
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;