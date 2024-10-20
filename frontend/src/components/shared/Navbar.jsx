import React from 'react'
import { LogOut, User2 } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async ()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {withCredentials:true});
      if(res.data.success){
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#74aada]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
          {
            user && user.role === 'recruiter' ? (
              <>
              <li> <Link to="/admin/companies" className='text-black'>Companies</Link> </li>
              <li> <Link to="/admin/jobs" className='text-black'>Jobs</Link> </li>
              </>
            )
            :
            (
              <>
              <li> <Link to="/" className='text-black'>Home</Link> </li>
            <li> <Link to="/jobs" className='text-black'>Jobs</Link> </li>
            <li> <Link to="/browse" className='text-black'>Browse</Link> </li>
              </>
            )
          }
            
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[6A38C2] hover:bg-[#74aada]">Signup</Button></Link>
                
              </div>
            ) : (
              <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  ></AvatarImage>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className=''>
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    ></AvatarImage>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-[#74aada]">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground"> Hello {user?.fullname}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  {
                    user && user.role === 'student' &&(
                      <div className='flex w-fit items-center gap-2 cursor-pointer p-1'>
                    <User2/>
                    <Button  variant="outline"><Link to="/profile">View Profile</Link></Button>
                  </div>
                    )
                  }
                  <div className='flex w-fit items-center gap-2 cursor-pointer bg-transparent p-1'>
                    <LogOut/>
                    <Button onClick={logoutHandler} variant="outline">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
