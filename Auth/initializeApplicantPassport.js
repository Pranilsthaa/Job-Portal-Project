const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {applicantModel} = require('../Model/applicantModel'); // Assuming you have a separate model for applicants

const initializeApplicantPassport = () => {
  const authenticateUser = async (email, password, done) => {
    try {
      const applicantData = await applicantModel.getApplicantDetail();
      
      // Checking if applicantData is an array
      if (!Array.isArray(applicantData)) {
        return done(null, false, { message: 'Applicant data is not available' });
      }

      const user = applicantData.find(user => user.applicant_email === email);

      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      const hashedPassword = user.applicant_password.toString();
      if (await bcrypt.compare(password, hashedPassword)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use('applicant', new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.applicant_id));
  passport.deserializeUser(async (applicant_id, done) => {
    try {
      const applicantData = await applicantModel.getApplicantDetail();
      
      // Checking if applicantData is an array
      if (!Array.isArray(applicantData)) {
        return done(null, false, { message: 'Applicant data is not available' });
      }

      const user = applicantData.find(user => user.applicant_id === applicant_id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializeApplicantPassport;
