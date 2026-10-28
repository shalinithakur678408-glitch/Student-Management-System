const Student = require('../model/student')
const Faculty = require('../model/faculty')
const bcryptPassword = require('../utils/authUtils')
const bcryptCompare = require('../utils/authUtils')
const generateJWT = require('../utils/authUtils')


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNo, department, semester } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name,Email,Password are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be a string and at least 6 characters long" })
        }
        if (!email.includes("@") || !email.includes(".") || !email.trim()) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const existingStudent = await Student.findOne({ email });
        const existingFaculty = await Faculty.findOne({ email });
        if (existingStudent || existingFaculty) {
            return res.status(400).json({ message: " Already exists" })
        }
        const hashedPassword = bcryptPassword(password)
        if (role === "Faculty") {
            const newFaculty = new Faculty({ name, email, password: hashedPassword, phoneNo, department })
            await newFaculty.save();
            res.status(201).json({ message: "Faculty Created", newFaculty });
        }
        const newStudent = new Student({ name, email, password: hashedPassword, phoneNo, department, semester })
        await newStudent.save();
        res.status(201).json({ message: "Student Created", newStudent });

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }

}
exports.loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body || {};
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Name,Email,Password(must be 6 character) ,Role are required" });
        }
        if (!email.includes("@") || !email.includes(".") || !email.trim()) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be a string and at least 6 characters long" })
        }

        let user;
        if (role === 'Faculty') {
            user = await Faculty.findOne({ email })
        } else if (role === 'Student') {
            user = await Student.findOne({ email })
        } else {
            return res.status(400).json({ message: "Invalid Role" })
        }
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const isMatch = await bcryptCompare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateJWT({ id: user._id, role: user.role })

        res.status(200).json({ success: true, message: "logged in successfully", token })

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}


exports.getCurrentUser = async (req, res) => {
    try {
        const user = req.user.role === "faculty" ? await Faculty.findById(req.user.id)
            : await Student.findById(req.user.id)
        if (!user) {
            res.status(404).json({ message: "User Not Found" });

        }
        res.status(200).json({ message: "Current user fetch current user", user: { studentUser, facultyUser } })

    } catch (error) {
        res.status(500).json({ message: "Fail to fetch current user" })
    }
}
exports.updateCurrentUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user;
        if (req.user.role === "Faculty") {
            user = await Faculty.findById(req.user.id);

        }else if (req.user.role === "Student") {
            user = await Student.findById(req.user.id);
        }else{
            return res.status(400).json({ message: "Invalid Role" })
        }
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        user.name = name;
        user.email = email;
        user.password = await bcryptPassword(password);
        await user.save();
        res.status(200).json({message:"Update Current User",user: { id:user._id,role:user.role}})
    } catch (error) {
        res.status(500).json({ message: "Fail to update current user"})
    }
}


