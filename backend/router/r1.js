const EmpData=require('../model/emp_data');
const express=require('express');
const router=express.Router();

router.get("/data",async(req,res)=>{
    try{const emp=await EmpData.find();
    const emps=emp.map(x=>x.toObject())
    res.send(emps);}
    catch(e){res.send(e.message)}
    
})
router.post("/add",(req,res)=>{
    const data=new EmpData(req.body);
    data.save().then(()=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    })
})
router.get('/data/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const emp=await EmpData.findById(id);
        if(!emp){
            return res.status(404).send();
        }
        res.send(emp);
    }catch(err){
        res.send(err);
    }
})
router.put('/edit/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        const emp=await EmpData.findByIdAndUpdate(id,req.body,{new:true});
        if(!emp){
            return res.status(404).send();
        }
        res.send(emp.toObject());
    }catch(err){
        res.send(err);
    }
})
router.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const emp=await EmpData.findByIdAndDelete(id);
        if(!emp){
            return res.status(404).send();
        }
        res.send(emp.toObject());
    }catch(err){
        res.send(err);
    }
})

module.exports=router;