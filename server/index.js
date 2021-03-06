const express = require("express");
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");
const User = require("./models/user.models");

const app = express();
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

mongoose.connect("mongodb+srv://doadmin:f390hP5462n1UYRT@db-mongodb-nyc3-01963-3596a1b4.mongo.ondigitalocean.com/admin");

app.get("/",(req,res)=>{
    res.send("home page");
})
//
app.post("/api/register", async (req,res)=>{
    console.log(req.body)
    try{
        await User.create({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        res.json({status:"ok"})
    }catch(err){
        res.json({status:"not okay"})
        console.log(err)
    }
})
app.post("/api/login", async (req,res)=>{
    console.log(req.body)
    const user = await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    console.log(user)
    if(user){
        const token = jwt.sign({
            username:user.username,
            email:user.email
        }, "secret123");
        return res.json({status:"ok",user:token});
    }else{
        return res.json({status:"fail",user:false});
    }
})
app.get("/api/bio", async (req,res)=>{
    const token = req.headers["x-access-token"];
    console.log(req.body)
    try{
        const decoded = jwt.verify(token, "secret123");
        const email = decoded.email;
        const user = await User.findOne({email: email});
        return res.json({status:"ok",user})
    }catch(error){
        console.log(error);
        res.json({status:"error",error:"invalid token"});
    }
})
app.post("/api/bio", async (req,res)=>{
    console.log(req.body)
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret123");
        const email = decoded.email;
        const update = await User.updateOne({email: email},{$set:{bio:req.body.bio}});
        const user = await User.findOne({email: email});
        return res.json({status:"ok",user:user});
    }catch(error){
        console.log(error);
        res.json({status:"error",error:"invalid token"});
    }
})
app.get("*",(req,res)=>{
	res.sendFile(path.join(__dirname, 'static/index.html'))
})
app.listen(1337,()=>{
    console.log("listening on port 1337");
})

