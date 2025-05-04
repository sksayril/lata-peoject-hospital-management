import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineLocationMarker, HiOutlinePhone, HiOutlinePhotograph } from 'react-icons/hi';
import { Loader2 } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signUp(formData);
      toast.success('Account created successfully!');
      navigate('/signin');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md bg-opacity-90 backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="sr-only">Hospital Name</label>
            <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Hospital Name"
              className="mt-1 block w-full pl-10 py-2 rounded-md border-none bg-gray-100 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-white focus:outline-none transition"
              required
            />
          </div>
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
          <div className="relative">
            <label className="sr-only">Address</label>
            <HiOutlineLocationMarker className="absolute left-3 top-2 text-gray-400" size={20} />
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Address"
              className="mt-1 block w-full pl-10 py-2 rounded-md border-none bg-gray-100 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-white focus:outline-none transition"
              rows={3}
              required
            />
          </div>
          <div className="relative">
            <label className="sr-only">Phone Number</label>
            <HiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone Number"
              className="mt-1 block w-full pl-10 py-2 rounded-md border-none bg-gray-100 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-white focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <label className="sr-only">Hospital Image URL</label>
            <HiOutlinePhotograph className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="Image URL"
              className="mt-1 block w-full pl-10 py-2 rounded-md border-none bg-gray-100 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-white focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-800 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;