import React, { useState, useEffect } from 'react';
import { Plus, X, Calendar, Clock } from 'lucide-react';
import { createSlot, getAllSlots, getDoctors } from '../services/api';
import { DoctorSlot } from '../types/slot';
import { Doctor } from '../types/doctor';
import toast from 'react-hot-toast';

const Slots = () => {
  const [slots, setSlots] = useState<DoctorSlot[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    doctorId: '',
    slots: [{ startTime: '', endTime: '' }],
  });

  const fetchSlots = async () => {
    try {
      const response = await getAllSlots();
      setSlots(response.slots);
    } catch (error) {
      toast.error('Failed to fetch slots');
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data[0].doctors);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchDoctors();
  }, []);

  const handleAddSlot = () => {
    setFormData({
      ...formData,
      slots: [...formData.slots, { startTime: '', endTime: '' }],
    });
  };

  const handleRemoveSlot = (index: number) => {
    const newSlots = formData.slots.filter((_, i) => i !== index);
    setFormData({ ...formData, slots: newSlots });
  };

  const handleSlotChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const newSlots = formData.slots.map((slot, i) => {
      if (i === index) {
        return { ...slot, [field]: value };
      }
      return slot;
    });
    setFormData({ ...formData, slots: newSlots });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSlot(formData);
      toast.success('Slots created successfully');
      setIsModalOpen(false);
      fetchSlots();
      setFormData({
        date: '',
        doctorId: '',
        slots: [{ startTime: '', endTime: '' }],
      });
    } catch (error) {
      toast.error('Failed to create slots');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointment Slots</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Create Slots
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div key={slot._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-800" size={20} />
              <span className="font-semibold">{new Date(slot.date).toLocaleDateString()}</span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{slot.doctorId.name}</h3>
              <p className="text-blue-800">{slot.doctorId.specialization}</p>
            </div>
            <div className="space-y-2">
              {slot.slots.map((timeSlot) => (
                <div
                  key={timeSlot._id}
                  className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded"
                >
                  <Clock size={16} />
                  <span>
                    {timeSlot.startTime} - {timeSlot.endTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Create Appointment Slots</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorId}>
                      {doctor.doctorName} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Time Slots</label>
                  <button
                    type="button"
                    onClick={handleAddSlot}
                    className="text-blue-800 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Slot
                  </button>
                </div>
                {formData.slots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Slots
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slots;