// Function to show only one section with smooth animation
function showOnly(containerId) {
  let containers = document.querySelectorAll(".menu-container");

  // Hide all sections with animation
  containers.forEach((container) => {
    container.classList.add("fade-out");
    setTimeout(() => {
      container.classList.add("hidden");
      container.classList.remove("fade-out");
    }, 300); // Match transition duration
  });

  // Show selected section with animation after hiding the others
  setTimeout(() => {
    let activeContainer = document.getElementById(containerId);
    activeContainer.classList.remove("hidden");
    activeContainer.classList.add("fade-in");
    setTimeout(() => {
      activeContainer.classList.remove("fade-in");
    }, 300);
  }, 300);
}

// Event listeners for each button
document.getElementById("buttonDrinks").addEventListener("click", function () {
  showOnly("drinks-container");
});

document.getElementById("buttonLunch").addEventListener("click", function () {
  showOnly("lunch-container");
});

document.getElementById("buttonDinner").addEventListener("click", function () {
  showOnly("dinner-container");
});

document.getElementById("buttonAll").addEventListener("click", function () {
  // Show all sections again with animation
  document.querySelectorAll(".menu-container").forEach((container) => {
    container.classList.remove("hidden");
    container.classList.add("fade-in");
    setTimeout(() => {
      container.classList.remove("fade-in");
    }, 300);
  });
});

// Active button indicator
document.querySelectorAll(".button-group button").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelector(".button-group .active")?.classList.remove("active");
    this.classList.add("active");
  });
});
