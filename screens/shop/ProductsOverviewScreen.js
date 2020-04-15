import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, Platform, Button, ActivityIndicator, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
import { set } from 'react-native-reanimated';

const ProductsOverviewScreen = (props) => {

    //returns the redux state
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const loadProducts = useCallback(async () => {
        setError(false);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
        
    },[dispatch, setIsLoading, setError])

    useEffect( () => {
        const willFocusSub = props.navigation.addListener('didFocus', loadProducts);

        //clean up
        return () => {
            willFocusSub.remove();
        }

    }, [loadProducts]);


    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {setIsLoading(false)});
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { productId: id, productTitle: title })
    }

    if (error) {
        return (
        
        <View style={styles.centered}>
            <Text>An error occured!</Text>
            <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
        </View> )
    }

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}>

                <Button color={Colors.primary} title="View Details" onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
                <Button color={Colors.primary} title="To Cart" onPress={() => dispatch(cartActions.addToCart(itemData.item))} />

            </ProductItem>
        } />
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                    navData.navigation.toggleDrawer();
                }} /> </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                    navData.navigation.navigate('Cart');
                }} /> </HeaderButtons>

    }

}


const styles = StyleSheet.create({

    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default ProductsOverviewScreen;
