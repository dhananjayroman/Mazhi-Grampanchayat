const mongoose = require('mongoose')
const url='mongodb://localhost:27017/Majhigrampanchayat'

mongoose.connect(url).then(()=>{
    console.log("Service Request  Db connected")
}).catch((err)=>
{
    console.log(" Service Request Db connection failed ")
})

const servicerequests= new mongoose.Schema({

    requestername:{type:String},
   
  request:{type:String},
  status:{type:String},
  details:{type:String},
  mobilenumber:{type:String}

})

const servicerequest= new mongoose.model('servicerequests',servicerequests )

module.exports=servicerequest