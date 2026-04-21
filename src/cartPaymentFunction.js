import { getcardproduct } from "./getCartProduct.js";
import { showNotification, updateCartBadge } from "./addToCart.js";

export function showLocalStorageProducts(product) {

  let arrLocalStorage = getcardproduct();

  let res = product.filter((element) => {
    return arrLocalStorage.some((prod) => prod.id === element.id);
  });

  const productCartTemplate = document.querySelector("#productCartTemplate");
  const productCartContainer = document.querySelector("#productCartContainer");

  // ✅ Summary update
  function updateSummary() {
    let cartData   = getcardproduct();
    let totalItems = cartData.reduce((sum, item) => sum + Number(item.quantity), 0);
    let totalPrice = cartData.reduce((sum, item) => sum + Number(item.prices), 0);

    document.getElementById("totalItems").textContent = totalItems;
    document.getElementById("subtotal").textContent   = `Rs. ${totalPrice}`;
    document.getElementById("grandTotal").textContent = `Rs. ${totalPrice}`;
  }

  // ✅ Cart render
  function showCartProduct() {
    productCartContainer.innerHTML = "";
    arrLocalStorage = getcardproduct();

    res = product.filter((element) => {
      return arrLocalStorage.some((prod) => prod.id === element.id);
    });

    res.forEach(data => {
      const { category, id, image, name } = data;
      const cartItem = arrLocalStorage.find(prod => prod.id === id);
      const quantity = cartItem.quantity;
      const price    = cartItem.prices;

      let productClone = document.importNode(productCartTemplate.content, true);

      productClone.querySelector(".cart-card__badge").textContent   = category;
      productClone.querySelector(".cart-card__img").src             = image;
      productClone.querySelector(".cart-card__info h3").textContent = name;
      productClone.querySelector(".cart-card__price").textContent   = `Rs. ${price}`;
      productClone.querySelector(".cart-card__qty").textContent     = quantity;

      productClone.querySelector(".cart-card__remove").dataset.id = id;
      const btns = productClone.querySelectorAll(".cart-card__btn");
      btns[0].dataset.id = id;
      btns[1].dataset.id = id;

      // ✅ Remove
      productClone.querySelector(".cart-card__remove").addEventListener("click", (e) => {
        let clickedId = Number(e.target.dataset.id);
        let cartData  = getcardproduct();
        let newCart   = cartData.filter(item => item.id !== clickedId);
        localStorage.setItem("carddata", JSON.stringify(newCart));
        showNotification("Product removed from cart!", "removed");
        updateCartBadge();
        showCartProduct();
      });

      // ✅ Increment +
      btns[0].addEventListener("click", (e) => {
        let clickedId = Number(e.target.dataset.id);
        let cartData  = getcardproduct();
        let item      = cartData.find(i => i.id === clickedId);
        item.quantity = Number(item.quantity) + 1;
        item.prices   = data.price * item.quantity;
        localStorage.setItem("carddata", JSON.stringify(cartData));
        updateCartBadge();
        showCartProduct();
      });

      // ✅ Decrement -
      btns[1].addEventListener("click", (e) => {
        let clickedId = Number(e.target.dataset.id);
        let cartData  = getcardproduct();
        let item      = cartData.find(i => i.id === clickedId);
        if (Number(item.quantity) > 1) {
          item.quantity = Number(item.quantity) - 1;
          item.prices   = data.price * item.quantity;
          localStorage.setItem("carddata", JSON.stringify(cartData));
        }
        updateCartBadge();
        showCartProduct();
      });

      productCartContainer.appendChild(productClone);
    });

    updateSummary();
  }

  showCartProduct();

  // ✅ Checkout — cart check + redirect to payment page
  document.querySelector(".checkout-btn").addEventListener("click", () => {
    const cartData = getcardproduct();

    if (cartData.length === 0) {
      showNotification("⚠️ Cart is empty! Please add products first.", "warning");
      return;
    }

    // Payment page pe redirect karo
    window.location.href = "./payment.html";
  });
}

// ✅ Cart icon check
export function cartIconCheck() {
  const navBtn = document.querySelector(".nav-btn");
  if (!navBtn) return;

  navBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    let cartData = getcardproduct();

    if (cartData.length === 0) {
      showNotification("⚠️ Please select a product first!", "warning");
    } else {
      window.location.href = "./cart.html";
    }
  });
}

// ✅ Cart page pe page load hone pe badge update karo
document.addEventListener("DOMContentLoaded", updateCartBadge);