const express = require('express')
const authRoute = express.Router();

const applicantController = require('../Controller/applicant')
const companycontroller = require('../Controller/company')


authRoute.get('/userLogin', applicantController.loginApplicant)           // FOR USER ROUTE
authRoute.get('/userRegister', applicantController.registerApplicant)

authRoute.get('/companyLogin', companycontroller.loginCompany)           // FOR COMPANY ROUTE
authRoute.get('/companyRegister', companycontroller.registerCompany) 


authRoute.get('/jobs', applicantController.getJobs) 



module.exports = {authRoute}