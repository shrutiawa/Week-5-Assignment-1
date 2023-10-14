const express=require("express");
const fs=require("node:fs");
const config = require("./config.json");
const app=express();
//configuration
app.use(express.urlencoded({extended:true}))
//routes
var company = "Avengers"
var avengers=[]
var readAvengers=fs.readFileSync('avengers.json',"utf-8")
if(readAvengers){
    avengers=JSON.parse(readAvengers)
}else{
    console.log("error")
}
app.get("/" ,(req,res)=>{
    // res.send("welcome to ur life")
    res.render("home.pug",{ company , avengers})
})
//middlewares
app.post("/",(req,res)=>{
    const { valtechtitle, valtechfirst, valtechlast, valtechpower, valtechcity } = req.body;
    const newAvenger = {
   
        title: valtechtitle,
        firstname: valtechfirst,
        lastname: valtechlast,
        power: valtechpower,
        city: valtechcity
    };
    avengers.push(newAvenger);
    fs.writeFileSync('avengers.json', JSON.stringify(avengers,),"utf-8");
    console.log(avengers);
    
    res.redirect("/");
})
//server configuration
app.listen(config.port,config.localhost,error => 
    error ? console.log("Error ", error) 
    : console.log(`server is now live on ${config.host} and ${config.port}`))