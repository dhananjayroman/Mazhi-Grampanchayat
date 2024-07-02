const mongoose = require('mongoose')
const url='mongodb://localhost:27017/Majhigrampanchayat'

mongoose.connect(url).then(()=>{
    console.log("Complaint Db connected")
}).catch((err)=>
{
    console.log(" Complaint Db connection failed ")
})

const comaplaints= new mongoose.Schema({

    complaint:{type:String},
    wardno:{type:Number},
    complaintername:{type:String},
    status:{type:String},
    mobilenumber:{type:String}

})

const complaints= new mongoose.model('complaints',comaplaints )

module.exports=complaints