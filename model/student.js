const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
    name: {type: String, required: true , trim:true },
    phoneNo: {type: String, required: true},
    email: {type: String, required: true , trim:true , unique: true , lowercase: true },
    dob: {type: Date, required: true},
    address:{ type: String, required: true,trim: true },
    gender:{type: String, required: true , enum:["Male","Female","Other"] },
    enrollmentNo: {type: String, required: true, trim:true , uppercase: true, unique:true},
    department: { type: String, required: true, trim:true },
    semester:{type: Number,required: true,min:1,max:16},
    admissionDate: {type: Date, required: true},
    status: {type: String, required: true,enum:["Active","Inactive","Graduated","Suspended"], default:"Active" },
    role: {type: String, required: true,enum:["Faculty","Student"], default:"Student" },
     
});
const Student= model("Student",studentSchema);
module.exports =Student;