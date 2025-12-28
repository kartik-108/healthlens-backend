const form = document.getElementById('patientForm');
const patientList = document.getElementById('patientList');

const API_URL = 'http://localhost:5000/api/patients';

// Add patient
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    alert(`Patient added: ${result.name}`);
    form.reset();
    loadPatients();
  } catch (err) {
    console.error(err);
    alert('Error adding patient');
  }
});

// Load all patients
async function loadPatients() {
  try {
    const res = await fetch(API_URL);
    const patients = await res.json();
    patientList.innerHTML = '';
    patients.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} | ${p.age} | ${p.gender} | ${p.disease} | ${p.department}`;
      patientList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

// Initial load
loadPatients();
