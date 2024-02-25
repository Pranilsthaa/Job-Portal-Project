const express = require('express')
const passport = require('passport')
const authRoute = express.Router();

const applicantController = require('../Controller/applicantController')
const companyController = require('../Controller/companyController');



authRoute.get('/userLogin', applicantController.checkNotAuthenticated, applicantController.loginApplicantForm)           // FOR USER ROUTE


authRoute.post('/userLogin',applicantController.getData, passport.authenticate('local', {
    successRedirect: '/jobs',
    failureRedirect:'/userLogin',
    failureFlash: true,
    successFlash: true
}))

authRoute.get('/userRegister', applicantController.registerForm)
authRoute.post('/userRegister', applicantController.registerApplicant)


authRoute.get('/companyLogin', companyController.loginCompany)           // FOR COMPANY ROUTE
authRoute.get('/companyRegister', companyController.registerCompany) 

authRoute.delete('/logout', applicantController.logout )

module.exports = {authRoute}