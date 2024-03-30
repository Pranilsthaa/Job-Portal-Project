const {applicantModel} = require('../Model/applicantModel')
const {applicationModel} = require('../Model/applicationModel')
const {jobModel} = require('../Model/jobModel')
const bcrypt = require('bcrypt')
const { removeApplicantFile, removeApplicantProfilePic } = require('../middleware/removeFile')
const { validationResult } = require('express-validator');


const loginApplicantForm = async (req, res) =>  {
    res.render('Authentication/login' , {isApplicant : true, isAuth: req.isAuthenticated(), page: 'Applicant | Login'})  
}

const registerForm = (req, res) =>  {
res.render('Authentication/register', {isApplicant : true, page: 'Applicant | Register'})
}

const registerApplicant = async (req, res) =>  {

    try{
        const value = req.body;
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.render('Authentication/register', {isApplicant: true, page: 'Applicant | Register', error: error.mapped(), values: req.body})
        }
        else{
            const hasedPassword = await bcrypt.hash(req.body.password, 10);
            const data = await applicantModel.registerApplicant(value, hasedPassword);
           
            return res.render('Authentication/login', {isApplicant: true, page: 'Applicant | Register'})
        }
    }

    catch (error) {
        console.error('Error registering applicant:', error);
        res.status(500).send('An error occurred while registering applicant');
      }
}


    const getProfileForm = async (req, res) =>{
        try {
            const id = req.params.id;
            res.render('Applicant/applicantProfile', {data: req.user, isAuth: req.isAuthenticated(), page: "Profile"});   
        } catch (error) {
            console.log(error);
        }
    }
    const updateApplicantProfile = async (req, res) => {
        let cvSRC, profilePicSRC;
      
        try {
          const id = req.params.id;
          const values = req.body;
      
          // Check if resume or profile picture is uploaded
          if (req.files) {
            if (req.files.resume) {
              cvSRC = req.files.resume[0].filename;
            }
            if (req.files.profilePic) {
              profilePicSRC = req.files.profilePic[0].filename;
            }
          }
      
          // Get existing resume and profile picture URLs
          const data = await applicantModel.getImageURL(id);
      
          // Update applicant profile with new resume and/or profile picture
          if (cvSRC || profilePicSRC) {
            const updatedValues = {
              ...values,
              applicant_resume: cvSRC || data[0].applicant_resume,
              profile_picture: profilePicSRC || data[0].profile_picture,
            };
            await applicantModel.updateApplicantProfile(updatedValues, id);
      
            // Remove old resume and profile picture files
            if (cvSRC && data[0].applicant_resume) {
              removeApplicantFile(data[0].applicant_resume);
            }
            if (profilePicSRC && data[0].applicant_profilePic) {
                removeApplicantProfilePic(data[0].applicant_profilePic);
            }
          } else {
            // Update applicant profile without resume or profile picture
            await applicantModel.updateProfileWithoutImg(values, id);
          }
      
          req.flash('success', 'Updated Successfully');
          res.redirect(`/applicant/profile/${id}`);
        } catch (error) {
          // Remove uploaded files in case of error
          if (cvSRC) {
            removeApplicantFile(cvSRC);
          }
          if (profilePicSRC) {
            removeApplicantProfilePic(profilePicSRC);
          }
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      };
    
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
            res.render('Applicant/trackStatus', {data: data, id: req.user, isAuth: req.isAuthenticated(), page: "Track Status"}) 
        } catch (error) {
            console.log(error);
        }
    }

//------------------------------------------------------CHECK AUTHENTICATION MIDDLEWARE

    function checkAuthenticated(req, res, next) {       //ROUTE PROTECTION
        if (req.isAuthenticated()) { 
          if (req.user.role === 'job-seeker') {
            return next();
          } else if (req.user.role === 'terminated') {
            req.flash('error', 'Your Account has been terminated');
            return res.redirect('/userLogin');
          } else {
            return res.status(403).send('Only applicant can access this route');
          }
        } else {
          return res.redirect('/userLogin');
        }
      }

      function checkNotAuthenticated(req, res, next) {   // REDIRECT USER TO DASHBOARD IF ALREADY LOGGED IN
        if (req.isAuthenticated()) {
          if (req.user.role === 'job-seeker') {
            return res.redirect('/applicant/jobs');
          } else if (req.user.role === 'terminated') {
            req.flash('error', 'Your Account has been terminated');
            return next();
          } else {
            return res.status(403).send('Only Applicant can access this route');
          }
        }
        next();
      }

//------------------------------------------------------Logout

    const logout = (req, res) => {
        req.logout((err)=>{
                if(err){
                    return next(err)
                }
                res.clearCookie('sessionCookie');
            res.redirect('/home')
        });
        
    }

module.exports={
    loginApplicantForm,
    registerForm,
    registerApplicant,
    checkAuthenticated,
    checkNotAuthenticated,
    logout,
    getProfileForm,
    updateApplicantProfile,
    applyApplicant,
    getTrackStatus
}