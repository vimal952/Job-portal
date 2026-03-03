import React from "react";
import { assets } from "../assets/assets";
import {useNavigate} from 'react-router-dom';
function Jobcard({ job }) {
  const navigate=useNavigate()
  return (
    <div className="bg-white rounded-xl p-5 w-full max-w-sm shadow-md hover:shadow-xl transition duration-300">
      
      {/* Company Icon */}
      <div className="mb-3">
        <img
          src={assets.company_icon}
          alt="Company"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Job Title */}
      <h4 className="text-lg font-semibold text-gray-800 mb-2">
        {job.title}
      </h4>

      {/* Location & Level */}
      <div className="flex gap-2 mb-3">
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          {job.location}
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
          {job.level}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm text-gray-600 mb-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      />

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition">
          Apply Now
        </button>

        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium py-2 rounded-lg transition">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Jobcard;
