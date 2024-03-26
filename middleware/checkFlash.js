const clearLoginSuccessFlash = (req, res, next) => {
    req.flash('loginSuccess', null); // Clear the flash message
    next();
  };

module.exports= clearLoginSuccessFlash;