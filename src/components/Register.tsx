// components/Register.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('Registration successful');
      router.push('/auth/login'); // Rediriger vers la page de login
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2">
        Register
      </button>
    </div>
  );
};

export default Register;
