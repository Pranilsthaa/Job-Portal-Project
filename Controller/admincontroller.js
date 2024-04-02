const {applicantModel} = require('../Model/applicantModel')
const {companyModel} = require('../Model/companyModel')
const {applicationModel} = require('../Model/applicationModel')
const {jobModel} = require('../Model/jobModel')
const mail = require('../Nodemailer/nodemailer-config') 


const getAdminLogin = (req, res) => {
    res.render('Admin/login', {layout: 'admin'})
}

const getAdminDashboard = async (req, res) => {
    try{
     let data = await applicationModel.getUserData();
     req.flash('loginSuccess', 'Logged in Successfully');
     res.render('Admin/dashboard', {layout: 'admin',
                                    user: req.user.role,
                                    applicants: data[0][0].total_applicants,
                                    companies: data[2][0].total_companies,
                                    jobs: data[3][0].total_jobs_posted,
                                    applications: data[1][0].total_applications,
                                    })
    }catch(error){
        console.log(error);
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
            res.render('Admin/applicant', {layout: 'admin',
                                           user: req.user.role,
                                           data: data,
                                           totalPage: totalPage,
                                           currentPage: page,
                                           applicantPage: true})
        }catch(error){
            console.log(error)
        }
    } 
 
 

    const getnotification = async (req, res) => {
        try{
            let data = await companyModel.getUnverifiedCompany();
            res.render('Admin/notification', {layout: 'admin',
                                              user: req.user.role,
                                              data: data})
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

    
    const getCompanies = async (req, res) => {  // /admin/company
        try{
            let searchQuery = req.query.name || '';
            // let page = req.query.page || 1;
            let data = await companyModel.getCompanyDetailAdmin(searchQuery);
            // let companyData = await applicationModel.getUserData();

            // let totalCompanies = parseInt(companyData[2][0].total_companies);
            // let totalPage = Math.ceil(totalCompanies / 10);


            res.render('Admin/company', {layout: 'admin',
                                         user: req.user.role,
                                         data: data,
                                         companyPage: true,
                                        })
        }catch(error){
            console.log(error)
        }
    }
 
    const getCompanyInfo = async (req, res) => {  // /admin/company/:id
        try{
            const id = req.params.id;
            let data = await companyModel.getCompanyDetail();
            let add_info = await jobModel.getJobsbyCompanyID(id);
            res.render('Admin/company', {layout: 'admin', user: req.user.role, data: data, info: add_info})
        }catch(error){
            console.log(error)
        }
    }

    const terminateCompany = async (req, res) => {
        try{
            const id = req.params.id;
            let data = await companyModel.terminateCompany(id);
            let company_info = await companyModel.getCompanyDetailByID(id);
            mail.main(company_info[0].company_email, 'Company Termination', `Sorry! Unfortunately Your Company ${company_info[0].company_name} has been terminated. You cannot post jobs until authorization.`);
            res.redirect('/admin/company')
        }catch(error){
            console.log(error);
        }
    }

    const terminateApplicant = async (req, res) => {
        try{
            const id = req.params.id;
            let data = await applicantModel.terminateApplicant(id);
            let user_info = await applicantModel.getApplicantDetailByID(id);
            mail.main(user_info[0].applicant_email, 'Account Termination', `Sorry! Unfortunately Your Job-seeking account named ${user_info[0].applicant_name} has been terminated. You cannot access the account until authorization.`);
            res.redirect('/admin/applicant')
        }catch(error){
            console.log(error);
        }
    }

    const authorizeApplicant = async (req, res) => {
        try{
            const id = req.params.id;
            let data = await applicantModel.authorizeApplicant(id);
            let user_info = await applicantModel.getApplicantDetailByID(id);
            mail.main(user_info[0].applicant_email, 'Account Authorization', `Congratulations! Your Job-seeking account named ${user_info[0].applicant_name} has been authorized. You can now access the account.`);
            res.redirect('/admin/applicant')
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

    const sendMessage = async (req, res) => {
        try{
           const value = req.body;
            let data = await jobModel.sendMessage(value);
            res.redirect('/home#contact')
        }catch(error){
            console.log(error);
        }
    }

    const getMessage = async (req, res) => {
        try{
            let data = await jobModel.getMessage();
            res.render('Admin/message', {layout: 'admin', user: req.user.role, data: data})
        }catch(error){
            console.log(error);
        }
    }

module.exports = {
    getAdminLogin,
    getAdminDashboard,
    logout,
    checkAuthenticated,
    getApplicants,
    getCompanies,
    getnotification,
    verifycompany,
    getCompanyInfo,
    terminateCompany,
    terminateApplicant,
    authorizeApplicant,
    sendMessage,
    getMessage
}


