import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets} from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import kconvert from "k-convert";
import moment from "moment";
import Jobcard from "../components/Jobcard";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
function ApplyJob() {
  const navigate = useNavigate();
  const {getToken}=useAuth();
  const { id } = useParams();
  const [isAlredayApplied, setIsAlredayApplied] = useState(false);
  const [jobData, setJobData] = useState(null);
  const { jobs,backendUrl,userData,userApplications,fetchUserApplications } = useContext(AppContext);
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
        //console.log(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
     fetchJob();
  }, [id]);
  const applyHandler=async(e)=>{
      e.preventDefault();
      try{
       if(!userData){
        return toast.error('Please login to apply for job')
       }
       if(!userData.resume){
        navigate('/applications')
        return toast.error('Please upload resume to apply for job')
       }
       const token=await getToken()
       const {data}=await axios.post(backendUrl+'/api/users/apply-job',{jobId:jobData._id},{headers:{Authorization:`Bearer ${token}`}})
       if(data.success){
        toast.success(data.message);
        fetchUserApplications()
       }
       else{
        toast.error(data.message)
       }
       
      }
      catch(error){
        toast.error(error.message)
      }
    }
    const checkAlreadyApplied=async()=>{
      const hasApplied=userApplications.some((application)=>application.jobId?._id===jobData?._id)
      setIsAlredayApplied(hasApplied)
    }
    useEffect(()=>{
      if(userApplications?.length>0 && jobData ){
        checkAlreadyApplied()
      }
    },[jobData,userApplications,id])
  if (!jobData) return <Loading />;

  const relatedJobs = jobs
    .filter(
      (job) =>
        job.companyId?._id === jobData.companyId?._id &&
        job._id !== jobData._id
    ).filter(job=>{
      const hasApplied=userApplications.some((application)=>application.jobId?._id===job._id)
      return !hasApplied
    })
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* ================= HEADER CARD ================= */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

              {/* Left Info */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={jobData.companyId?.image || assets.company_icon}
                  alt={jobData.companyId?.name || 'company'}
                  className="w-24 h-24 object-contain border rounded-lg p-2 bg-white"
                />

                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-3">
                    {jobData.title || 'Job Details'}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm">

                    <span className="flex items-center gap-2">
                      <img
                        src={assets.suitcase_icon}
                        className="w-4 h-4"
                        alt=""
                      />
                      {jobData.companyId.name}
                    </span>

                    <span className="flex items-center gap-2">
                      <img
                        src={assets.location_icon}
                        className="w-4 h-4"
                        alt=""
                      />
                      {jobData.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <img
                        src={assets.person_icon}
                        className="w-4 h-4"
                        alt=""
                      />
                      {jobData.level}
                    </span>

                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <img
                        src={assets.money_icon}
                        className="w-4 h-4"
                        alt=""
                      />
                      CTC: {kconvert.convertTo(jobData.salary)}
                    </span>

                  </div>
                </div>
              </div>

              {/* Right Apply Button */}
              <div className="text-center md:text-right">
                <button onClick={applyHandler} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-md">
                  {isAlredayApplied?'Already Applied':'Apply Now'}
                </button>

                <p className="text-sm text-gray-500 mt-3">
                  Posted {moment(jobData.date).fromNow()}
                </p>
              </div>

            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT: Job Description */}
            <div className="lg:w-2/3 w-full bg-white rounded-xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-6 border-b pb-3">
                Job Description
              </h2>

              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>

              <button onClick={applyHandler} className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-md">
               {isAlredayApplied?'Already Applied':'Apply Now'}
              </button>

            </div>

            {/* RIGHT: Related Jobs */}
            <div className="lg:w-1/3 w-full">

              <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-xl font-semibold mb-6">
                  More jobs from {jobData.companyId.name}
                </h2>

                <div className="space-y-4">
                  {relatedJobs.length > 0 ? (
                    relatedJobs.map((job) => (
                      <Jobcard key={job._id} job={job} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No more jobs available.
                    </p>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default ApplyJob;
