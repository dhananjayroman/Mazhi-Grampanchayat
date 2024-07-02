const express = require("express");
const app = express();

//user database import
const userdb = require('./databases/userdetailsdb')
const servicerequest = require('./databases/servicerequestsdb')
const complaints = require("./databases/complaintdb");
const deathrecord = require('./databases/deathrecords')
const birthrecord = require('./databases/birthrecord')
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/', async(req, res) => {
const request=await servicerequest.find({}).count();
const complaint=await complaints.find({}).count();
const users=await userdb.find({}).count()
    
    res.render("index",{request,complaint,users});
})

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render("register");
})

app.get('/login', (req, res) => {
    res.render('login')
})


app.post('/success', async (req, res) => {
    try{
    const fullname = req.body.fullName
    const mobilenumber = req.body.mobilenumber
    const dob = req.body.dob
    const age = req.body.age
    const gender = req.body.gender
    const wardno = req.body.wardno
    const totalfamilymembers = req.body.totalfamilymembers
    const votersinfamily = req.body.votersinfamily
    const education = req.body.education
    const aadharnumber = req.body.aadharnumber
    const loginname = req.body.loginname
    const password = req.body.password

    await userdb.insertMany({ fullname: fullname, mobilenumber: mobilenumber, dob: dob, age: age, gender: gender, wardnumber: wardno, totalfamilymember: totalfamilymembers,votersinfamily:votersinfamily,education:education,aadharnumber:aadharnumber,loginname:loginname,password:password})

    res.render('success')
    }catch{
        res.send(" Failed To Register ")
    }
})

app.post('/profile',async (req,res)=>
{
    try{
    const uname=req.body.loginname
    const pass=req.body.password
    const dbuname=await userdb.findOne({loginname:uname})
    const name=await dbuname.fullname;
    const request=await servicerequest.find({requestername:name})
const complaint=await complaints.find({complaintername:name})

    if(pass===dbuname.password)
    {
    res.render("profile",{dbuname,complaint,request})
    }else{
        
        res.send('<center> <h1> Wrong Password !</h1> <br> <h3> Go back ! And try again </h3></center>')
    }
}catch{
    const html="<center> <h1> User Not Found</h1> <br> <h3> <a> Register First</a></h3></center>"
    res.send(html)
}
})

app.post("/submit_request/:fullname/:mobilenumber",async(req,res)=>
{
    const appliedrequest=req.body.appliedservice;
    const requestdetails=req.body.requestdetails
    const name=req.params.fullname
    const mobilenumber=req.params.mobilenumber
    await servicerequest.insertMany({requestername:name,request:appliedrequest,status:"Send To Gramsevak",details:requestdetails,mobilenumber:mobilenumber})

   
    const dbuname=await userdb.findOne({fullname:name})
    const request=await servicerequest.find({requestername:name})
const complaint=await complaints.find({complaintername:name})
res.render("profile",{dbuname,complaint,request})
  
    

})

app.post("/submit_complaint/:fullname",async(req,res)=>
{
    const submitedcomplaint=req.body.complaint;
    const name=req.params.fullname
   
    const dbuname=await userdb.findOne({fullname:name})
    await complaints.insertMany({complaint:submitedcomplaint,complaintername:name,wardno:dbuname.wardnumber,status:'Send To The Sarpanch And Ward Officer',mobilenumber:dbuname.mobilenumber})

   
    const request=await servicerequest.find({requestername:name})
    const complaint=await complaints.find({complaintername:name})
    res.render("profile",{dbuname,complaint,request})
    
    
})

app.post('/profilesuccess', (req, res) => {

    res.render('profilesuccess')
})



app.get('/delete/:id',async(req,res)=>
{
    await servicerequest.findByIdAndDelete(req.params.id);
    const request= await servicerequest.find({})
    const birthrecords=await birthrecord.find({})
    const deathrecords=await deathrecord.find({})  
    res.render('gramsevakprofile',{request,birthrecords,deathrecords})

})

app.get("/officiallogin",(req,res)=>
{
    res.render('officiallogins')
})

app.post('/officialloginchecking',async(req,res)=>
{
    
    try{
        const uname=req.body.uname
        const pass=req.body.password
    
        
        if(uname==="Gramsevak" && pass==="Gramsevak@123")
        {
            const request= await servicerequest.find({})
    const birthrecords=await birthrecord.find({})
    const deathrecords=await deathrecord.find({})  
    res.render('gramsevakprofile',{request,birthrecords,deathrecords})        
} else if(uname==="Wardofficer1" && pass==="Wardofficer1@123")
{  
const birthrecords=await birthrecord.find({wardno:1})
const deathrecords=await deathrecord.find({wardno:1})  
const Complaints=await complaints.find({wardno:1})
const wardno='1'
res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno})        
} else if(uname==="Wardofficer2" && pass==="Wardofficer2@123")
{  
const birthrecords=await birthrecord.find({wardno:2})
const deathrecords=await deathrecord.find({wardno:2})  
const Complaints=await complaints.find({wardno:2})
const wardno='2'
res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno})        
}else if(uname==="Wardofficer3" && pass==="Wardofficer3@123")
{  
const birthrecords=await birthrecord.find({wardno:3})
const deathrecords=await deathrecord.find({wardno:3})  
const Complaints=await complaints.find({wardno:3})
const wardno='3'
res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno})        
}else if(uname==="Wardofficer4" && pass==="Wardofficer4@123")
{  
const birthrecords=await birthrecord.find({wardno:4})
const deathrecords=await deathrecord.find({wardno:4})  
const Complaints=await complaints.find({wardno:4})
const wardno='4'
res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno})
}else if(uname==="Wardofficer5" && pass==="Wardofficer5@123")
{  
const birthrecords=await birthrecord.find({wardno:5})
const deathrecords=await deathrecord.find({wardno:5})  
const Complaints=await complaints.find({wardno:5})
const wardno='5'
res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno})        
}else if(uname==="Wardofficer6" && pass==="Wardofficer6@123")
{  
const birthrecords=await birthrecord.find({wardno:6})
const deathrecords=await deathrecord.find({wardno:6})  
const Complaints=await complaints.find({wardno:6})
const wardno='6'
res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno})        
}else if(uname==="Sarpanch" && pass==="Sarpanch@123")
{  
    const Complaints=await complaints.find({})
    const birthrecords=await birthrecord.find({})
    const deathrecords=await deathrecord.find({})
    res.render('sarpanchprofile',{Complaints,birthrecords,deathrecords})      
}else if(uname==="Admin" && pass==="Admin@123")
{  
    const users=await userdb.find({})
    res.render('adminprofile',{users})     
}
else{
               res.send('<center> <h1> Wrong Password !</h1> <br> <h3> Go back ! And try again </h3></center>')
        }
    }catch{
        const html="<center> <h1> Invalid User </h3></center>"
        res.send(html)
    }
   
})

app.get("/underprocess/:id", async(req,res)=>
{
    const id=req.params.id;  
    await servicerequest.updateOne({_id:id},{$set:{status:"Under Process"}})

    const request= await servicerequest.find({})
    const birthrecords=await birthrecord.find({})
    const deathrecords=await deathrecord.find({})  
    res.render('gramsevakprofile',{request,birthrecords,deathrecords})
})

app.get("/complete/:id",async(req,res)=>
{
    const id=req.params.id;  
    await servicerequest.updateOne({_id:id},{$set:{status:"Request Completed"}})

    const request= await servicerequest.find({})
    const birthrecords=await birthrecord.find({})
    const deathrecords=await deathrecord.find({})  
    res.render('gramsevakprofile',{request,birthrecords,deathrecords})

})

app.post("/deathrecord",async(req,res)=>
{
    const name=req.body.deadname;
    const date=req.body.deathdate;
    const age=req.body.age;
    const location=req.body.deathlocation;
    const gender=req.body.deathgender;
    const wardno=req.body.deathwardno;
    const reason=req.body.reason;
   
    await deathrecord.insertMany({name:name,date:date,age:age,location:location,gender:gender,wardno:wardno,reason:reason})
   
    const request= await servicerequest.find({})
    const birthrecords=await birthrecord.find({})
    const deathrecords=await deathrecord.find({})  
    res.render('gramsevakprofile',{request,birthrecords,deathrecords})

})

app.post("/birthrecord",async(req,res)=>
{
    const name=req.body.bornname;
    const date=req.body.birthdate;
   
    const location=req.body.birthlocation;
    const gender=req.body.birthgender;
    const wardno=req.body.wardno;
    const parentname=req.body.parentname;
   
    await birthrecord.insertMany({name:name,date:date,location:location,gender:gender,wardno:wardno,parentname:parentname})
   
    const request= await servicerequest.find({})
    const birthrecords=await birthrecord.find({})
    const deathrecords=await deathrecord.find({})  
    res.render('gramsevakprofile',{request,birthrecords,deathrecords})

})

app.get("/wardprofile",async(req,res)=>
{
    res.render('wardprofile')
})

app.get('/completecomplaint/:id/:wardno',async(req,res)=>
{
    await complaints.updateOne({_id:req.params.id},{$set:{status:"Complaint Resolved"}})
    const birthrecords=await birthrecord.find({wardno:req.params.wardno})
    const deathrecords=await deathrecord.find({wardno:req.params.wardno})  
    const Complaints=await complaints.find({wardno:req.params.wardno})
    const wardno=req.params.wardno
    res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno})  
})

app.get('/deletecomplaint/:id/:wardno',async(req,res)=>
{
    await complaints.findByIdAndDelete(req.params.id);
    const birthrecords=await birthrecord.find({wardno:req.params.wardno})
    const deathrecords=await deathrecord.find({wardno:req.params.wardno})  
    const Complaints=await complaints.find({wardno:req.params.wardno})
    const wardno=req.params.wardno
    res.render('wardprofile',{Complaints,birthrecords,deathrecords,wardno}) 

})


app.get("/deleteuser/:id",async(req,res)=>
{
    await userdb.findByIdAndDelete(req.params.id);
    const users= await userdb.find({})
    res.render('adminprofile',{users})
})


app.listen(9000,()=>
{
console.log("Server Started");
})
