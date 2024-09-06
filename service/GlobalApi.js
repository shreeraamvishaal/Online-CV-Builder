import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api/`, // Ensure no trailing slash in baseURL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

// Log base URL for debugging
console.log('Base URL:', axiosClient.defaults.baseURL);

const CreateNewResume = (data) => {
  const url = '/user-resumes';
  // Log full URL for debugging
  console.log('Request URL:', axiosClient.defaults.baseURL + url);
  return axiosClient.post(url, data);
};

const GetUserResumes = (userEmail) => axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);

const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);

const DeleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById
};
