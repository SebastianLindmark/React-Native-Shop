import { ADD_ORDER } from "../actions/orders"
import Order from "../../models/order"


const initialState = {
    orders : []
}

export default (state = initialState, action) => {
    let newOrder;
    switch(action.type) {
        case ADD_ORDER:
            newOrder = new Order(new Date().toString(), action.orders, action.orders.amount, new Date());
    
            return {
                ...state,
                orders : state.orders.concat(newOrder)
            }
        default:
            return {
                ...state
            }

    }

    

}