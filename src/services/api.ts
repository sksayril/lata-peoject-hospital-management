import axios from 'axios';
import { SignUpPayload, SignInPayload, AuthResponse } from '../types/auth';
import { CreateDoctorPayload, DoctorResponse } from '../types/doctor';
import { PatientResponse } from '../types/patient';
import { CreateSlotPayload, SlotResponse } from '../types/slot';

const BASE_URL = 'https://7cvccltb-3100.inc1.devtunnels.ms/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
  const response = await api.post('/users/signup', payload);
  return response.data;
};

export const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {
  const response = await api.post('/users/signin', payload);
  return response.data;
};

export const createDoctor = async (payload: CreateDoctorPayload): Promise<void> => {
  await api.post('/create-doctor', payload);
};

export const getDoctors = async (): Promise<DoctorResponse> => {
  const response = await api.get('/get-my-doctors');
  return response.data;
};

export const getPatients = async (): Promise<PatientResponse> => {
  const response = await api.get('/patients/get-all');
  return response.data;
};

export const createSlot = async (payload: CreateSlotPayload): Promise<void> => {
  await api.post('/create-slot', payload);
};

export const getAllSlots = async (): Promise<SlotResponse> => {
  const response = await api.get('/get-all-slots');
  return response.data;
};