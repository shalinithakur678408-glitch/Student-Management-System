const Student = require("../model/student");

exports.getAllStudents = async (req, res)=> {
    try{
        const allStudents = await Student.find();
        if(!allStudents || allStudents.length == 0){
            return res.status(404).json({message:"Student not found"})
        }
        res.status(200).json({message: "All Students" , allStudents});
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
}

exports.getStudentById = async (req, res)=> {
    try{
        const{student_id}=req.params;
        const student = await Student.findById(student_id);
        if(!student){
            return res.status(404).json({message:"Student not found"})
        }
        res.status(200).json({message:"Student By Id" , student});
    }catch(error){
        
        res.status(500).json({message:"Server error"})
    }
    
}

exports.createStudent =async (req, res)=> {
    try{
        const {name,email,password,phone,dob,gender,role,address,enrollmentNo,department,semester,admissionDate,status}=req.body;
        const existingStudent = await Student.findOne({email});
        if(existingStudent){
            return res.status(400).json({message:"Student already exists"})
        }
        const newStudent = new Student({name,email,password,phone,dob,gender,role,address,enrollmentNo,department,semester,admissionDate,status})
        await newStudent.save();
        res.status(201).json({message:"Student Created" , newStudent});
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
}

exports.updateStudent =async (req, res)=> {
    try{
        const {student_id}=req.params;
        const {name,email,password,phone,dob,gender,role,address,enrollmentNo,department,semester,admissionDate,status}=req.body;
        const updatedStudent = await Student.findByIdAndUpdate(student_id,{name,email,password,phone,dob,gender,role,address,enrollmentNo,department,semester,admissionDate,status}, {new:true});
        if(!updatedStudent){
            return res.status(404).json({message:"Student not found"})
        }
        res.status(200).json({message:"Update Student", updatedStudent});
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
}
exports.deleteStudent = async (req, res)=> {
    try{
        const {student_id}=req.params;
        const deleteStudent = await Student.findByIdAndDelete(student_id);
        if(!deleteStudent){
            return res.status(404).json({message:"Student not found"})
        }
        res.status(200).json({message:"Delete Student", deleteStudent});
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
}
    
