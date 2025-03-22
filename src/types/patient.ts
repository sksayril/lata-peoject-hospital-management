export interface Patient {
  _id: string;
  name: string;
  contactNumber: string;
  diagnosis: string;
  doctorId: {
    _id: string;
    name: string;
    specialization: string;
  };
  hospitalId: string;
  slotId: string;
  createdAt: string;
  slotDetails: {
    startTime: string;
    endTime: string;
    _id: string;
  };
}

export interface PatientResponse {
  msg: string;
  total: number;
  patients: Patient[];
}