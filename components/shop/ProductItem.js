import React from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Colors from '../../constants/Colors';
import Card from '../UI/Card';
const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (

        <Card style={styles.product}>
            <TouchableCmp style={styles.container} onPress={props.onSelect} useForeground>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.image }} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>  {props.title}</Text>
                        <Text style={styles.price}>  {props.price.toFixed(2)}</Text>
                    </View>

                    <View style={styles.actions} >
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </Card>

    )
};


const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%'
    },

    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },

    product: {
        
        height: 300,
        margin: 20,
        overflow: "hidden"

    },
    image: {
        width: '100%',
        height: '100%'
    },

    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },

    title: {
        fontSize: 18,
        marginVertical: 4,

    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }


});


export default ProductItem;