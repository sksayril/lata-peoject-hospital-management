import React, { useState, useEffect } from 'react';
import { getPatients } from '../services/api';
import { Patient } from '../types/patient';
import toast from 'react-hot-toast';
import { Clock } from 'lucide-react';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.patients);
    } catch (error) {
      toast.error('Failed to fetch patients');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient._id} className="bg-white rounded-lg shadow-md p-6">
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
    </div>
  );
};

export default Patients;