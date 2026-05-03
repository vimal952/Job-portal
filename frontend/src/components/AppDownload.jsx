import React from 'react'
import { assets } from '../assets/assets'
function AppDownload() {
  return (
    <div className="mx-auto my-20 max-w-6xl px-6">
      
      <div className="flex flex-col items-center gap-12 rounded-3xl bg-blue-100 p-10 md:flex-row md:justify-between">
        
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="mb-6 max-w-md text-3xl font-bold leading-snug text-gray-900 md:text-4xl">
            Download Mobile App For Better Experience
          </h1>

          <div className="flex justify-center gap-4 md:justify-start">
            <a href="#">
              <img
                src={assets.play_store}
                alt=""
                className="h-12 cursor-pointer transition hover:scale-105"
              />
            </a>

            <a href="#">
              <img
                src={assets.app_store}
                alt=""
                className="h-12 cursor-pointer transition hover:scale-105"
              />
            </a>
          </div>
        </div>

        {/* Right Image */}
        <a href="#">
          <img
            src={assets.app_main_img}
            alt=""
            className="max-h-80 transition hover:scale-105 max-lg:hidden"
          />
        </a>

      </div>
    </div>
  )
}

export default AppDownload
