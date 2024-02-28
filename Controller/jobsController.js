const jobModel = require('../Model/jobModel')

const getJobs = async (req, res) =>{
    try{
        const data = await jobModel.getJobDetail();
        res.render('Applicant/jobs', {isAuth: req.isAuthenticated(), data: data})
    }
    catch(error){
        console.log(error);
    }
    // console.log(req.user);
}

const getJobsDetailByID = async (req, res) =>{
    try{
        const job_id = req.params.job_id;
        const des = await jobModel.getJobDetailsByID(job_id);
        const data = await jobModel.getJobDetail();
        res.render('Applicant/jobs', {isAuth: req.isAuthenticated(), data: data, des: des[0]})
    }
    catch(error){
        console.log(error);
    }
    // console.log(req.user);
}

module.exports={
    getJobs,
    getJobsDetailByID
}