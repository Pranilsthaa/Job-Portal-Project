const jobModel = require('../Model/jobModel')

const getJobs = async (req, res) =>{
    try{
        const data = await jobModel.getJobDetail();
        res.render('Applicant/jobs', {isAuth: req.isAuthenticated(), data: data, id: req.user})
    }
    catch(error){
        console.log(error);
    }
}

const getJobsDetailByID = async (req, res) =>{
    try{
        const job_id = req.params.job_id;
        const des = await jobModel.getJobDetailsByID(job_id);
        const data = await jobModel.getJobDetail();
        const application = await jobModel.hasUserAppliedForJob(req.user.applicant_id, job_id)  //CHECK IF ALREADY APPLIED
        
        res.render('Applicant/jobs', {isAuth: req.isAuthenticated(), data: data, des: des[0], applicant: req.user, isApplied: application, id: req.user})
    }
    catch(error){
        console.log(error);
    }
}

module.exports={
    getJobs,
    getJobsDetailByID
}