const express = require('express')
const authRoute = express.Router();

const applicantController = require('../Controller/applicantController')
const companyController = require('../Controller/companyController')


authRoute.get('/userLogin', applicantController.loginApplicant)           // FOR USER ROUTE
authRoute.get('/userRegister', applicantController.registerApplicant)

authRoute.get('/companyLogin', companyController.loginCompany)           // FOR COMPANY ROUTE
authRoute.get('/companyRegister', companyController.registerCompany) 



module.exports = {authRoute}