const express = require('express');
const companyRoute = express.Router();
const controller = require('../Controller/companyController');
const upload = require('../middleware/imageHandler');
const {postJobValidationRules} = require('../validation/Validation')

companyRoute.get('/Dashboard',controller.checkAuthenticated, controller.companyDashboard)

companyRoute.get('/applicants',controller.checkAuthenticated, controller.getJobApplicant)
companyRoute.get('/applicants/:status/:id', controller.respondToApplication)

companyRoute.get('/profile/:id',controller.checkAuthenticated, controller.getProfileForm)
companyRoute.post('/profile/:id',upload.single('company_logo'), controller.updateProfile)


companyRoute.get('/postJobs',controller.checkAuthenticated, controller.getPostJobForm)
companyRoute.post('/postJobs/:id',postJobValidationRules, controller.checkCompanyVerification, controller.postJob)


companyRoute.get('/postJobs/edit/:job_id',controller.checkAuthenticated, controller.getEditJobForm)
companyRoute.post('/postJobs/update/:job_id', controller.updateJobDetail)

companyRoute.get('/deleteJob/:job_id',controller.checkAuthenticated, controller.deleteJob)

module.exports = {companyRoute}