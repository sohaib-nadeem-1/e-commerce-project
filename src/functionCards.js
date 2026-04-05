import { addToCart } from "./addToCart.js";
import { quantityAddMinus } from "./quantity.js";

const mainCardCopies = document.querySelector(".main-card-cpies");
const mainCardConatainer = document.querySelector(".main-cards-conatainer");
const templateclone = document.querySelector(".templateclone")
export function showCards(data) {

    if (!data) {
        return false;
    }

    data.forEach(currdata => {
        const { name, id, category, price, oldPrice, stock, image, description } = currdata;

        const productClone = document.importNode(templateclone.content, true);
        const card = productClone.querySelector("#cardValue");
        card.setAttribute("id", `card${id}`);
        productClone.querySelector(".badge").textContent = category;
        productClone.querySelector(".product-img").src = image;
        productClone.querySelector(".name").textContent = name;
        productClone.querySelector(".desc").textContent = description;
        productClone.querySelector(".newprice").textContent = `Rs.${price}`;
        productClone.querySelector(".old").textContent = `Rs.${oldPrice}`;
        productClone.querySelector(".productStock").textContent = stock;

      
        productClone.querySelector(".quantity-child-1").addEventListener("click", function (event) {
            quantityAddMinus(event, id, stock)
        })

        productClone.querySelector(".cart-btn").addEventListener("click",function(event){
            addToCart(event,id,stock)
        })
        mainCardCopies.append(productClone)


    });



}



