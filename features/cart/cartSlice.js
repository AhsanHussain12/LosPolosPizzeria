import { createSlice } from "@reduxjs/toolkit";


export const cartSlice= createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalPrice: 0
    },
    reducers:{
        addToCart : (state,action)=>{
            const cartItem = state.cart.find(item => item.id === action.payload.id);
            if(cartItem){
                cartItem.quantity ++;
            }
            else{
                state.cart.push({...action.payload, quantity : 1});
            }
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        removeFromCart : (state,action)=>{
            const ItemsInCart = state.cart.filter((item) => item.id !== action.payload.id); 
            state.cart = ItemsInCart;
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        incrementQuantity : (state,action)=>{
            const cartItem = state.cart.find(item => item.id === action.payload.id);
            if(cartItem){
                cartItem.quantity ++;
            }
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        // if the quantity is 1 item is removed from the cart else decrement the quantity
        decrementQuantity: (state,action)=>{
            const cartItem= state.cart.find(item=> item.id === action.payload.id)
            if(cartItem.quantity == 1){
                const ItemsInCart = state.cart.filter((item) => item.id !== cartItem.id); 
                state.cart=ItemsInCart;
            }
            else{
                cartItem.quantity --;
            }
            state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }

    }
})


export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity}= cartSlice.actions;

export default cartSlice.reducer;