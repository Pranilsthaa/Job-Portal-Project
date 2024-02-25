const getJobs = (req, res) =>{
    res.render('Applicant/jobs', {isAuth: req.isAuthenticated()})
    // console.log(req.user);
}

module.exports={
    getJobs,
}