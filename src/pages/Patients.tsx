import React, { useState, useEffect } from 'react';
import { getPatients } from '../services/api';
import { Patient } from '../types/patient';
import toast from 'react-hot-toast';
import { Clock, Loader2 } from 'lucide-react';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getPatients();
      setPatients(response.patients);
    } catch (error) {
      toast.error('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-16 w-16 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div
                key={patient._id}
                className="bg-white rounded-xl shadow-lg p-6 transition transform hover:-translate-y-1 hover:shadow-2xl border-2 border-transparent hover:border-blue-500"
              >
                <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p>Contact: {patient.contactNumber}</p>
                  <p>Diagnosis: {patient.diagnosis}</p>
                  <div className="mt-4">
                    <p className="font-medium text-blue-800">Doctor</p>
                    <p>{patient.doctorId.name}</p>
                    <p className="text-sm text-gray-500">{patient.doctorId.specialization}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-gray-500">
                    <Clock size={16} />
                    <span>
                      {patient.slotDetails.startTime} - {patient.slotDetails.endTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;