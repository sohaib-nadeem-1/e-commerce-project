import { getcardproduct } from "./getCartProduct.js";

// ✅ Badge update karo — show/hide automatic
export function updateCartBadge() {
  const cartData = getcardproduct();
  const totalQty = cartData.reduce((sum, item) => sum + Number(item.quantity), 0);

  document.querySelectorAll(".productNum").forEach(badge => {
    if (totalQty > 0) {
      badge.textContent = totalQty;
      badge.style.display = "flex";
    } else {
      badge.textContent = "";
      badge.style.display = "none";
    }
  });
}

// ✅ Notification function
export function showNotification(message, type) {
  let old = document.querySelector(".notification");
  if (old) old.remove();

  let notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.innerHTML = `
    <i class="fa-solid ${type === 'added' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add("show"), 10);
  setTimeout(() => {
    notif.classList.add("hide");
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

// ✅ Add to cart
export function addToCart(event, id, stock) {
  let arrLocalStorage = getcardproduct();

  const currentCard = document.querySelector(`#card${id}`);
  let quantity = Number(currentCard.querySelector(".quant").textContent);
  let prices = currentCard.querySelector(".newprice").textContent;
  prices = prices.replace("Rs.", "");
  prices = Number(prices * quantity);

  let existingItem = arrLocalStorage.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity = quantity;
    existingItem.prices = prices;
  } else {
    arrLocalStorage.push({ id, quantity, prices });
  }

  localStorage.setItem("carddata", JSON.stringify(arrLocalStorage));

  // ✅ Badge update karo
  updateCartBadge();

  let totalQuantity = arrLocalStorage.reduce((sum, item) => sum + Number(item.quantity), 0);
  showNotification(`${totalQuantity} products added to cart!`, "added");
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

// ✅ Page load pe badge check (refresh ke baad bhi sahi rahe)
document.addEventListener("DOMContentLoaded", updateCartBadge);
