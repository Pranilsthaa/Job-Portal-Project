const loginCompany = (req, res) =>  {
    res.render('Authentication/login', {isApplicant : false})
}

const registerCompany = (req, res) =>  {
    res.render('Authentication/register', {isApplicant : false})
}

const companyDashboard = (req, res) =>  {
    res.render('Company/companyDashboard')
}

const getPostJobForm = (req, res) =>  {
    res.render('Company/postJobs')
}



module.exports={
    loginCompany,
    registerCompany,
    companyDashboard,
    getPostJobForm
}