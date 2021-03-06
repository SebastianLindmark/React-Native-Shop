
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
import CartItem from '../../components/shop/CartItem'
import Card from '../../components/UI/Card'


const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) => a.productTitle > b.productTitle ? 1 : -1);
    });



    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
    }

    return <View style={styles.screen}>

        <Card style={styles.summary}>
            <Text style={styles.summaryText}>Total:
                <Text style={styles.amount}>{Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
            </Text>

            {isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />) :

                <Button color={Colors.accent} title='Order Now' disabled={cartItems.length === 0}
                    onPress={sendOrderHandler} />
            }
            
        </Card>
        <FlatList
            style={styles.cartItems}
            data={cartItems}
            keyExtractor={item => item.productId}
            renderItem={itemData =>
                <CartItem
                    deletable
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    onRemove={() => { dispatch(cartActions.removeFromCart(itemData.item.productId)); }} />} />

    </View>

};


const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    },
    cartItems: {
        marginTop: 7
    }


});


CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

export default CartScreen;