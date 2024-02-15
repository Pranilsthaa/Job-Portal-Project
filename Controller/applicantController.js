
const loginApplicant = (req, res) =>  {
    res.render('Authentication/login' , {isApplicant : true})
}

const registerApplicant = (req, res) =>  {
    res.render('Authentication/register', {isApplicant : true})
}

const getJobs = (req, res) =>{
    res.json(req.paginatedResults)
}

module.exports={
    loginApplicant,
    registerApplicant,
    getJobs,
}