'use client';

import { useState } from 'react';
import { registerAction, loginAction, logoutAction } from './actions';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Registro y Login
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Manejador del submit para el formulario
  async function handleSubmit(formData: FormData) {
    setMessage(null);

    const result = isLogin
      ? await loginAction(formData)
      : await registerAction(formData);

    if (result.error) {
      setMessage({ text: result.error, isError: true });
    } else if (result.success) {
      setMessage({ text: result.success, isError: false });
      if (isLogin) {
        setIsLoggedIn(true);
      } else {
        // Si se registró con éxito, pasamos al formulario de Login
        setIsLogin(true);
      }
    }
  }

  // Manejador para cerrar sesión
  async function handleLogout() {
    await logoutAction();
    setIsLoggedIn(false);
    setMessage({ text: 'Has cerrado sesión.', isError: false });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        {/* VISTA 1: Si el usuario ya está logueado */}
        {isLoggedIn ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Bienvenido! 🎉</h1>
            <p className="text-gray-600 mb-6">Has iniciado sesión correctamente con tu base de datos SQLite.</p>
            
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          /* VISTA 2: Formulario de Registro / Login */
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h1>

            {/* Mensajes de éxito o error */}
            {message && (
              <div
                className={`p-3 rounded-lg mb-4 text-sm font-medium ${
                  message.isError
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {isLogin ? 'Entrar' : 'Registrarse'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage(null);
                }}
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}