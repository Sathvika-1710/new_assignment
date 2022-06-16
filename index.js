
require('./Data/db')
const express=require('express')
const app=express()
const Handlebars = require('handlebars')
const exhbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser=require('body-parser');



app.listen(3000,()=>{
    console.log("app successfully listenening on port 3000")

})

app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(bodyparser.json())

app.set('view engine','handlebars')
app.engine('handlebars',exhbs.engine({
    handlebars:allowInsecurePrototypeAccess(Handlebars)
}));


app.use('/',require('./controllers/route'))