import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 p-4">
      <img
        src={user.imageUrl}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-medium text-gray-800">{user.name}</p>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;