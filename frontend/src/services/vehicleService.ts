import api from './api';
import type { Vehicle } from '../types';

export interface SearchParams {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function getVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<Vehicle[]>('/vehicles');
  return data;
}

export async function searchVehicles(params: SearchParams): Promise<Vehicle[]> {
  const { data } = await api.get<Vehicle[]>('/vehicles/search', { params });
  return data;
}

export async function createVehicle(payload: Omit<Vehicle, 'id'>): Promise<Vehicle> {
  const { data } = await api.post<Vehicle>('/vehicles', payload);
  return data;
}

export async function updateVehicle(id: string, payload: Partial<Omit<Vehicle, 'id'>>): Promise<Vehicle> {
  const { data } = await api.put<Vehicle>(`/vehicles/${id}`, payload);
  return data;
}

export async function deleteVehicle(id: string): Promise<void> {
  await api.delete(`/vehicles/${id}`);
}

export async function purchaseVehicle(id: string, quantity: number): Promise<Vehicle> {
  const { data } = await api.post<Vehicle>(`/vehicles/${id}/purchase`, { quantity });
  return data;
}

export async function restockVehicle(id: string, quantity: number): Promise<Vehicle> {
  const { data } = await api.post<Vehicle>(`/vehicles/${id}/restock`, { quantity });
  return data;
}