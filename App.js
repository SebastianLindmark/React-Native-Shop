import React from 'react';
import { StyleSheet,Text } from 'react-native';
import { createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'
import ShopNavigator from './navigation/ShopNavigator'

import ReduxThunk from 'redux-thunk'


const rootReducer = combineReducers({products : productsReducer,cart : cartReducer, orders : orderReducer})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
