const express = require('express');
const expressHbs = require("express-handlebars");
const port = 8000;
var app = express();

app.use(express.static('./public'));

const hbs = expressHbs.create({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutDir: "views/layouts/",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")

//-------------ROUTES

const {authRoute} = require('./Routes/authRoute')
const {jobsRoute} = require('./Routes/jobsRoute')

app.use('/', authRoute)
app.use('/', jobsRoute)




app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
