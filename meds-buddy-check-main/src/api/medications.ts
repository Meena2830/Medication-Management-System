// src/api/medications.ts
const API_URL = "http://localhost:3001";

export const getMedications = async (userId: number) => {
  const res = await fetch(`${API_URL}/medications?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch medications");
  return res.json();
};

export const addMedication = async (med: {
  userId: number;
  name: string;
  dosage: string;
  frequency: string;
}) => {
  const res = await fetch(`${API_URL}/medications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(med),
  });
  if (!res.ok) throw new Error("Failed to add medication");
  return res.json();
};

export const markMedicationTaken = async (medId: number, date: string) => {
  const res = await fetch(`${API_URL}/medications/${medId}/taken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date }),
  });
  if (!res.ok) throw new Error("Failed to mark medication as taken");
  return res.json();
};
