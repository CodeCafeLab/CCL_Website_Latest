'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { login, register } = useAuth();
  // const router = useRouter();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(loginEmail, loginPassword);
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await register(regName, regEmail, regPassword);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-200">
          {isLogin ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form className="space-y-6" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <div className="text-center mt-4">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setIsLogin(false)}
                >
                  Don&apos;t have an account? Register
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <form className="space-y-6" onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Name"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </form>
              <div className="text-center mt-4">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setIsLogin(true)}
                >
                  Already have an account? Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 