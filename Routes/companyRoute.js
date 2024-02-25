const express = require('express');
const companyRoute = express.Router();
const controller = require('../Controller/companyController')

companyRoute.get('/companyDashboard', controller.companyDashboard)
companyRoute.get('/postJobs', controller.getPostJobForm)

module.exports = {companyRoute}