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

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

app.get('/login', (req, res)=>{
    res.render('Authentication/login')
})

app.get('/register', (req, res)=>{
    res.render('Authentication/register')
})