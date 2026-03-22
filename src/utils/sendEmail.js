const nodemailer = require("nodemailer");

const sendEmail = async (appointment) => {
  try {
    // ❌ Env check
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("⚠️ Email env variables missing");
      return;
    }

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4 // 🔥 FORCE IPv4 (MAIN FIX)
});

    // 🔗 Links
    const approveLink = `${process.env.BASE_URL}/api/appointments/approve/${appointment._id}`;
    const declineLink = `${process.env.BASE_URL}/api/appointments/decline/${appointment._id}`;
    const rescheduleLink = `${process.env.BASE_URL}/api/appointments/reschedule/${appointment._id}`;

    // 📧 Send Mail
    await transporter.sendMail({
      from: `"HealthLens" <${process.env.EMAIL_USER}>`,
      to: appointment.hospitalEmail,
      subject: "New Appointment Request | HealthLens",

      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:25px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            
            <h2 style="text-align:center; color:#2c3e50;">
              🏥 New Appointment Request
            </h2>

            <p style="color:#555; font-size:14px;">
              You have received a new appointment request via <strong>HealthLens</strong>.
            </p>

            <hr style="margin:20px 0;" />

            <p><strong>👤 Patient Name:</strong> ${appointment.name}</p>
            <p><strong>📅 Appointment Date:</strong> ${new Date(appointment.date).toDateString()}</p>
            <p><strong>📧 Patient Email:</strong> ${appointment.email}</p>

            <hr style="margin:20px 0;" />

            <p style="font-size:14px; color:#555;">
              Please choose an action:
            </p>

            <div style="text-align:center; margin-top:20px;">
              
              <a href="${approveLink}" 
                 style="display:inline-block; padding:10px 20px; margin:5px; background:#28a745; color:#fff; text-decoration:none; border-radius:5px;">
                 ✅ Approve
              </a>

              <a href="${declineLink}" 
                 style="display:inline-block; padding:10px 20px; margin:5px; background:#dc3545; color:#fff; text-decoration:none; border-radius:5px;">
                 ❌ Decline
              </a>

              <a href="${rescheduleLink}" 
                 style="display:inline-block; padding:10px 20px; margin:5px; background:#007bff; color:#fff; text-decoration:none; border-radius:5px;">
                 🔄 Reschedule
              </a>

            </div>

            <hr style="margin:25px 0;" />

            <p style="font-size:12px; color:#888; text-align:center;">
              This is an automated message from HealthLens. Please do not reply.
            </p>

          </div>

        </div>
      `
    });

    console.log("✅ Professional email sent successfully");

  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
};

module.exports = sendEmail;