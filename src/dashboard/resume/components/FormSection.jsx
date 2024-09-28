import React, { useState, useEffect } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import ResumePreview from './ResumePreview';  // Import ResumePreview
import { Link, useNavigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import html2pdf from 'html2pdf.js';  // Add import for html2pdf.js

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const [resumeData, setResumeData] = useState({});
  const { resumeId } = useParams();

  useEffect(() => {
    if (resumeId) {
      const key = `resume_${resumeId}`;
      const storedResume = localStorage.getItem(key);
      if (storedResume) {
        setResumeData(JSON.parse(storedResume));
        console.log('Loaded resume data from localStorage:', JSON.parse(storedResume));
      }
    }
  }, [resumeId]);

  const handleNextClick = () => {
    try {
      if (activeFormIndex === 5) {
        const key = `resume_${resumeId}`;
        console.log('Saving resume data to localStorage:', resumeData);
        localStorage.setItem(key, JSON.stringify(resumeData));

        // Change to a single-column view showing only the resume preview
        setActiveFormIndex(6);  // New index for the preview
      } else {
        setActiveFormIndex(activeFormIndex + 1);
      }
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  };

  const updateResumeData = (section, data) => {
    setResumeData((prevData) => {
      const updatedData = {
        ...prevData,
        [section]: data,
      };
      console.log(`Updated resume data for ${section}:`, updatedData);
      return updatedData;
    });
  };

  // Function to handle PDF download
  const downloadResumePDF = () => {
    const opt = {
      margin: 0.3,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const resumeElement = document.getElementById('resumePreview');
    html2pdf().set(opt).from(resumeElement).save();
  };

  // Check if we are in preview mode
  const isPreviewMode = activeFormIndex === 6;

  return (
    <div className={isPreviewMode ? "flex flex-col w-full justify-center items-center" : "flex"}>
      {/* Left Side: Form Sections */}
      {!isPreviewMode && (
        <div className='flex flex-col w-full'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-5'>
              <Link to={"/dashboard"}>
                <Button><Home /></Button>
              </Link>
              <ThemeColor />
            </div>
            <div className='flex gap-2'>
              {activeFormIndex > 1 &&
                <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
                  <ArrowLeft />
                </Button>
              }
              <Button
                disabled={!enableNext}
                className="flex gap-2"
                size="sm"
                onClick={handleNextClick}
              >
                Next <ArrowRight />
              </Button>
            </div>
          </div>

          {/* Render the form sections conditionally */}
          {activeFormIndex === 1 ?  
            <PersonalDetail enabledNext={(v) => setEnableNext(v)} updateData={(data) => updateResumeData('personalDetail', data)} />
            : activeFormIndex === 2 ?
              <Summery enabledNext={(v) => setEnableNext(v)} updateData={(data) => updateResumeData('summery', data)} />
            : activeFormIndex === 3 ?
              <Experience updateData={(data) => updateResumeData('experience', data)} />
            : activeFormIndex === 4 ?
              <Education updateData={(data) => updateResumeData('education', data)} />
            : activeFormIndex === 5 ?
              <Skills updateData={(data) => updateResumeData('skills', data)} />
            : null
          }
        </div>
      )}

      {/* Right Side: Resume Preview */}
      {isPreviewMode && (
        <div className='flex flex-col items-center'>
          <ResumePreview resumeData={resumeData} />
          <Button className="mt-4" onClick={downloadResumePDF}>
            Download as PDF
          </Button>
        </div>
      )}
    </div>
  );
}

export default FormSection;
