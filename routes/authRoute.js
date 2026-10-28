const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post("/auth/register",authController.registerUser)
router.post("/auth/login", authController.loginUser);
router.get("/auth/me", authController.getCurrentUser);
router.put("/auth/me", authController.updateCurrentUser);


module.exports = router;