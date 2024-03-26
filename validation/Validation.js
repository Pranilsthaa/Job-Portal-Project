const {check} = require('express-validator')

validateUserRegister = [                                                            // Express-validator for validation
        check('name').notEmpty().withMessage('Name is Required !!!').isLength({min: 3}).withMessage('Name must be at least 3 characters long !!!'),
        check('phone').notEmpty().withMessage(' Phone is Required !!!').isLength({max: 10}).withMessage('Phone must be 10 characters long !!!'),
        check('email').notEmpty().withMessage('Email is Required !!!').isEmail().withMessage('Invalid Email !!!'),
        check('address').notEmpty().withMessage('Address is Required !!!'),
        check('password').notEmpty().withMessage('Password is Required !!!').isLength({min: 6}).withMessage('Password must be at least 6 characters long !!!'),
    ]


// let validateCategoryForm = [                                                            // Express-validator for validation
//     check('category_name').notEmpty().withMessage('Empty String')
// ]

module.exports = {
    validateUserRegister,
    // validateCategoryForm
}



