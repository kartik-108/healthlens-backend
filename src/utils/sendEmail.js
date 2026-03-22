const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (appointment) => {
  try {
    const approveLink = `${process.env.BASE_URL}/api/appointments/approve/${appointment._id}`;
    const declineLink = `${process.env.BASE_URL}/api/appointments/decline/${appointment._id}`;
    const rescheduleLink = `${process.env.BASE_URL}/api/appointments/reschedule/${appointment._id}`;

    await transporter.sendMail({
      to: appointment.hospitalEmail,
      subject: "New Appointment Request",
      html: `
        <h2>New Appointment Request</h2>
        <p><b>Name:</b> ${appointment.name}</p>
        <p><b>Date:</b> ${appointment.date}</p>

        <br/>

        <a href="${approveLink}" style="color:green;">✅ Approve</a><br/><br/>
        <a href="${declineLink}" style="color:red;">❌ Decline</a><br/><br/>
        <a href="${rescheduleLink}" style="color:blue;">🔄 Reschedule</a>
      `
    });

    console.log("📧 Email sent successfully");

  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
};

module.exports = sendEmail;