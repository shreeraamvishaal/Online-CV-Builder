import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';

function Dashboard() {
  const [resumeList, setResumeList] = useState([]); // Initialize resume list
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch resumes from local storage
  const fetchResumesFromLocalStorage = () => {
    try {
      const storedResumes = JSON.parse(localStorage.getItem('resumes')) || [];
      setResumeList(storedResumes);
    } catch (err) {
      console.error('Error retrieving resumes from localStorage:', err);
      setError('Failed to load resumes.');
    }
  };

  useEffect(() => {
    fetchResumesFromLocalStorage(); // Fetch resumes when component mounts
  }, []);

  // Handle adding a new resume to the list and local storage
  const handleAddResume = (resume) => {
    try {
      const updatedList = [...resumeList, resume];
      setResumeList(updatedList);
      localStorage.setItem('resumes', JSON.stringify(updatedList)); // Store the updated list in local storage
    } catch (err) {
      console.error('Error storing resume to localStorage:', err);
      setError('Failed to save the resume.');
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume for your next Job role</p>

      {error && <p className="text-red-500">{error}</p>} {/* Show error message if any */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        {/* Add resume button */}
        <AddResume onAddResume={handleAddResume} />

        {/* Display a placeholder to indicate the area where created resumes might be displayed later */}
        {/* This could be left empty if not needed */}
      </div>
    </div>
  );
}

export default Dashboard;
