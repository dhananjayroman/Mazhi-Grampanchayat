
const mongoose = require('mongoose')

const url='mongodb://localhost:27017/Majhigrampanchayat'

mongoose.connect(url).then(()=>{
    console.log("  Birth Record Db connected")
}).catch((err)=>
{
    console.log(" Birth Record Db connection failed ")
})
const birthrecord = new mongoose.Schema({
    name: { type: String },
    date: { type: Date },
    location: { type: String },
    gender: { type: String },
    wardno: { type: Number },
    parentname: { type: String }
});

const birthrecords= new mongoose.model('birthrecords', birthrecord)

module.exports=birthrecords
