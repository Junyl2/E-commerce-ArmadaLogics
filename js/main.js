/* test */

//back to top button shows when below header height
document.addEventListener('DOMContentLoaded', function () {
  const backToTop = document.getElementById('back-to-top');
  const header = document.getElementById('heroCarousel'); // Make sure your header has this ID

  function toggleBackToTop() {
    if (!header || !backToTop) return;

    const headerBottom = header.getBoundingClientRect().bottom; // Get header bottom relative to viewport

    if (headerBottom < 0) {
      backToTop.style.opacity = '1'; // Show button when header is out of view
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0'; // Hide button when in header
      backToTop.style.pointerEvents = 'none';
    }
  }

  window.addEventListener('scroll', toggleBackToTop);
});

//for demo only, alert messages for subscribe button
document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('#subscribe form');
  let emailInput = document.getElementById('sub-email');

  if (!form || !emailInput) {
    console.error('Form or email input not found! Check HTML structure.');
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let emailValue = emailInput.value.trim();

    if (emailValue !== '' && emailValue.includes('@')) {
      alert('Thank you so much for subscribing! we appreaciate it <3');
      emailInput.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });
});

//for demo purposes, send messge in contact info.
document.getElementById('send-msg').addEventListener('click', (event) => {
  event.preventDefault();

  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let message = document.getElementById('message').value.trim();

  if (name === '' || email === '' || message === '') {
    alert('Please fill out all required fields before sending the message.');
  } else if (email !== '@') {
    alert('Please enter a valid email address');
  } else {
    alert(
      "Thankyou for reaching out to us! we'll do our best to respond ASAP. We appreciate your patience :)"
    );
    document.querySelector('form').reset();
  }
});
