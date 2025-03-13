/* log in/ sign up/ log out */
function togglePassword(inputId, iconId) {
  let passwordField = document.getElementById(inputId);
  let icon = document.getElementById(iconId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    passwordField.type = "password";
    icon.classList.replace("bi-eye-slash", "bi-eye");
  }
}

// Function to handle logout
function handleLogout() {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    location.reload();
  } else {
    alert("no account logged in");
  }
}

// Attach event listener to log out button
document.getElementById("logoutBtn").addEventListener("click", handleLogout);

/* authentication */
// Function to toggle password visibility
function togglePassword(inputId, iconId) {
  let input = document.getElementById(inputId);
  let icon = document.getElementById(iconId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("bi-eye");
    icon.classList.add("bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("bi-eye-slash");
    icon.classList.add("bi-eye");
  }
}

// Function to handle sign-up
function handleSignUp(event) {
  event.preventDefault();

  let username = document.getElementById("signupUsername").value;
  let fullName = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((user) => user.email === email)) {
    alert("Email is already registered!");
    return;
  }
  users.push({ username, fullName, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Sign-up successful! You can now log in.");
  document.getElementById("signupModal").querySelector("form").reset();
}

// Function to handle login
function handleLogin(event) {
  event.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => user.email === email);

  if (!user) {
    alert("No account found with this email!");
    return;
  }

  if (user.password !== password) {
    alert("Incorrect password!");
    return;
  }

  alert("Login successful! Welcome, " + user.username);
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  document.getElementById("loginModal").querySelector("form").reset();
}

// Attach event listeners
document
  .querySelector("#signupModal form")
  .addEventListener("submit", handleSignUp);
document
  .querySelector("#loginModal form")
  .addEventListener("submit", handleLogin);
