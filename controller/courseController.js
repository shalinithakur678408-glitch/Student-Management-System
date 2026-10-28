const Course = require("../model/course")

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        if (courses.length == 0) {
            res.status(404).json({ message: "No Courses Found", });

        }
        res.status(200).json({ message: "All Courses", courses });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}


exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course by id" });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }

}
exports.createCourse = async (req, res) => {
    try {
        const { course_name, course_code, description, department, semester } = req.body;
        if (!course_name || !course_code || !description || !department || !semester) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const course = await Course.create({
            course_name, course_code, description, department, semester
        })
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }

        res.status(200).json({ message: "Created Course", course });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }


}
exports.updateCourse = async (req, res) => {
    try {
        const {id}=req.params;
        const{course_name,course_code,description,department,semester}=req.body;
        if(!course_name||!course_code||!description||!department||!semester){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const course = await Course.findByIdAndUpdate(id,req.body,{new:true})
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        
        res.status(200).json({ message: "Update Course" });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }

}
exports.deleteCourse = async (req, res) => {
    try{
        const{course_id}=req.params;
        const course = await Course.findByIdAndDelete(course_id)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        res.status(200).json({message:"Deleted Course",course})

    }catch(error){
        res.status(500).json({message:"Server error"})
    }
    
}

