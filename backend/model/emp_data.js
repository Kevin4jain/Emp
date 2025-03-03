const mongoose = require('mongoose');
const validator = require('validator');

const empSchema = new mongoose.Schema({
    emp_name:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    emp_id:{
        type:Number,
        required:true,
        unique:true
    },
    emp_email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    emp_phone:{
        type:Number,
        required:true,
        unique:true,
        min:10
    },
    emp_address:{
        type:String,
    },
    emp_dept:{
        type:String,
        required:true
    },
    emp_salary:{
        type:Number
    }
})
const employee=mongoose.model('EmpData',empSchema);
module.exports=employee;