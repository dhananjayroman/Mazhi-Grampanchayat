const mongoose = require('mongoose')
const url='mongodb://localhost:27017/Majhigrampanchayat'

mongoose.connect(url).then(()=>{
    console.log("  Death Record Db connected")
}).catch((err)=>
{
    console.log(" Death Record Db connection failed ")
})

const deathrecord= new mongoose.Schema({

    name:{type:String},
    date:{type:Date},
    age:{type:Number},
    location:{type:String},
    gender:{type:String},
    wardno:{type:Number},
    reason:{type:String}

})

const deathrecords= new mongoose.model('deathrecords', deathrecord)

module.exports=deathrecords