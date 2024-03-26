const express = require('express');
const adminRoute = express.Router();
const session = require('express-session');

const adminController = require('../Controller/admincontroller');
const clearLoginSuccessFlash = require('../middleware/checkFlash');


adminRoute.get('/dashboard', adminController.getAdminDashboard)    //ADMIN DASHBOARD

adminRoute.get('/applicant', adminController.getApplicants)    
adminRoute.get('/applicant/terminate/:id', adminController.terminateApplicant)    
adminRoute.get('/applicant/authorize/:id', adminController.authorizeApplicant)    

adminRoute.get('/company', adminController.getCompanies)    
adminRoute.get('/company/:id', adminController.getCompanyInfo)    
adminRoute.get('/company/terminate/:id', adminController.terminateCompany)    

adminRoute.get('/notification', adminController.getnotification)  

adminRoute.get('/verifycompany/:id', adminController.verifycompany)  



module.exports = {adminRoute}