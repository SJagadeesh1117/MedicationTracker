import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Django backend URL

// Register Guardian
export const registerGuardian = async (data) => {
  return await axios.post(`${API_BASE_URL}/guardian/register/`, data);
};

// Register Elderly
export const registerElderly = async (data) => {
  return await axios.post(`${API_BASE_URL}/elderly/register/`, data);
};

// Add Elderly by Guardian
export const addElderlyByGuardian = async (data) => {
  return await axios.post(`${API_BASE_URL}/add_elderly_by_guardian/`, data);
};

export const addMedication = (data) => {
  return axios.post(`${API_BASE_URL}/add_medication/`, data);
};
// Add Medication
// export const addMedication = async (data) => {
//   return await axios.post(`${API_BASE_URL}/add_medication/`, data);
// };

// Get Elderly Medications
export const getElderlyMedications = async (elder_id) => {
  return await axios.get(`${API_BASE_URL}/elderly/${elder_id}/medications/`);
};

// Mark Medication as Taken
export const markMedicationTaken = async (data) => {
  return await axios.patch(`${API_BASE_URL}/medications/status/`, data);
};


export const getGuardianElderlyDetails = (guardianId) =>
  axios.get(`${API_BASE_URL}/guardian/${guardianId}/elderly_count/`);

