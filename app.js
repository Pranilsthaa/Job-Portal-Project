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

app.use('/static', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

const hbs = expressHbs.create({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutDir: "views/layouts/",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")

// let users = [
//     {
//         id: 1,
//         email:'pranil@gmail.com',
//         password: '$2b$10$nAc.EUA/Fr2q1H5HT7G7oOcnc47cdLUoWWYXLazt9DVRmHkANjn5.'
//     }
// ]

// const initialize = require('./Auth/passport-config');
// initialize(passport, 
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
// );


app.use(flash());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// const bcrypt = require('bcrypt')
// async function hello(){
// console.log(await bcrypt.hash('123', 10)) 
// }
// hello()

//-------------ROUTES

const {authRoute} = require('./Routes/authRoute')
const {jobsRoute} = require('./Routes/jobsRoute')

app.use('/', authRoute)
app.use('/', jobsRoute)


app.listen(port, ()=>{
    console.log(`http://localhost:${port}/userLogin`)
})
