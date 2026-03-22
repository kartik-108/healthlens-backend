const Appointment = require("../models/appointment.model");
const sendEmail = require("../utils/sendEmail");

// 📌 BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const { name, email, hospitalEmail, date } = req.body;

    // ✅ Validation
    if (!name || !email || !hospitalEmail || !date) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // ✅ Save to DB
    const appointment = await Appointment.create({
      name,
      email,
      hospitalEmail,
      date
    });

    // ✅ Email (safe - crash nahi karega)
    try {
      sendEmail(appointment);
      console.log("✅ Email sent successfully");
    } catch (err) {
      console.log("❌ Email failed:", err.message);
    }

    // ✅ Success response
    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.error("🔥 BOOK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error booking appointment",
      error: error.message
    });
  }
};


// 📌 GET ALL APPOINTMENTS
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error("🔥 GET ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


// 📌 APPROVE
const approveAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, {
      status: "approved"
    });

    res.send("✅ Appointment Approved");

  } catch (error) {
    res.status(500).send("Error approving appointment");
  }
};


// 📌 DECLINE
const declineAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, {
      status: "declined"
    });

    res.send("❌ Appointment Declined");

  } catch (error) {
    res.status(500).send("Error declining appointment");
  }
};


// 📌 RESCHEDULE
const rescheduleAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, {
      status: "rescheduled"
    });

    res.send("🔄 Appointment Rescheduled");

  } catch (error) {
    res.status(500).send("Error rescheduling appointment");
  }
};


module.exports = {
  bookAppointment,
  getAppointments,
  approveAppointment,
  declineAppointment,
  rescheduleAppointment
};