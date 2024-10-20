import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector(store=>store.job);
  useEffect(()=>{
    const fetchAllJobs = async ()=>{
        try {
            const res = await axios.get(`https://job-portal-3kyh.onrender.com/api/v1/get?keyword=${searchedQuery}`, {withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllJobs();
  }, []); // Add dispatch to the dependency array
};
export default useGetAllJobs