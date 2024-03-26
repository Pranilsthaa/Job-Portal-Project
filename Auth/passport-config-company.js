const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initializeCompany(passport, getUserByEmail, getCompanyById) {
  const authenticateUser = async (email, password, done) => {
    
    const company = getUserByEmail(email)
 
    if (company == null) {
      return done(null, false, { message: 'No company with that email' })
    }

    try {
        const hashedPassword = company.company_password.toString();
      if (await bcrypt.compare(password, hashedPassword)) {
        return done(null, company)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use('company', new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((company, done) => done(null, company.company_id))
  passport.deserializeUser((company_id, done) => {
    return done(null, getCompanyById(company_id))
  })
}

module.exports = initializeCompany;