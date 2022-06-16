const mongoose=require('mongoose')
var sch1=new mongoose.Schema({
    title:{
        type:String,
         
    },
    content:{
        type:String
    },
    heading:{
        type:String
    }

})

mongoose.model('contents',sch1)

var sch2=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})

mongoose.model('logins',sch2)