const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAppointments,
  approveAppointment,
  declineAppointment,
  rescheduleAppointment
} = require("../controllers/appointment.controller");

// 📌 Routes
router.post("/book", bookAppointment);
router.get("/", getAppointments);

router.get("/approve/:id", approveAppointment);
router.get("/decline/:id", declineAppointment);
router.get("/reschedule/:id", rescheduleAppointment);

module.exports = router;