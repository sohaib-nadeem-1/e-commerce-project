import { cartIconCheck } from "./addToCart.js"; // 👈 addCartFunction se addToCart
import { showCards } from "./functionCards.js";



fetch("./Apis/product.json")
    .then(res => res.json())
    .then(data => {
        showCards(data);
    });

cartIconCheck(); // ✅