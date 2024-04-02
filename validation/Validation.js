const {check} = require('express-validator')

validateUserRegister = [                                                            // Express-validator for validation
        check('name').notEmpty().withMessage('Name is Required !!!').isLength({min: 3}).withMessage('Name must be at least 3 characters long !!!'),
        check('phone').notEmpty().withMessage(' Phone is Required !!!').isLength({max: 10}).withMessage('Phone must be 10 characters long !!!'),
        check('email').notEmpty().withMessage('Email is Required !!!').isEmail().withMessage('Invalid Email !!!'),
        check('address').notEmpty().withMessage('Address is Required !!!'),
        check('password').notEmpty().withMessage('Password is Required !!!').isLength({min: 6}).withMessage('Password must be at least 6 characters long !!!'),
    ]

const postJobValidationRules = [
        check('job_title').notEmpty().withMessage('Job title is required'),
        check('location').notEmpty().withMessage('Location is required'),
        check('type').notEmpty().withMessage('Employment type is required'),
        check('industry').notEmpty().withMessage('Industry is required'),
        check('skills').notEmpty().withMessage('Skills required are required'),
        check('salary').isInt().withMessage('Salary must be an integer').notEmpty().withMessage('Salary is required'),
        check('description').notEmpty().withMessage('Job description is required'),
        check('knowledge').notEmpty().withMessage('Knowledge required is required'),
        check('education').notEmpty().withMessage('Education required is required'),
      ];


module.exports = {
    validateUserRegister,
    postJobValidationRules
}



