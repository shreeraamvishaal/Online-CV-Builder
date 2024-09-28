import React, { useContext, useRef } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

const ResumePreview = ({ resumeData }) => {
  const { resumeInfo, loading } = useContext(ResumeInfoContext);
  const resumeRef = useRef();  // Reference to the resume container

  console.log('ResumePreview - resumeInfo:', resumeInfo);

  if (loading) {
    return <p>Loading preview...</p>;
  }

  if (!resumeInfo || Object.keys(resumeInfo).length === 0) {
    return <p>No resume data available.</p>;
  }

  return (
    <div id="resumePreview" ref={resumeRef} className='shadow-lg h-full p-14 border-t-[20px]' style={{ borderColor: resumeInfo?.themeColor }}>
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummeryPreview resumeInfo={resumeInfo} />
      {resumeInfo?.Experience && resumeInfo.Experience.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
      {resumeInfo?.education && resumeInfo.education.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.skills && resumeInfo.skills.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
};

export default ResumePreview;
