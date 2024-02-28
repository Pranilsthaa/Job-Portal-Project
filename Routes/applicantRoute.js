const express = require('express')
const applicantRoute = express.Router();

const controller = require('../Controller/jobsController')
const applicant_controller = require('../Controller/applicantController')

const {paginatedResults} = require('../Pagination/pagination');

applicantRoute.get('/jobs',applicant_controller.checkAuthenticated, controller.getJobs) 
applicantRoute.get('/jobs/:job_id',applicant_controller.checkAuthenticated, controller.getJobsDetailByID) 

// applicantRoute.get('/profile',applicant_controller.checkAuthenticated, controller.getJobsDetailByID) 
applicantRoute.get('/profile', applicant_controller.getProfileForm) 


module.exports = {applicantRoute}