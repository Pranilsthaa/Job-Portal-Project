const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;



function initialize(passport, getUserByUsername, getUserById){

    const authenticateUser = async (username, password, done) => {
    
        const admin = getUserByUsername(username)
     
        if (admin == null) {
          return done(null, false, { message: 'No user with that email' })
        }
    
        try {
       
          if (password == admin.password) {
            return done(null, admin, {message: 'Logged in  Successfully'})
          } else {
            return done(null, false, { message: 'Password incorrect' })
          }
        } catch (e) {
          return done(e)
        }
      }

      passport.use('admin', new LocalStrategy({
        usernameField: 'username', 
      }, authenticateUser ));
    
      passport.serializeUser((admin, done) => done(null, admin.id));

      passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
})
}


module.exports = initialize;