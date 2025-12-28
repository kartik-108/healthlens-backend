const userForm = document.getElementById("userForm");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// Register User
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = userForm.username.value;
  const email = userForm.email.value;
  const password = userForm.password.value;

  const userData = {
    username,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(userData));

  message.style.color = "green";
  message.textContent = "User registered successfully!";

  userForm.reset();
});

// Login User
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    message.style.color = "red";
    message.textContent = "No user found. Please register first.";
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    message.style.color = "green";
    message.textContent = "Login successful!";
  } else {
    message.style.color = "red";
    message.textContent = "Invalid email or password!";
  }

  loginForm.reset();
});
