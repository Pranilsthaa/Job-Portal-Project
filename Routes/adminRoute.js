const express = require('express');
const adminRoute = express.Router();
const adminController = require('../Controller/admincontroller');

adminRoute.get('/dashboard', adminController.getAdminDashboard)    //ADMIN DASHBOARD

adminRoute.get('/applicant', adminController.getApplicants)    
adminRoute.get('/applicant/terminate/:id', adminController.terminateApplicant)    
adminRoute.get('/applicant/authorize/:id', adminController.authorizeApplicant)    

adminRoute.get('/company', adminController.getCompanies)    
adminRoute.get('/company/:id', adminController.getCompanyInfo)    
adminRoute.get('/company/terminate/:id', adminController.terminateCompany)    

adminRoute.get('/notification', adminController.getnotification)  

adminRoute.get('/verifycompany/:id', adminController.verifycompany)  

adminRoute.get('/message', adminController.getMessage)  



module.exports = {adminRoute}