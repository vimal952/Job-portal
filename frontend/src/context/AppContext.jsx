import { createContext,useState,useEffect} from "react";
export const AppContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContextProvider = (props)=>{
    const [searchFilter,setsearchFilter]=useState({
        title:"",
        location:""
    });
    const {user}=useUser();
    const {getToken}=useAuth();
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [isSearched,setisSearched]=useState(false);
    const [jobs,setJobs]=useState([]);
    const [showRecruiterLogin,setshowRecruiterLogin]=useState(false);
    const [companyToken,setCompanyToken]=useState(null)
    const [companyData,setCompanyData]=useState(null)
    const [userData,setUserData]=useState(null)
    const [userApplications,setUserApplications]=useState([])
    //fetch jobs from backend based on search filter
    const fetchJobs = async () => {
  try {
    const { data } = await axios.get(backendUrl + "/api/jobs");

    if (data.success) {
      setJobs(data.jobs);
    } 
    else {
      toast.error(data.message);
    }

  } 
  catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
//function to fetch user data
    const fetchUserData = async () => {
        try{
            const token=await getToken();
        const {data}=await axios.get(backendUrl+'/api/users/user',{headers:{Authorization:`Bearer ${token}`}});
        if(data.success){
            setUserData(data.user)
            console.log(data)
        }
        else{
            toast.error(data.message)
        }

        }
        catch(error){
           toast.error(error.message)
        }
    }
    //function to fetch company data
    const fetchCompanyData = async () => {
        try{
        const {data}=await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}});
        if(data.success){
            setCompanyData(data.company)
            console.log(data)
        }
        else{
            toast.error(data.message)
        }

        }
        catch(error){
           toast.error(error.message)
        }
    }
    useEffect(() => {
        if(companyToken)fetchCompanyData();
    },[companyToken]);
    useEffect(() => {
     fetchJobs();
     const storedCompanyToken = localStorage.getItem('companyToken');
     if (storedCompanyToken) {
       setCompanyToken(storedCompanyToken);
     }
     }, []);
    useEffect(() => {
        if(user){
            fetchUserData();
            fetchUserApplications();
        }
    },[user]);
    //function to fetch user applications
    const fetchUserApplications = async () => {
        try{
            const token=await getToken();
            const {data}=await axios.get(backendUrl+'/api/users/applications',{headers:{Authorization:`Bearer ${token}`}});
            if(data.success){
                setUserApplications(data.applications)
                console.log(data)
            }
            else{
                toast.error(data.message)
            }
    
            }
            catch(error){
               toast.error(error.message)
            }
    }
    const value={
        searchFilter,
        setsearchFilter,
        isSearched,
        setisSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setshowRecruiterLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        backendUrl,
        userData,
        setUserData,
       userApplications,
       setUserApplications,
       fetchUserData,
       fetchUserApplications
    }

    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
}