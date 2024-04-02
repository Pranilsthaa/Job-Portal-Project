if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const expressHbs = require("express-handlebars");
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const helper = require('./Helper/helper');
const initializeApplicantPassport = require('./Auth/initializeApplicantPassport');
const initializeCompanyPassport = require('./Auth/initializeCompanyPassport');
const initializeAdminPassport = require('./Auth/initializeAdminPassport');
const { authRoute } = require('./Routes/authRoute');
const { applicantRoute } = require('./Routes/applicantRoute');
const { companyRoute } = require('./Routes/companyRoute');
const { adminRoute } = require('./Routes/adminRoute');

const port = 8000;
const app = express();

// CONFIGURING MYSQL-SESSION
const options = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'job_portal'
};
const sessionStore = new MySQLStore(options);

// MIDDLEWARE CONFIGURATION
app.use(methodOverride('_method')); // METHOD-OVERRIDE FOR LOGOUT FUNCTIONALITY
app.use('/static', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
const hbs = expressHbs.create({
  extname: ".hbs",
  defaultLayout: "main.hbs",
  layoutDir: "views/layouts/",
  helpers: helper
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(passport.initialize()); // INITIALIZING PASSPORTjs
app.use(passport.session());

// PASSPORT INITIALIZATION
initializeApplicantPassport();
initializeCompanyPassport();
initializeAdminPassport();

// ROUTES
app.use('/', authRoute);
app.use('/applicant', applicantRoute);
app.use('/company', companyRoute);
app.use('/admin', adminRoute);

app.listen(port, () => {
  console.log(`http://localhost:${port}/userLogin`);
});