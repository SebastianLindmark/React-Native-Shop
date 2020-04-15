import { ADD_ORDER, SET_ORDERS } from "../actions/orders"
import Order from "../../models/order"


const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    let newOrder;
    switch (action.type) {
        case ADD_ORDER:
            newOrder = new Order(action.orders.id, action.orders, action.orders.amount, action.orders.date);

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }

        case SET_ORDERS:
            return {
                orders: action.orders
            }

        default:
            return {
                ...state
            }


    }



}