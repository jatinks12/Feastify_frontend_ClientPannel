export const calculateCartTotals=(cartItems,quantities)=>{
   

   const Subtotal = cartItems.reduce((acc,food) => acc + food.price * quantities[food.id],0);

   const Shipping=Subtotal===0?0.0:10;
   const tax = Subtotal*0.1;
   const total=Subtotal+Shipping+tax;

   return{Subtotal,Shipping,tax,total}
}