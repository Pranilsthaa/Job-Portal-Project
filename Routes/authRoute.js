const express = require('express')
const passport = require('passport')
const authRoute = express.Router();

const applicantController = require('../Controller/applicantController')
const companyController = require('../Controller/companyController');
const adminController = require('../Controller/admincontroller');
const { validateUserRegister } = require('../validation/Validation');
const clearLoginSuccessFlash = require('../middleware/checkFlash');


authRoute.get('/userLogin', applicantController.checkNotAuthenticated, applicantController.loginApplicantForm)           // FOR USER ROUTE
authRoute.post('/userLogin', passport.authenticate('applicant', {
    successRedirect: '/applicant/jobs',
    failureRedirect:'/userLogin',
    failureFlash: true,
    successFlash: true
}))

authRoute.get('/userRegister', applicantController.registerForm)
authRoute.post('/userRegister', validateUserRegister, applicantController.registerApplicant)


authRoute.get('/companyLogin',companyController.checkNotAuthenticated, companyController.loginCompany)                                                          // FOR COMPANY ROUTE
authRoute.post('/companyLogin', passport.authenticate('company', {
    successRedirect: '/company/Dashboard',
    failureRedirect:'/companyLogin',
    failureFlash: true,
}))

authRoute.get('/companyRegister', companyController.getRegisterCompanyForm) 
authRoute.post('/companyRegister',validateUserRegister, companyController.registerCompany) 




authRoute.get('/admin', adminController.getAdminLogin) 

authRoute.post('/admin', passport.authenticate('admin', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin',
    failureFlash: true,
    successFlash: true,
    successMessage: true
}))


authRoute.get('/home', (req, res) => {
    let userRole;
    if (req.user) {
        userRole = req.user.role;
      } else {
        userRole = 'guest';
      }
    res.render('Applicant/index', {layout: 'main', homepage: true, user: userRole ,isAuth: req.isAuthenticated() });
})

authRoute.post('/contactus', adminController.sendMessage )

authRoute.delete('/applicantlogout', applicantController.logout ) // LOGOUT SESSION
authRoute.delete('/companylogout', companyController.logout) // LOGOUT SESSION
authRoute.delete('/adminlogout', adminController.logout) // LOGOUT SESSION

module.exports = {authRoute}