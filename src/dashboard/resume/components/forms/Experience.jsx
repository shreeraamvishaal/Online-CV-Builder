import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

// Default form field values
const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // Retrieve resumeId from local storage or context
  const resumeId = localStorage.getItem('resumeId') || resumeInfo?.resumeId;

  // Retrieve data from local storage on component mount
  useEffect(() => {
    if (resumeId) {
      const storedExperienceList = JSON.parse(localStorage.getItem(`experienceList_${resumeId}`)) || [];
      setExperienceList(storedExperienceList);
    }
  }, [resumeId]);

  useEffect(() => {
    // Update resumeInfo context and local storage whenever experienceList changes
    setResumeInfo(prevResumeInfo => ({
      ...prevResumeInfo,
      Experience: experienceList
    }));
    if (resumeId) {
      localStorage.setItem(`experienceList_${resumeId}`, JSON.stringify(experienceList));
    }
  }, [experienceList, setResumeInfo, resumeId]);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  const removeExperience = () => {
    const updatedList = experienceList.slice(0, -1);
    setExperienceList(updatedList);
  };

  const onSave = () => {
    setLoading(true);
    // Save data to local storage when saving
    if (resumeId) {
      localStorage.setItem(`experienceList_${resumeId}`, JSON.stringify(experienceList));
    }
    setLoading(false);
    toast('Details updated!');
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item.title}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={item.companyName}
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={item.city}
                  />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={item.state}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.startDate}
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.endDate}
                  />
                </div>
                <div className='col-span-2'>
                  {/* Work Summary */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item.workSummery}
                    onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={addNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={removeExperience} className="text-primary"> - Remove</Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
