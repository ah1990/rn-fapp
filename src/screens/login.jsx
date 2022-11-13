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
 
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoginDisabled = () => {
    return email.length < 1 || password.length < 1
  }

  const toSignUpScreen = () => {
    return navigation.navigate('SignUp')
  }
 
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="ex@mp.le"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Abc123"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity 
        style={[styles.loginBtn, isLoginDisabled() && styles.disabledBtn]}
        disabled={isLoginDisabled()}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotBtn}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text>
        Don't have an account?&nbsp;
        <Text 
          style={styles.signUpBtn}
          onPress={() => toSignUpScreen()}
        > 
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#F5F2F2",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgotBtn: {
    height: 20,
    marginTop: 10,
    color: "#4771FE",
  },

  signUpBtn: {
    height: 20,
    marginTop: 10,
    color: "#4771FE",
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
  }
});