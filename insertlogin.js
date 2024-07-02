const login=require("./databases/officialloginsdb")


NEW_COMMENT = {
    name:'xyz',
    loginid:'abc',
    password:'mnp'
  }
login.insertMany({gramsevak:{ name:'abc',loginid:'abc',password:'p'}})

const a=login.find({"gramsevak.name":'xyz'})

if(a.loginid==='abc')
{
    console.log('hi')
}
  
