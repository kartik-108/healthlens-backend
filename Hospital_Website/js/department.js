const form = document.getElementById('departmentForm');
const departmentList = document.getElementById('departmentList');

const API_URL = 'http://localhost:5000/api/departments';

// Add department
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
    alert(`Department added: ${result.name}`);
    form.reset();
    loadDepartments();
  } catch (err) {
    console.error(err);
    alert('Error adding department');
  }
});

// Load all departments
async function loadDepartments() {
  try {
    const res = await fetch(API_URL);
    const departments = await res.json();
    departmentList.innerHTML = '';
    departments.forEach(d => {
      const li = document.createElement('li');
      li.textContent = `${d.name} | ${d.description}`;
      departmentList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

// Initial load
loadDepartments();
