const express = require('express')
const passport = require('passport')
const authRoute = express.Router();

const applicantController = require('../Controller/applicantController')
const companyController = require('../Controller/companyController');



authRoute.get('/userLogin', applicantController.checkNotAuthenticated, applicantController.loginApplicantForm)           // FOR USER ROUTE

authRoute.post('/userLogin', passport.authenticate('local', {
    successRedirect: '/jobs',
    failureRedirect:'/userLogin',
    failureFlash: true
}))

authRoute.get('/userRegister', applicantController.registerForm)
authRoute.post('/userRegister', applicantController.registerApplicant)


authRoute.get('/companyLogin', companyController.loginCompany)           // FOR COMPANY ROUTE
authRoute.get('/companyRegister', companyController.registerCompany) 



module.exports = {authRoute}