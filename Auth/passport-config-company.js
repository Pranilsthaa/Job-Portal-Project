const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
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

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((company, done) => done(null, company.company_id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize;