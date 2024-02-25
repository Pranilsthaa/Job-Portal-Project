if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express');
const expressHbs = require("express-handlebars");
const port = 8000;
var app = express();
const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport')

const methodOverride = require('method-override')


app.use(methodOverride('_method'))
app.use('/static', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

const hbs = expressHbs.create({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutDir: "views/layouts/",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")

app.use(flash());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())  // INITIALIZING PASSPORTjs
app.use(passport.session())



//-------------ROUTES

const {authRoute} = require('./Routes/authRoute')
const {jobsRoute} = require('./Routes/jobsRoute')
const {companyRoute} = require('./Routes/companyRoute')

app.use('/', authRoute)
app.use('/', jobsRoute)
app.use('/', companyRoute)


app.listen(port, ()=>{
    console.log(`http://localhost:${port}/userLogin`)
})

