const express = require('express');
const companyRoute = express.Router();
const controller = require('../Controller/companyController');
const upload = require('../middleware/imageHandler');
const jobModel = require('../Model/jobModel')

companyRoute.get('/Dashboard',controller.checkAuthenticated, controller.companyDashboard)

companyRoute.get('/applicants', controller.getJobApplicant)
companyRoute.get('/applicants/:status/:id', controller.respondToApplication)

companyRoute.get('/profile/:id', controller.getProfileForm)
companyRoute.post('/profile/:id',upload.single('company_logo'), controller.updateProfile)


companyRoute.get('/postJobs', controller.getPostJobForm)
companyRoute.post('/postJobs/:id', controller.postJob)


companyRoute.get('/postJobs/edit/:job_id', controller.getEditJobForm)
companyRoute.post('/postJobs/update/:job_id', controller.updateJobDetail)

companyRoute.get('/deleteJob/:job_id', controller.deleteJob)

module.exports = {companyRoute}