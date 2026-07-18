import axios from "axios";

// API base URL
const API_URL = "https://6a4b3727f5eab0bb6b625c1f.mockapi.io/EMPLOYEE";

const normalizeEmployee = (employee) => ({
  id: employee.ID || employee.id || "",
  name: employee.Name || employee.name || "",
  department: employee.Department || employee.department || "",
  email: employee.Email || employee.email || "",
  gender: employee.Gender || employee.gender || "",
  mobileNo: employee.MobileNo || employee.mobileNo || "",
  role: employee.Role || employee.role || "",
  isPremium: employee.IsPremium === true || employee.IsPremium === "true" || employee.isPremium === true || false,
});

const toApiEmployee = (employee) => ({
  ID: employee.id || employee.ID || undefined,
  Name: employee.name,
  Department: employee.department,
  Email: employee.email,
  Gender: employee.gender || "",
  MobileNo: employee.mobileNo || "",
  Role: employee.role || "",
  IsPremium: employee.isPremium === true || employee.IsPremium === true ? true : false,
});

export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return {
    ...response,
    data: Array.isArray(response.data)
      ? response.data.map(normalizeEmployee)
      : normalizeEmployee(response.data),
  };
};

export const addEmployee = (employee) => {
  return axios.post(API_URL, toApiEmployee(employee));
};

export const updateEmployee = (id, employee) => {
  return axios.put(`${API_URL}/${id}`, toApiEmployee(employee));
};

export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};