const jobModel = require('../Model/jobModel')
const applicantModel = require('../Model/applicantModel')

const getJobs = async (req, res) =>{
    try{
        let searchQuery = req.query.name || '';

        const data = await jobModel.getJobDetail(searchQuery);
        let userData = await applicantModel.getApplicantDetailByID(req.user.applicant_id);
        res.render('Applicant/jobs', {isAuth: req.isAuthenticated(), data: data, id: req.user, jobPage: true, page:"Dashboard",info: userData[0]})
    }
    catch(error){
        console.log(error);
    }
}

const getJobsDetailByID = async (req, res) =>{
    try{
        let searchQuery = req.query.name || '';
        const scrollPosition = req.query.scrollPos || 0;

        const job_id = req.params.job_id;
        const userData = await applicantModel.getApplicantDetailByID(req.user.applicant_id);
        const des = await jobModel.getJobDetailsByID(job_id);
        const data = await jobModel.getJobDetail(searchQuery);
        const application = await jobModel.hasUserAppliedForJob(req.user.applicant_id, job_id)  //CHECK IF ALREADY APPLIED
        
        res.render('Applicant/jobs', {isAuth: req.isAuthenticated(),
                                     data: data, des: des[0],
                                     applicant: req.user,
                                     isApplied: application,
                                     id: req.user,
                                     jobPage: true,
                                     scrollPos: scrollPosition,
                                     info: userData[0]
                                    })
    }
    catch(error){
        console.log(error);
    }
}

module.exports={
    getJobs,
    getJobsDetailByID
}