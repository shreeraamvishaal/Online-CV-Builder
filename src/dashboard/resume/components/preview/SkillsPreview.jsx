import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function SkillsPreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <h2 className='text-xs mr-2'>{skill.name}</h2>
              <span className='text-xs text-gray-900'>
               - {skill.level} {/* Displaying proficiency level */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
