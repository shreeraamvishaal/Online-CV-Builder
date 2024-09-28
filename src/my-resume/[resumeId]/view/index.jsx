import React, { useContext, useEffect, useState } from 'react';
import Header from '@/components/custom/Header';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { RWebShare } from 'react-web-share';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function ViewResume() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(true);
  const { resumeId } = useParams();

  useEffect(() => {
    if (resumeId) {
      const key = `resume_${resumeId}`;
      const storedResume = localStorage.getItem(key);
      if (storedResume) {
        console.log('Resume data retrieved successfully:', storedResume);
        setResumeInfo(JSON.parse(storedResume));
      } else {
        console.error('No resume found in localStorage for key:', key);
      }
      setLoading(false);
    } else {
      console.error('No resumeId available for retrieval');
      setLoading(false);
    }
  }, [resumeId, setResumeInfo]);
  

  const handleDownload = async () => {
    const input = document.getElementById('print-area');
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
    }
  };

  if (loading) {
    return <p>Loading resume...</p>;
  }

  return (
    <div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center text-2xl font-medium'>
          Congrats! Your Resume is ready!
        </h2>
        <p className='text-center text-gray-400'>
          Now you are ready to download your resume and you can share your unique resume URL with your friends and family.
        </p>
        <div className='flex justify-between px-44 my-10'>
          <Button onClick={handleDownload}>Download</Button>
          <RWebShare
            data={{
              text: "Hello Everyone, This is my resume please open URL to see it",
              url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
              title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button>Share</Button>
          </RWebShare>
        </div>
      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

export default ViewResume;
