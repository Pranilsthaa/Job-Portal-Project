const express = require('express')
const jobsRoute = express.Router();

const controller = require('../Controller/jobsController')
const applicant_controller = require('../Controller/applicantController')

const {paginatedResults} = require('../Pagination/pagination')

jobsRoute.get('/jobs',applicant_controller.checkAuthenticated, controller.getJobs) 

module.exports = {jobsRoute}