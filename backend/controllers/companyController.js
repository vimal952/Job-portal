import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utills/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApllication.js";
//Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file; // Access the uploaded file

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({ success: false, message: "Company already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Post a new job
export const postJob = async (req, res) => {
  const { category, level, title, description, location, salary } = req.body;
  const companyId = req.company._id;

  try {
    const newjob = new Job({
      category,
      level,
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
    });

    await newjob.save();
    res.json({ success: true, newjob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get Company job applicants
export const getJobApplicants = async (req, res) => {
  try{
     const companyId=req.company._id;
     const applications=await JobApplication.find({companyId})
     .populate('userId','name image resume')
     .populate('jobId','title location category level salary')
     .exec()
     return res.json({success:true,applications})
  }
  catch(error){
    res.json({success:false,message:error.message})
  }
};

// get company posted jobs
export const getPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });
    //Adding no. of applications for each job
    const jobsData=await Promise.all(jobs.map(async (job) => {
      const jobsData = await JobApplication.find({ jobId: job._id });
      job.applicants = jobsData.length;
      return {...job.toObject(), applicants: jobsData.length};
    }))

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// change Job application status
export const changeApplicationStatus = async (req, res) => {
  try{
    const {id,status}=req.body;
    await JobApplication.findOneAndUpdate({_id:id},{status})
    res.json({success:true,message:"Application status changed"})
  }
  catch(error){
    res.json({success:false,message:error.message})
  }
};

//check job visibility
export const checkJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (companyId.toString() !== job.companyId.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    job.visible = !job.visible;
    await job.save();

    res.json({ success: true, message: "Job visibility changed", job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};