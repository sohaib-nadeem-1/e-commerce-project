export function getcardproduct (){

  const cartData =  localStorage.getItem("carddata");

  if(!cartData){
    // const cartProduct = cartData;
    console.log("hahah")
    return [];
  }

  const cartProducts = JSON.parse(cartData)
  return cartProducts;


}