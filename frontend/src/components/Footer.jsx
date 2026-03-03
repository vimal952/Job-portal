import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <footer className="mt-20 bg-blue-50 px-6 py-10">
      
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        
        <img  src={assets.logo} alt="logo" className="w-40" />

        <p className="text-sm text-gray-600">
          All rights reserved. © job-portal
        </p>

        <div className="flex gap-5">
          <img
            src={assets.facebook_icon}
            alt="facebook"
            className="w-9 cursor-pointer transition hover:scale-110"
          />
          <img
            src={assets.twitter_icon}
            alt="twitter"
            className="w-9 cursor-pointer transition hover:scale-110"
          />
          <img
            src={assets.instagram_icon}
            alt="instagram"
            className="w-9 cursor-pointer transition hover:scale-110"
          />
        </div>

      </div>
    </footer>
  )
}

export default Footer
