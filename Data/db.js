const mongoose=require('mongoose')
const path=require('path')
mongoose.connect('mongodb://0.0.0.0:27017/new_intern',{useNewUrlParser:true,useUnifiedTopology:true},(err,db)=>{
    if(!err){
        console.log("connection is successful");
        module.exports=db;
    }
    else{
        console.log(err);
    }
})
require(path.join(__dirname,'schema.js'))