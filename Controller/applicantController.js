const applicantModel = require('../Model/applicantModel')
const applicationModel = require('../Model/applicationModel')
const jobModel = require('../Model/jobModel')
const initialize = require('../Auth/passport-config-user')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { removeApplicantFile } = require('../middleware/removeFile')

const loginApplicantForm = async (req, res) =>  {
    res.render('Authentication/login' , {isApplicant : true, isAuth: req.isAuthenticated()})
    
}

    const registerForm = (req, res) =>  {
        res.render('Authentication/register', {isApplicant : true})
    }

const registerApplicant = async (req, res) =>  {

    try{
        const value = req.body;
        const hasedPassword = await bcrypt.hash(req.body.password, 10)
        const data = await applicantModel.registerApplicant(value, hasedPassword);

        return res.render('Authentication/login', {isApplicant: true})
    }

    catch(error){
        throw error
    }
}

const getData = async (req, res, next) => {
    try{
        const data = await applicantModel.getApplicantDetail();
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format returned by getApplicantDetail');
        }
        initialize(passport, 
            email => data.find(user => user.applicant_email === email),
            id => data.find(user => user.applicant_id === id)
            );
            next();
        } catch(error){
            throw error
        }
        
    }

    const getProfileForm = async (req, res) =>{
        try {
            const id = req.params.id;
            let data = await applicantModel.getApplicantDetailByID(id)
            res.render('Applicant/applicantProfile', {data: req.user, info: data[0], id: req.user});   
        } catch (error) {
            console.log(error);
        }
    }
    const updateApplicantProfile = async (req, res) => {
        let cvSRC;
        try{
            let file = req.file;
            const id = req.params.id;
            const values = req.body;
            if(file){
                 cvSRC = req.file.filename;
                const data = await applicantModel.getImageURL(id);
                if (data.length > 0) {
                    await applicantModel.updateApplicantProfile(values, id, cvSRC);
                    removeApplicantFile(data[0].applicant_resume)
                }
                req.flash('success', 'Updated Successfully')
                return res.redirect(`/applicant/profile/${id}`)
            }
            else {
                   let data = await applicantModel.updateProfileWithoutImg(values, id);
                  
            }
            req.flash('success', 'Updated Successfully')
            return res.redirect(`/company/profile/${id}`)
        }catch(error){
            removeApplicantFile(cvSRC);
            console.log(error);
        }
    }
    
      const applyApplicant = async (req, res) =>{                   // Apply Applicant
        try {
            const applicant_id = req.params.app_id;
            const job_id = req.params.job_id;

            const applicant = await applicantModel.getApplicantDetailByID(applicant_id);
            const resumeURL = applicant[0].applicant_resume;

            let data = await jobModel.applyJob(applicant_id, job_id, resumeURL)
            req.flash('success', 'Applied Successfully')
            res.redirect(`/applicant/jobs/${job_id}`);   
        } catch (error) {
            console.log(error);
        }
    }

    const getTrackStatus = async (req, res) =>{                   // Apply Applicant
        try {
            let data = await applicationModel.getApplicationByID(req.user.applicant_id);
            
            res.render('Applicant/trackStatus', {data: data, id: req.user}) 
         
        } catch (error) {
            console.log(error);
        }
    }

//------------------------------------------------------CHECK AUTHENTICATION MIDDLEWARE

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/userLogin')
    }

    function checkNotAuthenticated(req, res, next) {
        
        if (req.isAuthenticated()) {
            return res.redirect('/jobs')
        }
        next()
    }

//------------------------------------------------------Logout

    const logout = (req, res) => {
        req.logOut((err)=>{
                if(err){
                    return next(err)
                }
            res.redirect('/userLogin')
        });
        
    }

module.exports={
    loginApplicantForm,
    registerForm,
    registerApplicant,
    checkAuthenticated,
    checkNotAuthenticated,
    getData,
    logout,
    getProfileForm,
    updateApplicantProfile,
    applyApplicant,
    getTrackStatus
}