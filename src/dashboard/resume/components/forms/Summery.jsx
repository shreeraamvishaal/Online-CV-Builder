import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = "Job Title: {jobTitle} , Based on the job title, give me a list of summaries for 3 experience levels: Mid Level and Freshers in 3-4 lines, in array format, with summary and experience_level fields in JSON format.";

function Summery({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo?.summery || '');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

    useEffect(() => {
        // Retrieve the resume data from localStorage and pre-fill summary
        const resumeId = params?.resumeId;
        let resumes = JSON.parse(localStorage.getItem('resumes')) || [];
        let currentResume = resumes.find(resume => resume.resumeId === resumeId);

        if (currentResume) {
            setSummery(currentResume.summery || '');
        }

    }, [params?.resumeId]);

    useEffect(() => {
        // Update context and local storage when summary changes
        const updateResumeInfo = () => {
            setResumeInfo(prevInfo => ({
                ...prevInfo,
                summery: summery
            }));
        };

        updateResumeInfo();

        // Save the updated summary to local storage
        const resumeId = params?.resumeId;
        let resumes = JSON.parse(localStorage.getItem('resumes')) || [];
        let updatedResumes = resumes.map((resume) => {
            if (resume.resumeId === resumeId) {
                return {
                    ...resume,
                    summery: summery
                };
            }
            return resume;
        });
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    }, [summery, params?.resumeId, setResumeInfo]);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || 'Job Title');
            const result = await AIChatSession.sendMessage(PROMPT);
            setAiGenerateSummeryList(JSON.parse(result.response.text()));
        } catch (error) {
            toast('Error generating summary');
        } finally {
            setLoading(false);
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        toast("Summary updated");
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button 
                            variant="outline" 
                            onClick={GenerateSummeryFromAI}
                            type="button" 
                            size="sm" 
                            className="border-primary text-primary flex gap-2"
                        >
                            <Brain className='h-4 w-4' /> Generate from AI
                        </Button>
                    </div>
                    <Textarea 
                        className="mt-5" 
                        required
                        value={summery}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList.length > 0 && (
                <div className='my-5'>
                    <h2 className='font-bold text-lg'>Suggestions</h2>
                    {aiGeneratedSummeryList.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => setSummery(item?.summary)}
                            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-2'
                        >
                            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summery;
