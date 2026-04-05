export function quantityAddMinus(event,id,stock){
       let idss = document.querySelector(`#card${id}`)
  
    let stocks = idss.querySelector(".productStock")
   stock = Number(stocks.textContent)
    let quantityEl = idss.querySelector(".quant")
   let quantity = Number(quantityEl.textContent);
   if(event.target.classList.contains("increment")){
     if(quantity<stock){
        quantity++;
     }
     }
  if(event.target.classList.contains("decrement")){
     if(quantity>1){
        quantity--;
     }
     }
       quantityEl.textContent = quantity;
}