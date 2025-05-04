import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      localStorage.setItem('token', response.data[0].token);
      localStorage.setItem('user', JSON.stringify(response.data[0]));
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center px-4 py-8"
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md bg-opacity-90 backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="sr-only">Email</label>
            <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email Address"
              className="mt-1 block w-full pl-10 py-2 rounded-md border-none bg-gray-100 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-white focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <label className="sr-only">Password</label>
            <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              className="mt-1 block w-full pl-10 py-2 rounded-md border-none bg-gray-100 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-white focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-800 hover:text-blue-700 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignIn;