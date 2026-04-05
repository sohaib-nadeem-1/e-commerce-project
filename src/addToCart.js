export function addToCart (event, id, stock){
    
      const  currentCard = document.querySelector(`#card${id}`)
      console.log(currentCard)

 let quantity = currentCard.querySelector(".quant").textContent;
    let prices = currentCard.querySelector(".newprice").textContent;
  prices = prices.replace("Rs.","")
 prices = ( prices*quantity);
   console.log(prices)

   localStorage.setItem
}
