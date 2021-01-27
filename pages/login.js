import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { hash_function, make_RSA_key, SHA256, baseurl,AES_decrypt, save_s, load_s} from './../utils/function'
const axios = require('axios');


const Login = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isLoading) {
      if (!(username.length < 3 || password.length < 3)) {
        setError('')
        const hash_passwd = SHA256(password)
        const passwd = hash_function(password)
        setPassword(passwd)
        LoginNow(passwd, hash_passwd)
      }
      else {
        setIsLoading(false)
        setError('username and password must be bigger than 5 character')
      }
    }
  }, [isLoading]);

  const LoginNow = (passwd, hash_passwd) => {
    const rsa_key = make_RSA_key()
    const data = {
      username: username,
      password: passwd,
    }
    axios.post(baseurl + '/login', data)
      .then(res => {
        console.log(res.data)
        if (res.data.status != 'bad') {
          const private_key = AES_decrypt(res.data.enc_private_key, hash_passwd)
          save_s('token', res.data.token).then(() => {
            console.log('saved token')//
          })
          save_s('private_key', private_key).then(() => {
            console.log('saved sec_key')//
          })
          props.navigation.navigate('main',{
            data:
                { token: res.data.token, privatekey: private_key }
        })
        }else{
          setPassword('')
          console.log('status == bad');
          setError('bad data')
        }
      })
      .then(setIsLoading(false))
  }


  return (
    <View style={styles.container}>

      <Text style={[styles.logo, { fontSize: 30 }, { color: "#ffdd88" }]}>LiteMessenger! </Text>

      <Text style={styles.logo}>Login </Text>


      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          value ={username}
          placeholder="Username ..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          value = {password}
          style={styles.inputText}
          placeholder="Password ..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)} />
      </View>

      <TouchableOpacity style={styles.loginBtn}
        onPress={() => setIsLoading(true)}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Signupbtn}
        onPress={() => props.navigation.navigate('signup')}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>


      <ActivityIndicator animating={isLoading} size="large" color="#d1ab1a" />
      <Text style={[styles.loginText, { color: "red", marginTop: 20 }]}>
        {error}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#183f5f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#7688b1",
    borderRadius: 25,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#0035d8aa",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  Signupbtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25
  },
  loginText: {
    color: "white"
  }
});

export default Login
