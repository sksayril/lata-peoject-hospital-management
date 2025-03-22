import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import Doctors from './Doctors';
import Patients from './Patients';
import Slots from './Slots';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end">
              <UserProfile />
            </div>
          </div>
        </div>
        <main className="p-8 bg-gray-50">
          <Routes>
            <Route path="doctors" element={<Doctors />} />
            <Route path="patients" element={<Patients />} />
            <Route path="slots" element={<Slots />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;