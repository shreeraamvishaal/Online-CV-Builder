// Removed axios import and Strapi API setup
// import axios from "axios";

// Removed Strapi API constants
// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Removed axios client setup
// const axiosClient = axios.create({
//   baseURL: `${API_BASE_URL}/api/`, // Ensure no trailing slash in baseURL
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${API_KEY}`
//   }
// });

// Log base URL for debugging
// console.log('Base URL:', axiosClient.defaults.baseURL);

// Local storage functions
const saveResumeToLocalStorage = (id, data) => {
  localStorage.setItem(`resume_${id}`, JSON.stringify(data));
};

const getResumeFromLocalStorage = (id) => {
  const resume = localStorage.getItem(`resume_${id}`);
  return resume ? JSON.parse(resume) : null;
};

const deleteResumeFromLocalStorage = (id) => {
  localStorage.removeItem(`resume_${id}`);
};

// Functions for interacting with local storage
const CreateNewResume = (data) => {
  // Generate a unique ID for the new resume
  const id = new Date().getTime(); // Use timestamp or a better unique ID generator
  saveResumeToLocalStorage(id, data);
  return Promise.resolve({ data: { id, ...data } });
};

const GetUserResumes = (userEmail) => {
  const resumes = Object.keys(localStorage)
    .filter(key => key.startsWith('resume_'))
    .map(key => JSON.parse(localStorage.getItem(key)));
  return Promise.resolve({ data: resumes.filter(resume => resume.userEmail === userEmail) });
};

const UpdateResumeDetail = (id, data) => {
  saveResumeToLocalStorage(id, data);
  return Promise.resolve({ data: { id, ...data } });
};

const GetResumeById = (id) => {
  const resume = getResumeFromLocalStorage(id);
  return Promise.resolve({ data: resume });
};

const DeleteResumeById = (id) => {
  deleteResumeFromLocalStorage(id);
  return Promise.resolve();
};

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById
};
