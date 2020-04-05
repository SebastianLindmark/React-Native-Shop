import {  createAppContainer} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'

import Colors from '../constants/Colors'
import {Platform} from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailscreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'

const ProductsNavigator = createStackNavigator({
    ProductsOverview : ProductsOverviewScreen,
    ProductDetail : ProductDetailscreen,
    Cart : CartScreen
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor : Platform.OS == 'android' ? Colors.primary : ''
        },
        headerTintColor : Platform.OS == 'android' ? 'white': Colors.primary
    }

});



export default createAppContainer(ProductsNavigator)