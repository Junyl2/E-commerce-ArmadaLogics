document.addEventListener("DOMContentLoaded", function () {
  let selectedProduct = {};

  // Select all "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      // Get product details from data attributes
      selectedProduct = {
        name: this.getAttribute("data-name"),
        price: parseFloat(this.getAttribute("data-price")),
        image: this.getAttribute("data-image"),
        description: this.getAttribute("data-description"),
        quantity: 1,
      };

      // Populate modal dynamically
      document.getElementById("cart-item-name").textContent =
        selectedProduct.name;
      document.getElementById(
        "cart-item-price"
      ).textContent = `₱${selectedProduct.price.toFixed(2)}`;
      document.getElementById("cart-item-image").src = selectedProduct.image;
      document.getElementById("cart-item-description").textContent =
        selectedProduct.description;
      document.getElementById("cart-quantity").value = selectedProduct.quantity;
      updateTotalPrice();

      // Show the modal
      let cartModal = new bootstrap.Modal(
        document.getElementById("addToCartModal")
      );
      cartModal.show();
    });
  });

  // Quantity increase button
  document.getElementById("increase").addEventListener("click", function () {
    selectedProduct.quantity++;
    document.getElementById("cart-quantity").value = selectedProduct.quantity;
    updateTotalPrice();
  });

  // Quantity decrease button
  document.getElementById("decrease").addEventListener("click", function () {
    if (selectedProduct.quantity > 1) {
      selectedProduct.quantity--;
      document.getElementById("cart-quantity").value = selectedProduct.quantity;
      updateTotalPrice();
    }
  });

  // Update total price
  function updateTotalPrice() {
    let totalPrice = selectedProduct.quantity * selectedProduct.price;
    document.getElementById(
      "cart-total-price"
    ).textContent = `₱${totalPrice.toFixed(2)}`;
  }

  // Open confirmation modal
  document
    .getElementById("openConfirmModal")
    .addEventListener("click", function () {
      document.getElementById("confirm-item-name").textContent =
        selectedProduct.name;
      bootstrap.Modal.getInstance(
        document.getElementById("addToCartModal")
      ).hide();
      let confirmModal = new bootstrap.Modal(
        document.getElementById("confirmModal")
      );
      confirmModal.show();
    });

  // Confirm Add to Cart
  document
    .getElementById("confirmAddToCart")
    .addEventListener("click", function () {
      bootstrap.Modal.getInstance(
        document.getElementById("confirmModal")
      ).hide();
      let successAlert = document.getElementById("successAlert");
      successAlert.classList.remove("d-none");

      // Hide success alert after 2 seconds
      setTimeout(() => {
        successAlert.classList.add("d-none");
      }, 2000);
    });
});

//View store cart
document.addEventListener("DOMContentLoaded", function () {
  let cart = [];

  // Select all "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      let product = {
        name: this.getAttribute("data-name"),
        price: parseFloat(this.getAttribute("data-price")),
        image: this.getAttribute("data-image"),
        description: this.getAttribute("data-description"),
        quantity: 1,
      };

      addToCart(product);
    });
  });

  function addToCart(product) {
    let existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }
    updateCart();
  }
  //function to update cart and price
  function updateCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
      let itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      cartItemsContainer.innerHTML += `
                <tr>
                    <td><img src="${item.image}" class="cart-img"></td>
                    <td>${item.name}</td>
                    <td>&#x20B1;${item.price.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary decrease" data-index="${index}">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary increase" data-index="${index}">+</button>
                    </td>
                    <td>&#x20B1;${itemTotal.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm remove" data-index="${index}">Remove</button></td>
                </tr>
            `;
    });

    document.getElementById("cart-total").textContent = `₱${totalPrice.toFixed(
      2
    )}`;
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("increase")) {
      let index = event.target.getAttribute("data-index");
      cart[index].quantity++;
      updateCart();
    }

    if (event.target.classList.contains("decrease")) {
      let index = event.target.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    }

    if (event.target.classList.contains("remove")) {
      let index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      updateCart();
    }
  });

  document.getElementById("checkout").addEventListener("click", function () {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total").textContent.trim();

    if (cartItems.children.length === 0 || cartTotal === "₱0.00") {
      // Show an alert if the cart is empty
      alert("Your cart is empty! Please add items before checking out.");
      return; // Stop the function execution
    }

    // Proceed with checkout if cart is not empty
    document.getElementById("checkout-total").textContent = cartTotal;
    let checkoutModal = new bootstrap.Modal(
      document.getElementById("checkoutModal")
    );
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      checkoutModal.show();
    } else {
      alert("Please log in to proceed with checking out");
    }
  });

  document
    .getElementById("confirmPayment")

    .addEventListener("click", function () {
      let totalPriceText = document
        .getElementById("checkout-total")
        .textContent.trim();
      let totalPrice = parseFloat(totalPriceText.replace("₱", ""));
      let selectedPayment = document.querySelector(
        'input[name="payment-method"]:checked'
      );
      if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
      }
      alert(
        ` Payment confirmed via ${
          selectedPayment.value
        }. Total: ₱${totalPrice.toFixed(2)}`
      );
      cart = [];
      updateCart();
      bootstrap.Modal.getInstance(
        document.getElementById("checkoutModal")
      ).hide();
    });
});
/* Thankyou Modal */
document
  .getElementById("confirmPayment")
  .addEventListener("click", function () {
    let selectedPayment = document.querySelector(
      'input[name="payment-method"]:checked'
    );
    if (selectedPayment) {
      //close cart modal
      let cartModal = bootstrap.Modal.getInstance(
        document.getElementById("cartModal")
      );
      cartModal.hide();

      // Show the "Thank You" modal after a small delay

      setTimeout(() => {
        let thankYouModal = new bootstrap.Modal(
          document.getElementById("thankYouModal")
        );
        thankYouModal.show();

        // Clear the cart after confirmPayment
        document.getElementById("cart-items").innerHTML = "";
        document.getElementById("cart-total").innerText = "₱0.00";
      }, 500); // 500ms delay for smooth transition
    }
  });

// JavaScript to dynamically change active class on click
document.addEventListener("DOMContentLoaded", function () {
  let navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all links
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Add 'active' class to the clicked link
      this.classList.add("active");
    });
  });
});
