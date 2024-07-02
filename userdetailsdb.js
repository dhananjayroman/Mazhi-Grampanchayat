const mongoose = require('mongoose')
const url='mongodb://localhost:27017/Majhigrampanchayat'

mongoose.connect(url).then(()=>{
    console.log("user deatails  Db connected")
}).catch((err)=>
{
    console.log(" user deatails Db connection failed ")
})

const userdetailschema = new mongoose.Schema({

    fullname:{ type:String},
    mobilenumber:{type:String},
    dob:{type:Date},
    age:{type:Number},
    gender:{type:String},
    wardnumber:{type:Number},
    totalfamilymember:{type:Number},
    votersinfamily:{type:Number},
    education:{type:String},
    aadharnumber:{type:String},
    loginname:{type:String},
    password:{type:String}

})

const userdb= new mongoose.model('userdetails', userdetailschema)

module.exports=userdb