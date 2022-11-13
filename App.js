import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from './src/screens/login';
import Home from './src/screens/home';
import SignUp from './src/screens/signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import {DeviceEventEmitter} from "react-native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null)
  const { getItem, setItem, removeItem } = useAsyncStorage('authToken'); 

  console.log('token', token)

  useEffect(() => {
    checkLogin()
  }, []);

  DeviceEventEmitter.addListener("event.setToken", (eventData) => setToken(eventData))

  useEffect(() => {
    if (token !== null && token !== undefined) {
      setItem(token)
      setToken(null)
      checkLogin()
    }
  }, [token]);

  const checkLogin = async () => {
    //removeItem()
    const item = await getItem();
    console.log('item', item)
    if (item === null) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }


  // const [data, setData] = useState(null);

  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('authToken', value)
  //   } catch (e) {
  //     console.log('auth error', e)
  //   }
  // }

  // const getData = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://cl4you.fly.dev/api/v1/base'
  //     );
  //     const json = await response.json();

  //     setData(json.message)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const clearData = () => {
  //   setData(null)
  // }

  const Stack = createNativeStackNavigator();

  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {console.log('isLoggedIn', isLoggedIn)}
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
