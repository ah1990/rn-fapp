import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {DeviceEventEmitter} from "react-native"

const BASE_URL = 'https://cl4you.fly.dev/api/v1'

const SignUp = () => {
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirm, setPasswordConfirm] = useState(null)
    const [errors, setErrors] = useState({})

    const isLoginDisabled = () => {
        return !(firstName && lastName && email && password && passwordConfirm)
    }

    useEffect(() => {
        return () => {
            DeviceEventEmitter.removeAllListeners("event.setToken")
          };
      }, []);

    const signUp = async() => {
        try {
            const response = await fetch(BASE_URL + '/auth/signup', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                    password_confirmation: passwordConfirm,
                })
            });

            const json = await response.json();
            
            if (response.status >= 200) {
                return DeviceEventEmitter.emit("event.setToken", json.token);
            } else {
                setErrors(json.errors)
            }

        } catch(e) {
            console.log("Error:", e)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.signUpHeader}>
                Create your Account
            </Text>

            <StatusBar style="auto" />

            {
                errors?.first_name && 
                <Text style={styles.errorText}>First Name {errors.first_name[0]}</Text>
            }
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder="First Name"
                placeholderTextColor="#003f5c"
                onChangeText={(firstName) => setFirstName(firstName)}
                />
            </View>

            {
                errors?.last_name && 
                <Text style={styles.errorText}>Last Name {errors.last_name[0]}</Text>
            }
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                placeholderTextColor="#003f5c"
                onChangeText={(lastName) => setLastName(lastName)}
                />
            </View>

            {
                errors?.email && 
                <Text style={styles.errorText}>Email {errors.email[0]}</Text>
            }
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
                />
            </View>
 
            {
                errors?.password &&
                <Text style={styles.errorText}>Password {errors.password[0]}</Text>
            }
            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </View>


            <View style={styles.inputView}>
                <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
                />
            </View>

            <TouchableOpacity 
                style={[styles.loginBtn, isLoginDisabled() && styles.disabledBtn]}
                disabled={isLoginDisabled()}
                onPress={() => signUp()}
            >
                <Text 
                    style={styles.loginText}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    )
   
}

export default SignUp

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },

    signUpHeader: {
        marginBottom: 30,
        fontSize: 20,
        fontWeight: "bold",
    },

    inputView: {
        backgroundColor: "#F5F2F2",
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#4771FE",
        opacity: 1,
    },
    
    disabledBtn: {
        opacity: 0.5,
    },

    errorText: {
        color: 'red',
        marginBottom: 10,
    }
})