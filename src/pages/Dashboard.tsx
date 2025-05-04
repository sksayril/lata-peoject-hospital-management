import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import Doctors from './Doctors';
import Patients from './Patients';
import Slots from './Slots';
import News from './News.tsx';
import { getDashboard } from '../services/api';
import { DashboardData } from '../types/dashboard';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { Users, UserRound, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const isRoot = location.pathname === '/dashboard' || location.pathname === '/dashboard/';
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // function to fetch dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      setDashboardData(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`flex items-center py-4 ${isRoot ? 'justify-between' : 'justify-end'}`}>
              {isRoot && (
                <button
                  onClick={fetchData}
                  disabled={loading}
                  className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="w-6 h-6" />
                      <span>Get Your Latest Data</span>
                    </>
                  )}
                </button>
              )}
              <UserProfile />
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {loading && <div>Loading Dashboard...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && (
            <Routes>
              <Route
                index
                element={(
                  <>
                    {/* Premium Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
                        <Users className="w-8 h-8" />
                        <div>
                          <h3 className="text-sm uppercase">Total Doctors</h3>
                          <p className="text-3xl font-bold mt-1">{dashboardData?.doctorCount}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
                        <UserRound className="w-8 h-8" />
                        <div>
                          <h3 className="text-sm uppercase">Total Patients</h3>
                          <p className="text-3xl font-bold mt-1">{dashboardData?.patientCount}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-sm uppercase mb-2 flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5" />
                          <span>Recent Doctors</span>
                        </h3>
                        <ul className="space-y-2">
                          {dashboardData?.recentDoctors.map(doc => (
                            <li key={doc._id} className="flex items-center space-x-3">
                              <img src={doc.doctorImage} alt={doc.name} className="w-10 h-10 rounded-full object-cover" />
                              <span className="font-medium">{doc.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Patients Chart */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-md uppercase mb-4">Patients Trend</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dashboardData?.patientsByMonth || []} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                          <XAxis dataKey="month" tickFormatter={m => `M${m}`} stroke="#fff" />
                          <YAxis stroke="#fff" />
                          <Tooltip contentStyle={{ backgroundColor: '#1a202c', borderRadius: 4 }} labelFormatter={label => `Month: ${label}`} formatter={value => [`${value}`, 'Patients']} />
                          <Line type="monotone" dataKey="count" stroke="#f6e05e" strokeWidth={3} dot={{ r: 4, stroke: '#f6e05e', strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              />
              <Route path="doctors" element={<Doctors />} />
              <Route path="patients" element={<Patients />} />
              <Route path="slots" element={<Slots />} />
              <Route path="news" element={<News />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;