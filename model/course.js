const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const courseSchema = new Schema({
    courseName: {type: String, required: true , trim:true },
    courseCode: {type: String, required: true , trim:true , uppercase: true, unique:true},
    description: { type: String, required: true, trim:true },
    department:{type: String, required: true, trim:true },
    semester:{type: Number,required: true,min:1,max:16}
});
const Course = model("Course",courseSchema);
module.exports= Course;