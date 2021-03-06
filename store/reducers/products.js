import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId == 'u1')

}

export default (state = initialState, action) => {

    switch (action.type) {

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.userProducts.filter(product => product.id !== action.pid)
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(action.productData.id, 'u1', action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }

        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(product => product.id === action.pid);
            const productPrice = state.userProducts[productIndex].price;
            const ownerId = state.userProducts[productIndex].ownerId;
            const updatedProduct = new Product(action.pid, ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, productPrice)

            let updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
    }


    return state;
}

