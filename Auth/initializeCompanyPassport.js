const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {companyModel} = require('../Model/companyModel'); // Assuming you have a separate model for companies

const initializeCompanyPassport = () => {
  const authenticateUser = async (email, password, done) => {
    try {
      const companyData = await companyModel.getCompanyDetail();
      // Checking if companyData is an array
      if (!Array.isArray(companyData)) {
        return done(null, false, { message: 'Company data is not available' });
      }
      const company = companyData.find(company => company.company_email === email);
      if (!company) {
        return done(null, false, { message: 'No company with that email' });
      }
      const hashedPassword = company.company_password.toString();
      if (await bcrypt.compare(password, hashedPassword)) {
        return done(null, company);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use('company', new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((company, done) => done(null, company.company_id));
  passport.deserializeUser(async (company_id, done) => {
    try {
      const companyData = await companyModel.getCompanyDetail();
      // Checking if companyData is an array
      if (!Array.isArray(companyData)) {
        return done(null, false, { message: 'Company data is not available' });
      }

      const company = companyData.find(company => company.company_id === company_id);
      done(null, company);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializeCompanyPassport;