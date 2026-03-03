import React from "react";
import { assets } from "../assets/assets";
import { useState,useContext,useRef } from "react";
import { AppContext } from "../context/AppContext";

function Hero() {
    const {searchFilter,setsearchFilter,isSearched,setisSearched}=useContext(AppContext);
    const titleRef=useRef(null);
    const locationRef=useRef(null);
    //search function
    const onsearch=()=>{
        setsearchFilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        });
        setisSearched(true);
      
    }
  return (
    <div className="container mx-auto my-10 px-4 2xl:px-20">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-16 px-6 text-center rounded-xl shadow-lg">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Over 10,000+ Jobs to Apply
        </h2>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto mb-8">
          Your Next Big Career Move Starts Right Here – Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-0 p-3 max-w-3xl mx-auto">

          {/* Job Search */}
          <div className="flex items-center gap-2 w-full px-2">
            <img src={assets.search_icon} alt="search" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="text-black text-sm sm:text-base p-2 outline-none w-full"
                ref={titleRef}
            />
          </div>

          {/* Divider */}
          <span className="hidden sm:block h-8 w-px bg-gray-300"></span>

          {/* Location */}
          <div className="flex items-center gap-2 w-full px-2">
            <img src={assets.location_icon} alt="location" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Location"
              className="text-black text-sm sm:text-base p-2 outline-none w-full"
              ref={locationRef}
            />
          </div>

          {/* Button */}
         <button onClick={onsearch} className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-md text-sm sm:text-base font-medium w-full sm:w-auto mt-2 sm:mt-0 sm:ml-3">
          Search
           </button>
        </div>
      </div>
      <div className="container mx-auto my-12 px-4 2xl:px-20">
  <div className="bg-white rounded-xl shadow-sm py-4 px-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">

    {/* Text */}
    <p className="text-gray-500 text-sm font-medium whitespace-nowrap">
      Trusted by
    </p>

    {/* Logos */}
    <img
      src={assets.microsoft_logo}
      alt="Microsoft"
      className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition"
    />
    <img
      src={assets.walmart_logo}
      alt="Walmart"
      className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition"
    />
    <img
      src={assets.accenture_logo}
      alt="Accenture"
      className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition"
    />
    <img
      src={assets.samsung_logo}
      alt="Samsung"
      className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition"
    />
    <img
      src={assets.amazon_logo}
      alt="Amazon"
      className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition"
    />
    <img
      src={assets.adobe_logo}
      alt="Adobe"
      className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition"
    />
  </div>
</div>

    </div>
  );
}

export default Hero;
