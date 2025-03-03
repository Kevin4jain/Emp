const mongoose=require('mongoose');
const express=require('express');
const r1router=require('./router/r1');
const cors=require('cors')

const app=express();
app.use(express.json());
app.use(cors());
app.use("/employee",r1router);
app.use("/",(req,res)=>{
    res.send("Welcome to Employee Management System");
})
mongoose.connect("mongodb+srv://shahkevin0433:admin@cluster0.pbxs9.mongodb.net/employeeDB",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log("error in connecting to database");
    console.log(err);
});

app.listen(3000,()=>{
    console.log("server is running at port 3000");
})