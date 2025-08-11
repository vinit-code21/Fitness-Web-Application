'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve saved user from localStorage
    const savedUser = JSON.parse(localStorage.getItem('fitnessUser'));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      alert(`Welcome back, ${savedUser.name}!`);
      router.push('/dashboard');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-500"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Login to FitnessPro
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 rounded-md bg-gray-800 border border-green-400 text-white placeholder-gray-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 rounded-md bg-gray-800 border border-green-400 text-white placeholder-gray-400"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-all font-semibold"
        >
          Login
        </button>

        {/* Link to Register */}
        <p className="mt-4 text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <a href="/register" className="text-green-400 underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
