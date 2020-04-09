import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart'
import CartItem from '../../models/cart-item'
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';


const initialState = {

    items : {},
    totalAmount : 0

};

export default (state = initialState, action) => {

    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            let updatedOrNewCartItem;

            if(state.items[addedProduct.id]){
                const cartItem = state.items[addedProduct.id];
                updatedOrNewCartItem = new CartItem(cartItem.quantity + 1, productPrice, productTitle, cartItem.sum + productPrice)
            }else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }

            return {
                ...state,
                items : { ...state.items, [addedProduct.id] : updatedOrNewCartItem},
                totalAmount : state.totalAmount + productPrice
            }
        
        case REMOVE_FROM_CART:
            const currentQty = state.items[action.pid].quantity;
            const selectedCartItem = state.items[action.pid];
            let updatedCartItems;
            
            if(currentQty > 1){
                const updatedCartItem = new CartItem(selectedCartItem.quantity - 1,
                                                    selectedCartItem.productPrice,
                                                    selectedCartItem.productTitle,
                                                    selectedCartItem.sum - selectedCartItem.productPrice);
                updatedCartItems = {...state.items, [action.pid] : updatedCartItem}
            }else{
                updatedCartItems = {...state.items}
                delete updatedCartItems[action.pid];
            }
            

            return {
                ...state,
                items : updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }

        case ADD_ORDER:
            return initialState;

        case DELETE_PRODUCT:
            if(!state.items[action.pid]){
                return {...state};
            }

            let cartItems = {...state.items};
            delete cartItems[action.pid];
            
            return {
                ...state,
                items : cartItems,
                totalAmount : state.totalAmount - state.items[action.pid].sum
            }
            


            



    }

    return state;
}


