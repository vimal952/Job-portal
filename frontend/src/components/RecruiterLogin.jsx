import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function RecruiterLogin() {
  const navigate=useNavigate();
  const [state,setstate]=useState('Login');
  const [name,setname]=useState('');
  const [password,setpassword]=useState('');
  const [email,setemail]=useState('');
  const [image,setimage]=useState(false);
  const [isTextDataSubmitted,setisTextDataSubmitted]=useState(false);
  const {setshowRecruiterLogin,backendUrl,setCompanyToken,setCompanyData}=useContext(AppContext);
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (state === "Sign Up" && !isTextDataSubmitted) {
    setisTextDataSubmitted(true);
    return;
  }
  try {
    if (state === "Login") {
      const { data } = await axios.post(
        backendUrl + "/api/company/login",
        { email, password }
      );
      //console.log(data); 
      if(data.success){
        console.log(data)
        setCompanyData(data.company)
        setCompanyToken(data.token)
        localStorage.setItem('companyToken',data.token)
        setshowRecruiterLogin(false);
        navigate('/dashboard')
      }
      else{
        toast.error(data.message)
      }

    }
    else{
      if(!image){
    toast.error("Please upload company logo")
    return
  }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/company/register",
        formData
      );
      if(data.success){
        console.log(data)
        setCompanyData(data.company)
        setCompanyToken(data.token)
        localStorage.setItem('companyToken',data.token)
        setshowRecruiterLogin(false);
        navigate('/dashboard')
      }
      else{
        toast.error(data.message)
      }
    }
  } catch (error) {
     toast.error(error.message)
  }
};
  useEffect(()=>{
     document.body.style.overflow='hidden';
      return()=>{
        document.body.style.overflow='unset';
      }
  },[])
  return (
     
   <div className='absolute  top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
    <form onSubmit={handleSubmit} className='relative bg-white p-10 rounded-xl text-state-500'>
     <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
     <p className='tex-sm'>Welcome back! Please sign in to continue</p>
     {state==='Sign Up' && isTextDataSubmitted ?<>
     <div className='flex items-center gap-4 my-10'>
       <label htmlFor="image">
        <img className='w-16 rounded-full' src={image? URL.createObjectURL(image): assets.upload_area} alt=''/>
        <input onChange={e=>setimage(e.target.files[0])} type="file" id='image' hidden  />
       </label>
       <p>Upload Company <br/> logo</p>
     </div>
     </>
     :
      <>
        {state!=='Login' && ( <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
           <img src={assets.person_icon}  alt=''/>
           <input className='outline-none text-sm' onChange={e=>setname(e.target.value)} value={name} type="text" placeholder='Company name' required/>
        </div>)}
       
         <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
           <img src={assets.email_icon} alt=''/>
           <input className='outline-none text-sm' onChange={e=>setemail(e.target.value)} value={email} type="text" placeholder='Company email' required/>
        </div>
         <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
           <img src={assets.lock_icon} alt=''/>
           <input className='outline-none text-sm' onChange={e=>setpassword(e.target.value)} value={password} type="password" placeholder='Password' required/>
        </div>
     </>
     }
     {state==='Login' && <p className='text-sm text-blue-600 mt-4  cursor-pointer'>Forgot Password ?</p>}
     <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4 '>
      {state==='Login'?'Login':isTextDataSubmitted?'Create Account':'Next'}
     </button>
     {state==='Login' ?<p className='text-center mt-5'>Don't have an account ? <span className='text-blue-600 cursor-pointer' onClick={()=>setstate('Sign Up')}>Sign Up</span></p>
     :<p className='text-center mt-5'>Already have an account ? <span className='text-blue-600 cursor-pointer' onClick={()=>setstate('Login')}>Login</span></p>}
      <img onClick={()=>setshowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt=""/>
    </form>
   </div>
  )
}

export default RecruiterLogin