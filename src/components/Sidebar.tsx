import React from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, Users, UserRound, Calendar, Newspaper } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Hospital Management</h2>
      </div>
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-900' : 'hover:bg-blue-700'
            }`
          }
        >
          <PieChart size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/dashboard/doctors"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-900' : 'hover:bg-blue-700'
            }`
          }
        >
          <Users size={20} />
          <span>Doctors</span>
        </NavLink>
        <NavLink
          to="/dashboard/patients"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-900' : 'hover:bg-blue-700'
            }`
          }
        >
          <UserRound size={20} />
          <span>Patients</span>
        </NavLink>
        <NavLink
          to="/dashboard/slots"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-900' : 'hover:bg-blue-700'
            }`
          }
        >
          <Calendar size={20} />
          <span>Slots</span>
        </NavLink>
        <NavLink
          to="/dashboard/news"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-900' : 'hover:bg-blue-700'
            }`
          }
        >
          <Newspaper size={20} />
          <span>News</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;