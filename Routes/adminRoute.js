const express = require('express');
const adminRoute = express.Router();
const session = require('express-session');

const adminController = require('../Controller/admincontroller');


adminRoute.get('/dashboard', adminController.getAdminDashboard)    //ADMIN DASHBOARD
adminRoute.get('/applicant', adminController.getApplicants)    

adminRoute.get('/company', adminController.getCompanies)    
adminRoute.get('/company/:id', adminController.getCompanyInfo)    

adminRoute.get('/notification', adminController.getnotification)  

adminRoute.get('/verifycompany/:id', adminController.verifycompany)  


// adminRoute.get('/destroy', (req, res)=> {
//         res.clearCookie('sid');
//         // req._destroy();
//     })
  



module.exports = {adminRoute}