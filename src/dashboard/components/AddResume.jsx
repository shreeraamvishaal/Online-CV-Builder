import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Loader2, PlusSquare } from 'lucide-react';

function AddResume({ onAddResume }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4(); // Generate unique ID for the resume
    const resumeData = {
      title: resumeTitle,
      resumeId: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName
    };

    // Call the onAddResume function passed as prop
    if (onAddResume) {
      onAddResume(resumeData);
    }

    setLoading(false);

    // Redirect to the edit page with the generated resume ID
    navigation('/dashboard/resume/' + uuid + "/edit");
  };

  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' onClick={() => setOpenDialog(true)}>
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2" placeholder="Ex. Full Stack resume" onChange={(e) => setResumeTitle(e.target.value)} />
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
              <Button disabled={!resumeTitle || loading} onClick={() => onCreate()}>
                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
