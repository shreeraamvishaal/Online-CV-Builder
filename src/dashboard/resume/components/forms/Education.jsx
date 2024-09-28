import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

function Education() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState([
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  // Retrieve resumeId from local storage or context
  const resumeId = localStorage.getItem('resumeId') || resumeInfo?.resumeId;

  // Load data from local storage or use initial state
  useEffect(() => {
    if (resumeId) {
      const storedEducation = JSON.parse(localStorage.getItem(`education_${resumeId}`)) || [];
      if (storedEducation.length > 0) {
        setEducationalList(storedEducation);
      } else if (resumeInfo?.education) {
        setEducationalList(resumeInfo.education);
      }
    }
  }, [resumeInfo, resumeId]);

  // Handle input changes
  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);

    // Update context in real-time
    setResumeInfo({
      ...resumeInfo,
      education: newEntries
    });

    // Save to local storage in real-time
    if (resumeId) {
      localStorage.setItem(`education_${resumeId}`, JSON.stringify(newEntries));
    }
  };

  // Add a new education entry
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  // Remove the last education entry
  const RemoveEducation = () => {
    const updatedList = educationalList.slice(0, -1);
    setEducationalList(updatedList);

    // Update context in real-time
    setResumeInfo({
      ...resumeInfo,
      education: updatedList
    });

    // Update local storage
    if (resumeId) {
      localStorage.setItem(`education_${resumeId}`, JSON.stringify(updatedList));
    }
  };

  // Save data to local storage and update context
  const onSave = () => {
    if (resumeId) {
      localStorage.setItem(`resume_${resumeId}`, JSON.stringify(educationalList));
    }
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    });
    toast('Education details saved!');
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.endDate}
                />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
        </div>
        <Button onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default Education;
