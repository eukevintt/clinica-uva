const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createAppointment, listAppointments } = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", authMiddleware, createAppointment);
router.get("/", authMiddleware, listAppointments);

module.exports = router;