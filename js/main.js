// JavaScript to dynamically change active class on click
/* document.addEventListener("DOMContentLoaded", function () {
  let navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((nav) => nav.classList.remove("active"));

      this.classList.add("active");
    });
  });
});
 */
document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector("#subscribe form");
  let emailInput = document.getElementById("sub-email");

  if (!form || !emailInput) {
    console.error("Form or email input not found! Check HTML structure.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let emailValue = emailInput.value.trim();

    if (emailValue !== "" && emailValue.includes("@")) {
      alert("Thank you so much for subscribing! we appreaciate it <3");
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });
});

//for demo purposes, send messge in contact info.
document.getElementById("send-msg").addEventListener("click", (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill out all required fields before sending the message.");
  } else {
    alert(
      "Thankyou for reaching out to us! we'll do our best to respond ASAP. We appreciate your patience :)"
    );
    document.querySelector("form").reset();
  }
});
