import React from 'react'
import { useState,useContext,useEffect} from 'react'
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import Jobcard from './Jobcard';
function Joblistings() {
    const {searchFilter,isSearched,setsearchFilter,jobs}=useContext(AppContext);
    const [showFilters,setShowFilters]=useState(true);
    const[currentPage,setCurrentPage]=useState(1);
    const[selectedCategories,setSelectedCategories]=useState([]);
    const[selectedLocations,setSelectedLocations]=useState([]);
    const[filteredJobs,setFilteredJobs]=useState(jobs);
    const handleCategoryChange=(category)=>{
      if(selectedCategories.includes(category)){
        setSelectedCategories(prev=>prev.filter(cat=>cat!==category));
      }else{
        setSelectedCategories(prev=>[...prev,category]);
      }
    }
    const handleLocationChange=(location)=>{
      if(selectedLocations.includes(location)){
        setSelectedLocations(prev=>prev.filter(loc=>loc!==location));
      }else{
        setSelectedLocations(prev=>[...prev,location]);
      }
    }
    //job filter
    useEffect(() => {
  let updatedJobs = jobs;

  // 🔎 Filter by title
  if (searchFilter.title) {
    updatedJobs = updatedJobs.filter(job =>
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    );
  }

  // 📍 Filter by search location
  if (searchFilter.location) {
    updatedJobs = updatedJobs.filter(job =>
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
    );
  }

  // 🏷️ Filter by selected categories
  if (selectedCategories.length > 0) {
    updatedJobs = updatedJobs.filter(job =>
      selectedCategories.includes(job.category)
    );
  }

  // 🌍 Filter by selected locations
  if (selectedLocations.length > 0) {
    updatedJobs = updatedJobs.filter(job =>
      selectedLocations.includes(job.location)
    );
  }

  setFilteredJobs(updatedJobs);
  setCurrentPage(1); // reset page on filter change
}, [jobs, searchFilter, selectedCategories, selectedLocations]);

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
    {/* Sidebar */}
    <div className='w-full lg:w-1/4 bg-white px-4'>
  {/* search filter from hero component */}
  {isSearched &&
    (searchFilter.title !== "" || searchFilter.location !== "") && (
      <>
        <h3 className='font-medium text-lg mb-4'>Current Search</h3>
        <div className='mb-4 text-gray-600'>
        {searchFilter.title && (
          <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{searchFilter.title}
          <img onClick={e=>setsearchFilter({...searchFilter,title:""})} className='cursor-pointer' src={assets.cross_icon} alt=''/>
          </span>
        )}

        {searchFilter.location && (
          <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{searchFilter.location}
           <img onClick={e=>setsearchFilter({...searchFilter,location:""})} className='cursor-pointer' src={assets.cross_icon} alt=''/>
           </span>
        )}
        </div>
      </>
    )}
    <button onClick={e=>setShowFilters(prev=>!prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
      {showFilters?"close":"Filters"}
    </button>
    {/* Job Categories */}
  <div className={showFilters?"":"max-lg:hidden"}>
      <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
      <ul className='space-y-4 text-gray-600'>
        {
          JobCategories.map((category,index)=>(
           <li className='flex gap-3 items-center' key={index}>
            <input 
             className='scale-125'
             type='checkbox'
              onChange={()=>handleCategoryChange(category)}
              checked={selectedCategories.includes(category)}
             />
            {category}
           </li>
          ))
        }
      </ul>
    </div>
    {/* Location Categories */}
    <div className={showFilters?"":"max-lg:hidden"}>
      <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
      <ul className='space-y-4 text-gray-600'>
        {
          JobLocations.map((location,index)=>(
           <li className='flex gap-3 items-center' key={index}>
            <input 
             className='scale-125'
              type='checkbox' 
              onChange={()=>handleLocationChange(location)}
              checked={selectedLocations.includes(location)}
             />
            {location}
           </li>
          ))
        }
      </ul>
    </div>
</div>
{/* Job Listings */}
<section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
  <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
  <p className='mb-8'>Get your desired job from top companies</p>
  <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
    {/* Job Card Component */}
    {
      filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=>(
         <Jobcard key={index} job={job} />
      ))
    }
  </div>
  {/* Pagination */}
  {
   filteredJobs.length > 0 && (
    
      <div className='flex items-center justify-center space-x-2 mt-10'>
        <a href='#job-list'>
          <img
            onClick={()=>setCurrentPage(Math.max(currentPage-1),1)}
            src={assets.left_arrow_icon}
            alt=""
            className=""
          />
        </a>
      

      {Array.from({ length: Math.ceil( filteredJobs.length / 6) }).map((_, index) => (
        <a href='#job-list' key={index}>
          <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage===index+1?'bg-blue-100 text-blue-500':'text-gray-500'}`}>{index + 1}</button>
        </a>
      ))}

      <a href='#job-list'>
          <img
            onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil( filteredJobs.length/6)))}
            src={assets.right_arrow_icon}
            alt=""
            className=""
          />
        </a>

      </div>
  )
}

</section>

    </div>
  )
}

export default Joblistings