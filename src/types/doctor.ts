export interface Doctor {
  doctorId: string;
  doctorName: string;
  specialization: string;
  experience: number;
  contact: string;
  doctorImage: string;
}

export interface DoctorResponse {
  msg: string;
  data: [{
    count: number;
    doctors: Doctor[];
  }];
}

export interface CreateDoctorPayload {
  name: string;
  specialization: string;
  doctorImage: string;
  experience: number;
  contact: string;
}