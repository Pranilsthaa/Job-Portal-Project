const applicantModel = require('../Model/applicantModel')
const initialize = require('../Auth/passport-config');
const passport = require('passport')
const bcrypt = require('bcrypt')

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


    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/userLogin')
    }

        function checkNotAuthenticated(req, res, next) {
          
            if (req.isAuthenticated()) {
                return res.render('/jobs')
            }
            next()
        }


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
    logout
}