// components/Login.js
import { useState, useContext} from 'react';
import { AuthContext } from '@/api/AuthContext';
const Login = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (!auth) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login } = auth;

  const handleLogin = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login({ id: data.userID, email }, data.token);      
      window.location.href = '/Dashboard';
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="w-2/3 mx-auto justify-center items-center">
      <img src="" alt="login" className="w-2/3 mx-auto"/>
      <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Login</h1>
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
            <button onClick={handleLogin} className="bg-gray-900 hover:bg-blue-500 text-white p-2">
              Login
            </button>
        </div>
    </div>
    
  );
};

export default Login;
