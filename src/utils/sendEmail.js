const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (appointment) => {
  try {
    // ✅ Check API key
    if (!process.env.RESEND_API_KEY) {
      console.log("⚠️ RESEND API key missing");
      return;
    }

    // 🔗 Links
    const approveLink = `${process.env.BASE_URL}/api/appointments/approve/${appointment._id}`;
    const declineLink = `${process.env.BASE_URL}/api/appointments/decline/${appointment._id}`;
    const rescheduleLink = `${process.env.BASE_URL}/api/appointments/reschedule/${appointment._id}`;

    // 📧 Send Email via Resend
    await resend.emails.send({
      from: "HealthLens <onboarding@resend.dev>",
      to: appointment.hospitalEmail, // 👉 yaha tera hospital gmail aayega
      subject: "New Appointment Request | HealthLens",

      html: `
        <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
          
          <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:25px;">
            
            <h2 style="text-align:center; color:#2c3e50;">
              🏥 New Appointment Request
            </h2>

            <p style="color:#555;">
              You have received a new appointment via <strong>HealthLens</strong>.
            </p>

            <hr/>

            <p><strong>👤 Patient Name:</strong> ${appointment.name}</p>
            <p><strong>📅 Appointment Date:</strong> ${new Date(appointment.date).toDateString()}</p>
            <p><strong>📧 Patient Email:</strong> ${appointment.email}</p>

            <hr/>

            <div style="text-align:center;">
              
              <a href="${approveLink}" 
                 style="padding:10px 20px; background:#28a745; color:white; text-decoration:none; margin:5px; border-radius:5px;">
                 ✅ Approve
              </a>

              <a href="${declineLink}" 
                 style="padding:10px 20px; background:#dc3545; color:white; text-decoration:none; margin:5px; border-radius:5px;">
                 ❌ Decline
              </a>

              <a href="${rescheduleLink}" 
                 style="padding:10px 20px; background:#007bff; color:white; text-decoration:none; margin:5px; border-radius:5px;">
                 🔄 Reschedule
              </a>

            </div>

            <hr/>

            <p style="font-size:12px; color:#888; text-align:center;">
              This is an automated email from HealthLens
            </p>

          </div>
        </div>
      `
    });

    console.log("✅ Email sent via Resend");

  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
};

module.exports = sendEmail;