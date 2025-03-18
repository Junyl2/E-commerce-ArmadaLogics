// Attach event listeners
document
  .querySelector('#signupModal form')
  .addEventListener('submit', handleSignUp);
document
  .querySelector('#loginModal form')
  .addEventListener('submit', handleLogin);
document
  .querySelector('#orderNow form')
  .addEventListener('submit', handleSignUp);

document.querySelector('#sign-in form').addEventListener('submit', handleLogin);

// Function to handle logout
function handleLogout() {
  let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    location.reload();
  } else {
    alert('no account logged in');
  }
}

// Attach event listener to log out button
document.getElementById('logoutBtn').addEventListener('click', handleLogout);

// Function to toggle password visibility
function togglePassword(inputId, iconId) {
  let input = document.getElementById(inputId);
  let icon = document.getElementById(iconId);

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  }
}
// Function to handle sign-up
function handleSignUp(event) {
  event.preventDefault();
  let username = document.getElementById('signupUsername').value;
  let fullName = document.getElementById('signupName').value;
  let email = document.getElementById('signupEmail').value;
  let password = document.getElementById('signupPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let match = document.createElement('p');
  match.textContent = "Password didn't match";
  let signupEmail = document.createElement('p');
  signupEmail.textContent = 'Email is already registered';
  const container = document.getElementById('sign-up-container');
  const emailContainer = document.getElementById('emailContainer');

  if (password !== confirmPassword) {
    container.appendChild(match);
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some((user) => user.email === email)) {
    emailContainer.appendChild(signupEmail);
    return;
  } else {
    signupEmail.style.display = 'none';
  }
  users.push({ username, fullName, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Sign-up successful! You can now log in.');
  document.getElementById('signupModal').querySelector('form').reset();
}

// Function to handle login
function handleLogin(event) {
  event.preventDefault();

  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = users.find((user) => user.email === email);

  if (!user) {
    alert('No account found with this email!');
    return;
  }

  if (user.password !== password) {
    alert('Incorrect password!');
    return;
  }

  alert('Login successful! Welcome, ' + user.username);
  localStorage.setItem('loggedInUser', JSON.stringify(user));
  document.getElementById('loginModal').querySelector('form').reset();
}

// Attach event listeners
/* document
  .querySelector('#signupModal form')
  .addEventListener('submit', handleSignUp);
document
  .querySelector('#loginModal form')
  .addEventListener('submit', handleLogin);
 */
