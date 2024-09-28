import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
    const [resumeInfo, setResumeInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const resumeId = localStorage.getItem('resumeId');
        if (!resumeId) {
            const newResumeId = uuidv4();
            localStorage.setItem('resumeId', newResumeId);
            setResumeInfo({ resumeId: newResumeId });
        } else {
            const storedResume = localStorage.getItem(`resume_${resumeId}`);
            if (storedResume) {
                setResumeInfo(JSON.parse(storedResume));
            } else {
                setResumeInfo({ resumeId });
            }
        }
        setLoading(false);
    }, []);

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, loading }}>
            {children}
        </ResumeInfoContext.Provider>
    );
};
