const loginCompany = (req, res) =>  {
    res.render('Authentication/login', {isApplicant : false})
}

const registerCompany = (req, res) =>  {
    res.render('Authentication/register', {isApplicant : false})
}

module.exports={
    loginCompany,
    registerCompany
}