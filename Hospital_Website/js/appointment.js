const form = document.getElementById('appointmentForm');
const list = document.getElementById('appointmentList');
const API_URL = 'http://localhost:5000/api/appointments';

form.addEventListener('submit', async e => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    alert(`Appointment booked for ${result.patientName}`);
    form.reset();
    loadAppointments();
  } catch(err) {
    console.error(err);
    alert('Error booking appointment');
  }
});

async function loadAppointments() {
  const token = localStorage.getItem('token');
  const res = await fetch(API_URL, { headers: { 'Authorization': token } });
  const appointments = await res.json();
  list.innerHTML = '';
  appointments.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a.patientName} | ${a.department} | ${a.doctorName} | ${a.date} ${a.time}`;
    list.appendChild(li);
  });
}

loadAppointments();
