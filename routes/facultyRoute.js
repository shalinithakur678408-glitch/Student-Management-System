const express = require('express');
const router = express.Router();
const factultyController = require('../controller/facultyController');

router.get("/faculty", factultyController.getAllFaculty);
router.get("faculty/:id", factultyController.getFacultyById);
router.post("/faculty", factultyController.createFaculty);
router.put("faculty/:id", factultyController.updateFaculty);
router.delete("faculty/:id", factultyController.deleteFaculty);
module.exports = router;