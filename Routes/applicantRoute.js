const express = require('express')
const applicantRoute = express.Router();

const controller = require('../Controller/jobsController')
const applicant_controller = require('../Controller/applicantController')


const {paginatedResults} = require('../Pagination/pagination');
const upload = require('../middleware/fileHandler');

applicantRoute.get('/jobs',applicant_controller.checkAuthenticated, controller.getJobs) 
applicantRoute.get('/jobs/:job_id',applicant_controller.checkAuthenticated, controller.getJobsDetailByID) 

// applicantRoute.get('/profile',applicant_controller.checkAuthenticated, controller.getJobsDetailByID) 
applicantRoute.get('/profile/:id', applicant_controller.getProfileForm) 
applicantRoute.post('/profile/:id',upload.single('applicant_resume'), applicant_controller.updateApplicantProfile) 

applicantRoute.get('/apply/:app_id/:job_id', applicant_controller.applyApplicant)

applicantRoute.get('/trackStatus', applicant_controller.getTrackStatus) 


module.exports = {applicantRoute}