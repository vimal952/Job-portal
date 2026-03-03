import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
function Addjob() {
  const[title,settitle]=useState('');
  const [location,setlocation]=useState('Bangalore');
  const [category,setcategory]=useState('Programming');
  const [level,setlevel]=useState('Beginner level');
  const [salary,setsalary]=useState(0);
  const editorRef=useRef(null);
  const quillRef=useRef(null);

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current=new Quill(editorRef.current,{
        theme:'snow',
        placeholder:'Type job description here...',
    })
  }
  })
  return (
    <form className='container p-4 flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className='mb-2'>
         Job Title 
        </p>
        <input className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' type='text' placeholder='Type here' onChange={e=>settitle(e.target.value)} value={title} required/>
      </div>
      <div className='w-full max-w-lg'>
        <p className='my-2'> Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Category</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setcategory(e.target.value)} >
            { JobCategories.map((category,index)=>(
              <option key={index} value={category}>{category}</option>
            )) }
          </select>
        </div>
         <div>
          <p className='mb-2'>Job Location</p>
          <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setlocation(e.target.value)} >
            { JobLocations.map((location,index)=>(
              <option key={index} value={location}>{location }</option>
            )) }
          </select>
        </div>
         <div>
          <p className='mb-2'>Job Level</p>
          <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded'   onChange={e=>setlevel(e.target.value)} >
            <option value={'Beginner level'}>Beginner level</option>
            <option value={'Intermediate level'}>Intermediate level</option>
            <option value={'Senior level'}>Senior level</option>
          </select>
        </div>
      </div>
       <div>
        <p className='mb-2'> Job Salary</p> 
        <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' type='number' placeholder='Enter salary' onChange={e=>setsalary(e.target.value)} value={salary} required/>
       </div>
       <button className='w-28 py-3 mt-4 bg-black text-white rounded' type='submit'>Add Job</button>
    </form> 
  )
}

export default Addjob