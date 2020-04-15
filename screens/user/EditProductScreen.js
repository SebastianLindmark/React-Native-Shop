import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const EditProductScreen = props => {


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))


    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    useEffect(() => {

        if (error) {
            Alert.alert('An error occured', error, [{ text: 'Ok' }]);
        }

    }, [error])


    const submitHandler = useCallback(async () => {

        setError(null);
        setIsLoading(true);

        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(prodId, title, description, imageUrl))
            } else {
                await dispatch(productActions.createProduct(title, description, imageUrl, +price));
            }

            props.navigation.goBack();

        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);



    }, [dispatch, prodId, title, description, imageUrl, price, setError, setIsLoading]);


    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])


    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }



    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Image url</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
                </View>

                {editedProduct ? null :
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
                    </View>
                }

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView >

    )

};


EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {

        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFn} /> </HeaderButtons>

    };

}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1


    }

})


export default EditProductScreen;