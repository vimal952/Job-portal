import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Joblistings from '../components/Joblistings'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'
function Home() {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <Joblistings/>
    <AppDownload/>
    <Footer/>
    </div>
  )
}

export default Home