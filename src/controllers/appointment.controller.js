const Appointment = require("../models/appointment.model");
const sendEmail = require("../utils/sendEmail");

// 📌 BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const { name, email, hospitalEmail, date } = req.body;

    const appointment = await Appointment.create({
      name,
      email,
      hospitalEmail,
      date
    });

    // 📧 Send email to hospital
    await sendEmail(appointment);

    res.status(200).json({
      message: "Appointment booked & email sent",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: "Error booking appointment",
      error: error.message
    });
  }
};


// 📌 GET ALL APPOINTMENTS
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.status(200).json(appointments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 📌 APPROVE
const approveAppointment = async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });

  res.send("✅ Appointment Approved");
};


// 📌 DECLINE
const declineAppointment = async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, {
    status: "declined"
  });

  res.send("❌ Appointment Declined");
};


// 📌 RESCHEDULE
const rescheduleAppointment = async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, {
    status: "rescheduled"
  });

  res.send("🔄 Appointment Rescheduled");
};


module.exports = {
  bookAppointment,
  getAppointments,
  approveAppointment,
  declineAppointment,
  rescheduleAppointment
};