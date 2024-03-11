const companyModel = require('../Model/companyModel')
const jobModel = require('../Model/jobModel')
const applicationModel = require('../Model/applicationModel')
const bcrypt = require('bcrypt')
const initialize = require('../Auth/passport-config-company')
const passport = require('passport')
const { removeFile } = require('../middleware/removeFile')
const mail = require('../Nodemailer/nodemailer-config');
const loginCompany = (req, res) =>  {
    res.render('Authentication/login', {isApplicant : false})
}

const getRegisterCompanyForm = (req, res) =>  {
    res.render('Authentication/register', {isApplicant : false})
}

const companyDashboard = async (req, res) =>  {
    try{
         const id = req.user.company_id;
         let jobList = await companyModel.getJobListedByCompany(id);
         let applicantCount = await companyModel.getApplicantCount(req.user.company_id)
        
        let newjobList = jobList.map((job, index) => ({
            ...job,
            applicantCount: applicantCount[index].applicantCount || 0 
        }));
         res.render('Company/companyDashboard', {data: req.user, joblist: newjobList, applicantCount: applicantCount})
    }catch(error){
        console.log(error);
    }
}

const getPostJobForm = (req, res) =>  {
    res.render('Company/postJobs', {data: req.user})
}

const postJob = async (req, res) =>  {
    try {
        const value = req.body;
        const id = req.params.id;
        const data = await jobModel.addJobModel(value, id);
        res.redirect('/company/dashboard');
    } catch (error) {
        console.log(error)
    }
}
const getEditJobForm = async (req, res) =>  {
    try{      
        const job_id = req.params.job_id;
        let data = await jobModel.getJobDetailsByID(job_id);
        res.render('Company/postJobs', {data: req.user, isUpdate: true, values: data[0]})
    }
    catch(error){
        console.log(error);
    }
}

const updateJobDetail = async (req, res) =>  {
    try{      
        const job_id = req.params.job_id;
        const value = req.body;
        let data = await jobModel.updateJobDetail(value, job_id)
        req.flash('success', "Job Updated Successfully")
        res.redirect('/Company/Dashboard')
    }
    catch(error){
        console.log(error);
    }
}

const deleteJob = async (req, res) =>  {
    try{      
        const job_id = req.params.job_id;
    
        let data = await jobModel.deleteJob(job_id, req.user.company_id)
        req.flash('success', "Job Deleted Successfully")
        res.redirect('/Company/Dashboard')
    }
    catch(error){
        console.log(error);
    }
}
            
const getJobApplicant = async(req, res) =>  {
    try{
        let data = await companyModel.getApplicationInfo(req.user.company_id);
        res.render('Company/jobApplicant', {data: req.user, applicationInfo: data})
    }catch(error){
        console.log(error);
    }
}

const respondToApplication = async (req, res) => {       
    try{
            const status = req.params.status;
            const id = req.params.id;
            const data = await applicationModel.changeApplicationStatus(status,id);

            const applicantEmail = await applicationModel.getApplicantEmailByApplicationID(id);
            mail.main(applicantEmail[0].applicant_email, 'Applicantion Status', `Your Application has been ${status} by the company`); //calling nodemailer function
            return res.redirect('/company/applicants')
    }

    catch(error){
        throw error
    }
}

const getProfileForm = async (req, res) =>  {

    try{
        const id = req.params.id;
        const company = await companyModel.getCompanyDetailByID(id)
        
        res.render('Company/companyProfile', {company: company[0], data: req.user})
    }catch(error){
        console.log(error)
    }
}

const registerCompany = async (req, res) => {
    try{
        const value = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const data = await companyModel.registerCompany(value, hashedPassword);
        return res.render('Authentication/login', {isApplicant: false})
    }

    catch(error){
        throw error
    }
}

const getData = async (req, res, next) => {
    try{
        const data = await companyModel.getCompanyDetail();
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format returned by getCompanyDetail');
        }
        initialize(passport, 
            email => data.find(user => user.company_email === email),
            id => data.find(user => user.company_id === id)
            );
            next();
        } catch(error){
            throw error
        }
        
    }

    //------------------------------------------------------CHECK AUTHENTICATION MIDDLEWARE

    // function checkAuthenticated(req, res, next) {   // Protecting Route
    //     if (req.isAuthenticated()) {
    //         if (req.user.role === 'company') {
    //             return next();
    //         } else {
    //             return res.status(403).send('Only One Session Per User');
    //         }
    //     }
    // }
    
    function checkAuthenticated(req, res, next) {   // Protecting Route
        if (req.isAuthenticated()) {
            if (req.user.role == 'company') {
                if (req.user.isVerified) {

                    return next();
                } else {
                    return res.send('waiting_for_approval');
                }
            } else {
                return res.status(403).send('Only companies can access this route');
            }
        } else {
            return res.redirect('/companyLogin');
        }
    }
    
    function checkNotAuthenticated(req, res, next) {       
        if (req.isAuthenticated()) {
            if (req.user.role === 'company') {
               res.redirect('/company/dashboard')
            } else {
                return res.status(403).send('Only One Session Per User');
            }
        }
            next();
    }


// UpdateProfileWithoutImg
    const updateProfile = async (req, res) => {
        let imgSRC;
        try{
            let file = req.file;
            const id = req.params.id;
            const values = req.body;
            if(file){
                 imgSRC = req.file.filename;
                const data = await companyModel.getImageURL(id);
                if (data.length > 0) {
                    await companyModel.updateCompanyDetails(values, id, imgSRC);
                    removeFile(data[0].company_image)
                }
                req.flash('success', 'Updated Successfully')
                return res.redirect(`/company/profile/${id}`)
            }
            else {
                   let data = await companyModel.updateProfileWithoutImg(values, id);
                  
            }
            req.flash('success', 'Updated Successfully')
            return res.redirect(`/company/profile/${id}`)
        }catch(error){
            removeFile(imgSRC);
            console.log(error);
        }
    }

    const logout = (req, res) => {
        req.logout((err)=>{
                if(err){
                    return next(err)
                }
            res.redirect('/companyLogin')
        });
        
    }

 
    

module.exports={
    loginCompany,
    getRegisterCompanyForm,
    companyDashboard,
    getPostJobForm,
    getJobApplicant,
    registerCompany,
    getData,
    checkAuthenticated,
    checkNotAuthenticated,
    getProfileForm,
    updateProfile,
    postJob,
    logout,
    getEditJobForm,
    updateJobDetail,
    deleteJob,
    respondToApplication
}

