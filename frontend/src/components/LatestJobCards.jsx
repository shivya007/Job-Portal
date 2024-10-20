import React from 'react';
import { Badge } from './ui/badge';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  // Function to limit the number of words in the description
  const truncateText = (text, limit) => {
    if (text?.length > limit) {
      return text.substring(0, limit) + '...'; // Truncate and add ellipsis
    }
    return text;
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="relative p-6 rounded-xl shadow-lg bg-gradient-to-r from-white to-blue-50 border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
    >
      {/* Card Content */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-xl text-gray-800">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500 flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i> {/* Location icon */}
              India
            </p>
          </div>
          <img
            src={job?.company?.logo || 'https://via.placeholder.com/50'}
            alt={job?.company?.name}
            className="w-12 h-12 rounded-full border"
          />
        </div>

        {/* Job Title and Description */}
        <div className="mt-2">
          <h1 className="font-bold text-lg text-gray-800">{job?.title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {truncateText(job?.description, 100)} {/* Limit to 100 characters */}
          </p>
        </div>

        {/* Badges Section */}
        <div className="flex items-center gap-3 mt-4">
          <Badge className="text-blue-700 font-bold bg-blue-100 px-3 py-1 rounded-lg flex items-center" variant="ghost">
            <i className="fas fa-briefcase mr-1"></i> {/* Position icon */}
            {job?.position} Positions
          </Badge>
          <Badge className="text-red-600 font-bold bg-red-100 px-3 py-1 rounded-lg flex items-center" variant="ghost">
            <i className="fas fa-user-tie mr-1"></i> {/* Job type icon */}
            {job?.jobType}
          </Badge>
          <Badge className="text-[#74aada] font-bold bg-[#f9f8fa] px-3 py-1 rounded-lg flex items-center" variant="ghost">
            <i className="fas fa-dollar-sign mr-1"></i> {/* Salary icon */}
            {job?.salary} LPA
          </Badge>
        </div>

        {/* Floating Apply Button - On a New Line */}
        <div className="mt-4 flex justify-start">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Add prop validation
LatestJobCards.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Ensure _id is validated
    company: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string, // Added logo prop validation
    }).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    jobType: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default LatestJobCards;
