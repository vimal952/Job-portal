import express from 'express';
import { registerCompany, loginCompany, getCompanyData, postJob, getJobApplicants, getPostedJobs, changeApplicationStatus, checkJobVisibility } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';
const router=express.Router();

//Register a company
router.post('/register',upload.single('image'), registerCompany);

//Company login
router.post('/login', loginCompany);

//Get company data
router.get('/company',protectCompany, getCompanyData);

//Post a new job
router.post('/post-job',protectCompany, postJob);

//Get company job applicants
router.get('/applicants', protectCompany, getJobApplicants);
 
//Get company posted jobs
router.get('/list-jobs', protectCompany, getPostedJobs);

//Change job application status
router.post('/change-status', protectCompany, changeApplicationStatus);

//Check job visibility
router.post('/change-visibility', protectCompany, checkJobVisibility);

export default router;