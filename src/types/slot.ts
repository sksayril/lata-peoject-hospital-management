export interface Slot {
  startTime: string;
  endTime: string;
  _id?: string;
}

export interface DoctorSlot {
  _id: string;
  userId: string;
  date: string;
  doctorId: {
    _id: string;
    name: string;
    specialization: string;
  };
  slots: Slot[];
  createdAt: string;
  updatedAt: string;
}

export interface SlotResponse {
  msg: string;
  total: number;
  slots: DoctorSlot[];
}

export interface CreateSlotPayload {
  date: string;
  doctorId: string;
  slots: Slot[];
}