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

    //store values in local storage
    localStorage.setItem("cartTotalQuantity", selectedProduct.quantity);
    localStorage.setItem("cartTotalPrice", totalPrice);
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
});

//View store cart
document.addEventListener("DOMContentLoaded", function () {
  let cart = [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCart() {
    let storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart);
      updateCart();
    }
  }

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
    saveCart();
  }

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      let productName = this.getAttribute("data-name");
      let existingProduct = cart.find((item) => item.name === productName);

      // If product exists, show modal and update quantity..
      if (existingProduct) {
        selectedProduct = existingProduct;
      } else {
        selectedProduct = {
          name: productName,
          price: parseFloat(this.getAttribute("data-price")),
          image: this.getAttribute("data-image"),
          description: this.getAttribute("data-description"),
          quantity: 1,
        };
      }

      // Populate modal with selected product details
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

      let cartModal = new bootstrap.Modal(
        document.getElementById("addToCartModal")
      );
      cartModal.show();
    });
  });

  //  Update confirm Add to Cart button to store the correct quantity
  document
    .getElementById("confirmAddToCart")
    .addEventListener("click", function () {
      let updatedQuantity = parseInt(
        document.getElementById("cart-quantity").value
      );

      let existingProduct = cart.find(
        (item) => item.name === selectedProduct.name
      );
      if (existingProduct) {
        existingProduct.quantity = updatedQuantity; //store selected qty.
      } else {
        selectedProduct.quantity = updatedQuantity;
        cart.push(selectedProduct);
      }

      updateCart();
      bootstrap.Modal.getInstance(
        document.getElementById("confirmModal")
      ).hide();
    });

  document.addEventListener("click", function (event) {
    let index = event.target.getAttribute("data-index");
    if (!index) return;

    if (event.target.classList.contains("increase")) {
      cart[index].quantity++;
    } else if (event.target.classList.contains("decrease")) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
    } else if (event.target.classList.contains("remove")) {
      cart.splice(index, 1);
    }

    updateCart();
  });

  document.getElementById("checkout").addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty! Please add items before checking out.");
      return;
    }

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please log in to proceed with checking out");
      return;
    }

    document.getElementById("checkout-total").textContent =
      document.getElementById("cart-total").textContent;
    let checkoutModal = new bootstrap.Modal(
      document.getElementById("checkoutModal")
    );
    checkoutModal.show();
  });

  document
    .getElementById("confirmPayment")
    .addEventListener("click", function () {
      let totalPrice = document.getElementById("cart-total").textContent;
      let selectedPayment = document.querySelector(
        'input[name="payment-method"]:checked'
      );
      if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
      }

      alert(`Payment confirmed via ${selectedPayment.value} ${totalPrice}`);
      cart = [];
      saveCart(); // Save empty cart
      updateCart();
      bootstrap.Modal.getInstance(
        document.getElementById("checkoutModal")
      ).hide();
    });

  loadCart(); // Load the cart when the page loads
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
