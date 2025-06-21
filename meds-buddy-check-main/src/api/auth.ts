const API_URL = "http://localhost:3001/api/auth";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), 
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }), 
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};
