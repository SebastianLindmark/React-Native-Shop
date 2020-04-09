import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailscreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import {Ionicons} from '@expo/vector-icons'
import UserProductsSCreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS == 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailscreen,
    Cart: CartScreen
},
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) =>
                (<Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'iot-cart'} size={23} color={drawerConfig.tintColor} />)
        },
        defaultNavigationOptions: defaultNavOptions

    });


const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) =>
            (<Ionicons name={Platform.OS === 'android' ? 'md-list' : 'iot-list'} size={23} color={drawerConfig.tintColor} />)
    },
    defaultNavigationOptions: defaultNavOptions
})


const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsSCreen,
    EditProduct : EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) =>
            (<Ionicons name={Platform.OS === 'android' ? 'md-create' : 'iot-create'} size={23} color={drawerConfig.tintColor} />)
    },
    defaultNavigationOptions: defaultNavOptions,

})


const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin : AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})


export default createAppContainer(ShopNavigator)