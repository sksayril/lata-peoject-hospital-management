import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { createDoctor, getDoctors } from '../services/api';
import { Doctor } from '../types/doctor';
import toast from 'react-hot-toast';

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    doctorImage: '',
    experience: 0,
    contact: '',
  });

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data[0].doctors);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDoctor(formData);
      toast.success('Doctor added successfully');
      setIsModalOpen(false);
      fetchDoctors();
      setFormData({
        name: '',
        specialization: '',
        doctorImage: '',
        experience: 0,
        contact: '',
      });
    } catch (error) {
      toast.error('Failed to add doctor');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.doctorId} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={doctor.doctorImage}
              alt={doctor.doctorName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{doctor.doctorName}</h3>
              <p className="text-blue-800 font-medium">{doctor.specialization}</p>
              <div className="mt-2 text-gray-600">
                <p>Experience: {doctor.experience} years</p>
                <p>Contact: {doctor.contact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Doctor</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.doctorImage}
                  onChange={(e) => setFormData({ ...formData, doctorImage: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;