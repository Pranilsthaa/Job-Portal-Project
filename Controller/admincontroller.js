const initialize = require('../Auth/passport-config-admin')
const passport = require('passport')
const applicantModel = require('../Model/applicantModel')
const companyModel = require('../Model/companyModel')
const applicationModel = require('../Model/applicationModel')
const jobModel = require('../Model/jobModel')
const mail = require('../Nodemailer/nodemailer-config') 

const getAdminLogin = (req, res) => {
    res.render('Admin/login', {layout: 'admin'})
}

const getAdminDashboard = async (req, res) => {
    try{
        let data = await applicationModel.getUserData();
        req.flash('loginSuccess', 'Logged In Successfully')
        res.render('Admin/dashboard', {layout: 'admin', user: req.user.role, applicants: data[0][0].total_applicants, companies: data[2][0].total_companies, jobs: data[3][0].total_jobs_posted, applications: data[1][0].total_applications })
    }catch(error){
        console.log(error);
    }
} 

const adminUser = JSON.parse(process.env.ADMIN_USER);

const getData = (req, res, next) => {
    try{
        const data = adminUser;
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format returned by getApplicantDetail');
        }
        initialize(passport, 
            username => data.find(adminUser => adminUser.username === username),
            id => data.find(adminUser => adminUser.id === id)
            );
            next();
        } catch(error){
            throw error
        }
        
    }

    const getApplicants = async (req, res) => {
        try{
            let page = req.query.page || 1;
            let searchQuery = req.query.name || '';
            let data = await applicantModel.getApplicantDetailPaginated(page, 10, searchQuery);
            let userData = await applicationModel.getUserData();
            let totalAppliants = parseInt(userData[0][0].total_applicants);

            let totalPage = Math.ceil(totalAppliants / 10);

            res.render('Admin/applicant', {layout: 'admin', user: req.user.role, data: data, totalPage: totalPage, currentPage: page, applicantPage: true})
        }catch(error){
            console.log(error)
        }
    } 

    const getCompanies = async (req, res) => {
        try{
            let data = await companyModel.getCompanyDetail();
            res.render('Admin/company', {layout: 'admin', user: req.user.role, data: data})
        }catch(error){
            console.log(error)
        }
    } 
    const getCompanyInfo = async (req, res) => {
        try{
            const id = req.params.id;
            let data = await companyModel.getCompanyDetail();
            let add_info = await jobModel.getJobsbyCompanyID(id);
            res.render('Admin/company', {layout: 'admin', user: req.user.role, data: data, info: add_info})
        }catch(error){
            console.log(error)
        }
    } 

    const getnotification = async (req, res) => {
        try{
            let data = await companyModel.getUnverifiedCompany();
            res.render('Admin/notification', {layout: 'admin', user: req.user.role, data: data})
        }catch(error){
            console.log(error)
        }
    } 

    const verifycompany = async (req, res) => {
        try{
            const id = req.params.id;
            let data = await companyModel.verifycompany(id);

            let company_info = await companyModel.getCompanyDetailByID(id);
            mail.main(company_info[0].company_email, 'Company Verification', `Congratulations! Your Company ${company_info[0].company_name} has been verified. You can now post jobs.`);
            res.redirect('/admin/notification')
        }catch(error){
            console.log(error);
        }
    }

    const logout = (req, res) => {
        req.logout((err)=>{
                if(err){
                    return next(err)
                }
            res.redirect('/admin')
        });
        
    }
 
    function checkAuthenticated(req, res, next) {    // ROUTE PROTECTION
        if (req.isAuthenticated()) {
            if (req.user.role === 'admin') {       
                return next();
            } else {
                return res.status(403).send('Only One Session Per User');
            }
     
        }
        res.redirect('/userLogin')
    }





module.exports = {
    getAdminLogin,
    getAdminDashboard,
    getData,
    logout,
    checkAuthenticated,
    getApplicants,
    getCompanies,
    getnotification,
    verifycompany,
    getCompanyInfo
}


