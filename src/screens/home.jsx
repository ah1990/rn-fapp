import { StyleSheet, Text, View, Button } from 'react-native';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

const Home = ({ navigation }) => {
    // const [value, setValue] = useState(null);
    // const { getItem, setItem, removeItem } = useAsyncStorage('authToken');

    // const readItemFromStorage = async () => {
    //     const item = await getItem();
    //     setValue(item);
    // };
    
    //   const writeItemToStorage = async newValue => {
    //     await setItem(newValue);
    //     setValue(newValue);
    //   };
    
    //   useEffect(() => {
    //     // writeItemToStorage('ddddaa')
    //     removeItem()
    //     readItemFromStorage();
    //   }, []);

    // const renderScreen = () => {
    //     if (value !== null) {
    //         navigation.navigate('Home')
    //         return <Text>Home screen</Text>
    //     } else {
    //         return navigation.navigate('Login')
    //     }
    // }

    return (
        <View style={styles.container}>
            <Text>Home screen</Text>
        </View>
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

export default Home