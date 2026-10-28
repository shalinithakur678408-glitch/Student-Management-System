const Faculty = require("../model/faculty")
exports.getAllFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        if (faculties.length == 0) {
            return res.status(404).json({ message: "Faculty not found" })
        }
        res.status(200).json({ message: "All Faculty", faculties })

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }

}

exports.getFacultyById = async (req, res) => {
    try {
        const { faculty_id } = req.params;
        const faculty = await Faculty.findById(faculty_id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" })
        }
        res.status(200).json({ message: "Faculty By Id", faculty })

    } catch (error) {
        res.status(500).json({ message: "Server error" })

    }
}

exports.createFaculty = async (req, res) => {
    try {
        const { name, email, password, specialization, department, experience } = req.body;
        const existingFaculty = await Faculty.findOne({ email });
        if (existingFaculty) {
            return res.status(400).json({ message: "Faculty already exists" })
        }
        const newFaculty = new Faculty({
            name, email, password, specialization, department, experience
        })
        await newFaculty.save();
        res.status(201).json({ message: " Faculty Created", newFaculty })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.updateFaculty = async (req, res) => {
    try {
        const { faculty_id } = req.params;
        const { name, email, password, specialization, department, experience } = req.body;
        const updatedFaculty = await Faculty.findByIdAndUpdate(faculty_id, { name, email, password, specialization, department, experience }, { new: true });
        if (!updatedFaculty) {
            return res.status(404).json({ message: "Faculty not found" })
        }
        res.status(200).json({ message: " Faculty Updated", updatedFaculty })

    } catch (error) {

        res.status(500).json({ message: "Server error" })

    }

}

exports.deleteFaculty = async (req, res) => {
    try {
        const { faculty_id } = req.params;
        const deleteFaculty = await Faculty.findByIdAndDelete(faculty_id);
        if (!deleteFaculty) {
            return res.status(404).json({ message: "Faculty not found" })
        }
        res.status(200).json({ message: "Faculty Deleted", deleteFaculty })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}