import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';
import { ResumeInfoProvider } from '@/context/ResumeInfoContext';

function App() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    // Redirect to sign-in page if not signed in
    return <Navigate to={'/auth/sign-in'} />;
  }

  return (
    <ResumeInfoProvider>
      <Header />
      <div className="main-content">
        <Outlet /> {/* Render nested routes */}
      </div>
      <Toaster />
    </ResumeInfoProvider>
  );
}

export default App;
