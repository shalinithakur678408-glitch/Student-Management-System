const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const facultySchema = new Schema({
    name: {type: String, required: true , trim:true },
    phoneNo: {type: Number, required: true},
    email: {type: String, required: true , trim:true , unique: true , lowercase: true },
    employeeId: {type: String, required: true, trim:true , uppercase: true, unique:true},
    department: { type: String, required: true, trim:true },
    specialization: {type: String, required: true, trim:true },
    experience: {type: Number, required: true},
   
});
const Faculty = model("Faculty",facultySchema);
module.exports =Faculty