const userForm = document.getElementById('userForm');
const loginForm = document.getElementById('loginForm');

const API_URL = 'http://localhost:5000/api/users';

// Register user
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(userForm).entries());

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    alert(`User registered: ${result.username}`);
    userForm.reset();
  } catch (err) {
    console.error(err);
    alert('Error registering user');
  }
});

// Login user
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm).entries());

  try {
    const res = await fetch(API_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if(result.success) alert(`Login successful! Welcome ${result.username}`);
    else alert(result.message);
    loginForm.reset();
  } catch (err) {
    console.error(err);
    alert('Error logging in');
  }
});
