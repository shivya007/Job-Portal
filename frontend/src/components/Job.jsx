import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import PropTypes from 'prop-types'; // Import PropTypes

const Job = ({job}) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  
  // Function to limit the number of words in the description
  const truncateText = (text, limit) => {
    if (text?.length > limit) {
      return text.substring(0, limit) + '...'; // Truncate and add ellipsis
    }
    return text;
  };


  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500 '>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon"><Bookmark/> </Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant="outline" size="icon">
          <Avatar>
            <AvatarImage src = {job?.company?.logo}></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
      <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
      <p className="text-sm text-gray-600 mt-1">
            {truncateText(job?.description, 100)} {/* Limit to 100 characters */}
          </p>
      </div>
      <div className="flex items-center gap-3 mt-3">
                        <Badge className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-full" variant="ghost">{job?.position}</Badge>
                        <Badge className="text-[#F83002] font-bold bg-[#ffddd2] px-3 py-1 rounded-full" variant="ghost">{job?.jobType}</Badge>
                        <Badge className="text-[#74aada] font-bold bg-[#f9f8fa] px-3 py-1 rounded-full" variant="ghost">{job?.salary}LPA</Badge>
                    </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant="outline" onClick={()=> navigate(`/description/${job?._id}`)}>Details</Button>
        <Button variant="outline" className="bg-[#74aada]">Save for later</Button>

      </div>
    </div>
  )
}
// Add PropTypes for job validation
Job.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string, // Added logo prop validation
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    jobType: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default Job