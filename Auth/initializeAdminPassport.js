const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const initializeAdminPassport = () => {
  const adminUser = JSON.parse(process.env.ADMIN_USER);

  const authenticateUser = async (username, password, done) => {
    try {
      // Checking if adminUser is an array
      if (!Array.isArray(adminUser)) {
        return done(null, false, { message: 'Admin user data is not available' });
      }

      const admin = adminUser.find(admin => admin.username === username);
      if (!admin) {
        return done(null, false, { message: 'No admin user with that username' });
      }

      if (admin.password === password) {
        return done(null, admin);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use('admin', new LocalStrategy({ usernameField: 'username' }, authenticateUser));
  passport.serializeUser((admin, done) => done(null, admin.id));
  passport.deserializeUser((id, done) => {
    const admin = adminUser.find(admin => admin.id === id);
    done(null, admin);
  });
};

module.exports = initializeAdminPassport;