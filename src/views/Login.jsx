import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login as apiLogin, setAuthToken } from '../stores/useAuthStore';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    
    try {
      const res = await apiLogin(formData);
      
      setAuthToken(res.data.token); 
      
      login(res.data.token); 
      
      navigate('/'); 
    } catch (err) {
      const message = err.response?.data?.message || 'Login gagal, periksa kembali kredensial Anda.';
      alert(message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        
        <input 
          required
          type="text" 
          placeholder="Username" 
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        
        <input 
          required
          type="password" 
          placeholder="Password" 
          className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        
        <button 
          disabled={isLoading}
          className={`w-full text-white p-3 rounded-lg transition-all ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Memproses...' : 'Masuk'}
        </button>
        
        <p className="mt-4 text-center text-gray-600">
          Belum punya akun? <Link to="/register" className="text-blue-600 font-semibold">Daftar</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;