export interface DoctorInfo {
  _id: string;
  user: string;
  name: string;
  specialization: string;
  experience: number;
  contact: string;
  doctorImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientsByMonth {
  year: number;
  month: number;
  count: number;
}

export interface DashboardData {
  doctors: DoctorInfo[];
  doctorCount: number;
  recentDoctors: DoctorInfo[];
  patientCount: number;
  patientsByMonth: PatientsByMonth[];
}

export interface DashboardResponse {
  msg: string;
  data: DashboardData;
} 