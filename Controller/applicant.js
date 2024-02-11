const loginApplicant = (req, res) =>  {
    res.render('Authentication/login' , {isApplicant : true})
}

const registerApplicant = (req, res) =>  {
    res.render('Authentication/register', {isApplicant : true})
}

const user  = [
    {id:1, name:'user 1'},
    {id:2, name:'user 2'},
    {id:3, name:'user 3'},
    {id:4, name:'user 4'},
    {id:5, name:'user 5'},
    {id:6, name:'user 6'},
    {id:7, name:'user 7'},
    {id:8, name:'user 8'},
    {id:9, name:'user 9'},
    {id:10, name:'user 10'},
    {id:11, name:'user 11'},
    {id:12, name:'user 12'},
    {id:13, name:'user 13'},
    {id:14, name:'user 14'},
    {id:15, name:'user 15'}
]

const getJobs = (req, res) =>{

    let page = req.query.page;
    let limit = req.query.limit;

    const results = {};

    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    results.result = user.slice(startIndex, endIndex)

    res.json(results)
}

module.exports={
    loginApplicant,
    registerApplicant,
    getJobs
}