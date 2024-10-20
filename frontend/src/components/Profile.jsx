import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

//const skills = ["HTML", "CSS", "JavaScript", "ReactJS"];
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
   // Fallback to a placeholder image if the user does not have a profile image
   const profileImage = user?.profile?.profilePhoto || 'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg';

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg my-10 p-8">
        {/* Profile Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 rounded-full border-2 border-indigo-500 shadow-md">
              <AvatarImage 
                src={profileImage}
                alt="profile" 
              />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-600 mt-2">
              {user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=> setOpen(true)} className="bg-gradient-to-r from-[#74aada] to-[#1abc9c] hover:from-[#1abc9c] hover:to-[#74aada] text-white"
          >
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-8">
          <div className="flex items-center gap-3 my-3 text-gray-700">
            <Mail className="text-indigo-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-3 text-gray-700">
            <Contact className="text-indigo-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h2 className="font-semibold text-lg mb-3 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {
              user?.profile?.skills.length !== 0 
                ? user?.profile?.skills.map((item, index) => (
                  <Badge 
                    key={index} 
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                    {item}
                  </Badge>
                )) 
                : <span>NA</span>
            }
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-5">
          <Label className="text-md font-bold text-gray-800">Resume</Label>
          {
            isResume 
              ?  (
                <>
                  <a href={user?.profile?.resume} target="_blank" className="text-indigo-500 underline mt-1">
                    {user?.profile?.resumeOriginalName}
                  </a>
                </>
              ) 
              : <span>NA</span>
          }
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 my-10">
        <h1 className="font-bold text-lg mb-5 text-gray-800">Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable />
        {/* You can add your table for displaying applied jobs here */}
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
    
  );
}


export default Profile;
