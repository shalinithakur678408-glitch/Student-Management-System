const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.get("/students", studentController.getAllStudents);
router.get("student/:id", studentController.getStudentById);
router.post("/student", studentController.createStudent);
router.put("student/:id", studentController.updateStudent);
router.delete("student/:id", studentController.deleteStudent);
module.exports = router;