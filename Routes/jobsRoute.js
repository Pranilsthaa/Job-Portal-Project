const express = require('express')
const jobsRoute = express.Router();

const controller = require('../Controller/jobsController')

const {paginatedResults} = require('../Pagination/pagination')

jobsRoute.get('/jobs', controller.getJobs) 

module.exports = {jobsRoute}