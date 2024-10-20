import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAppliedJobs = () =>{
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () =>{
            try {
                const res = await axios.get(`https://job-portal-3kyh.onrender.com/api/v1/get`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
};
export default useGetAppliedJobs;
