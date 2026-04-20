// import { showLocalStorageProducts } from "./cartPaymentFunction.js"

// fetch("./Apis/product.json")        
//   .then(res => res.json())
//   .then(data => {
//     showLocalStorageProducts(data)
//   })

  

import { showLocalStorageProducts } from "./cartPaymentFunction.js";
import { cartIconCheck } from "./cartPaymentFunction.js";
import { getcardproduct } from "./getCartProduct.js";
import { showNotification } from "./addToCart.js";

fetch("./Apis/product.json")
    .then(res => res.json())
    .then(data => {
        showLocalStorageProducts(data);
    });

cartIconCheck();
