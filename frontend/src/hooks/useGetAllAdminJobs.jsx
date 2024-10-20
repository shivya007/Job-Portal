import { setAllAdminJobs} from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs = async ()=>{
        try {
            const res = await axios.get(`https://job-portal-3kyh.onrender.com/api/v1/getAdminJobs`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllAdminJobs();
  }, [dispatch]); // Add dispatch to the dependency array
};
export default useGetAllAdminJobs