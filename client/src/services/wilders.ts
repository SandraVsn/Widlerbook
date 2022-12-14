import { IWilder, IWilderInput, IWilderUpdate } from '../types/IWilder';
import API from './APIClient';

export async function getAllWilders(): Promise<IWilder[]> {
  const { data } = await API.get('/wilders');
  return data;
}

export async function getOneWilder(id: number): Promise<IWilder> {
  const { data } = await API.get(`/wilders/${id}`);
  return data;
}

export async function createWilder(wilderProps: IWilderInput) {
  return API.post('/wilders', wilderProps);
}

export async function updateWilder(id: number, wilderProps: IWilderUpdate) {
  return API.patch(`/wilders/${id}`, wilderProps);
}

export async function deleteWilder(id: number) {
  return API.delete(`/wilders/${id}`);
}

export async function addSkillToWilder(wilderId: number, skillId: number) {
  return API.post(`/wilders/${wilderId}/skills`, { skillId });
}

export async function removeSkillFromWilder(wilderId: number, skillId: number) {
  return API.delete(`/wilders/${wilderId}/skills/${skillId}`);
}
