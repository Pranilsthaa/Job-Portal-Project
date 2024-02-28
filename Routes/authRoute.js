const express = require('express')
const passport = require('passport')
const authRoute = express.Router();

const applicantController = require('../Controller/applicantController')
const companyController = require('../Controller/companyController');



authRoute.get('/userLogin', applicantController.checkNotAuthenticated, applicantController.loginApplicantForm)           // FOR USER ROUTE
authRoute.post('/userLogin',applicantController.getData, passport.authenticate('local', {
    successRedirect: '/applicant/jobs',
    failureRedirect:'/userLogin',
    failureFlash: true,
    successFlash: true
}))

authRoute.get('/userRegister', applicantController.registerForm)
authRoute.post('/userRegister', applicantController.registerApplicant)


authRoute.get('/companyLogin',companyController.checkNotAuthenticated, companyController.loginCompany)                                                          // FOR COMPANY ROUTE
authRoute.post('/companyLogin',companyController.getData, passport.authenticate('local', {
    successRedirect: '/company/Dashboard',
    failureRedirect:'/companyLogin',
    failureFlash: true,
    successFlash: true
}))

authRoute.get('/companyRegister', companyController.getRegisterCompanyForm) 
authRoute.post('/companyRegister', companyController.registerCompany) 


authRoute.delete('/applicantlogout', applicantController.logout ) // LOGOUT SESSION
authRoute.delete('/companylogout', companyController.logout) // LOGOUT SESSION

module.exports = {authRoute}