import { createContext,useState,useEffect} from "react";
import { jobsData } from "../assets/assets";
export const AppContext = createContext();
export const AppContextProvider = (props)=>{
    const [searchFilter,setsearchFilter]=useState({
        title:"",
        location:""
    });
    const [isSearched,setisSearched]=useState(false);
    const [jobs,setJobs]=useState([]);
    const [showRecruiterLogin,setshowRecruiterLogin]=useState(false);
    //fetch jobs from backend based on search filter
    const fetchJobs = async () => {
        setJobs(jobsData);
    }
    useEffect(() => {
    setJobs(jobsData);
     }, []);
    const value={
        searchFilter,
        setsearchFilter,
        isSearched,
        setisSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setshowRecruiterLogin
    }
    return <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
}