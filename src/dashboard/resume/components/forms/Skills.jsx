import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';

const Skills = () => {
    const [skillsList, setSkillsList] = useState([{ name: '', level: 'Intermediate' }]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    // Retrieve resumeId from local storage or context
    const resumeId = localStorage.getItem('resumeId') || resumeInfo?.resumeId;

    // Load skills from local storage or context once when the component mounts
    useEffect(() => {
        if (resumeId) {
            const storedSkills = JSON.parse(localStorage.getItem(`skills_${resumeId}`)) || [];
            if (storedSkills.length > 0) {
                setSkillsList(storedSkills);
            } else if (resumeInfo?.skills) {
                setSkillsList(resumeInfo.skills);
            }
        }
        // We only run this effect on mount, so no need for resumeInfo dependency
    }, [resumeId]);

    // Debounce-like mechanism for saving to local storage and context
    const saveSkillsToStorage = () => {
        if (resumeId) {
            localStorage.setItem(`skills_${resumeId}`, JSON.stringify(skillsList));
            setResumeInfo((prevInfo) => ({
                ...prevInfo,
                skills: skillsList,
            }));
        }
    };

    // Use a ref to debounce skill updates
    useEffect(() => {
        const timeout = setTimeout(() => {
            saveSkillsToStorage();
        }, 500); // Debounce saves to avoid immediate re-renders

        return () => clearTimeout(timeout);
    }, [skillsList, resumeId, setResumeInfo]);

    // Handle input change
    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    // Add new skill entry
    const addNewSkills = () => {
        setSkillsList([...skillsList, { name: '', level: 'Intermediate' }]);
    };

    // Remove the last skill entry
    const removeSkills = () => {
        if (skillsList.length > 1) {
            setSkillsList(skillsList.slice(0, -1));
        }
    };

    // Save skills when the "Save" button is clicked
    const onSave = () => {
        setLoading(true);
        try {
            saveSkillsToStorage();
            toast('Details updated!');
        } catch (error) {
            toast('Error saving details!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>
            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                        <div>
                            <label className='text-xs'>Skill Name</label>
                            <Input
                                className="w-full"
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Proficiency Level</label>
                            <select
                                className="w-full mt-1 border rounded-lg p-2"
                                value={item.level}
                                onChange={(e) => handleChange(index, 'level', e.target.value)}
                            >
                                <option value="Basic">Basic</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={addNewSkills} className="text-primary">+ Add More Skill</Button>
                    <Button variant="outline" onClick={removeSkills} className="text-primary">- Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
};

export default Skills;
