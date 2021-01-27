import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { color } from 'react-native-reanimated';
import { hash_function, make_RSA_key, SHA256, baseurl, AES_encrypt, save_s, load_s, remove_s, } from './../utils/function'
const axios = require('axios');
//import { useStateWithCallbackLazy } from 'use-state-with-callback';
//import { PBKDF2 } from 'crypto-js';

const Signup = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  //const [state, setState] = useStateCallback(0);


useEffect(()=>{
  
  if (isLoading) {
    if (!(username.length < 3 || password.length < 3)) {
      setError('')
      const hash_passwd = SHA256(password)
      const passwd = hash_function(password)
      setPassword(passwd)
      SignupNow(passwd,hash_passwd)
    }
    else{
    setIsLoading(false)
    setError('username and password must be bigger than 5 character')
  }}
  },[isLoading]);
  


  
  const SignupNow = (passwd,hash_passwd) => {
    const rsa_key = make_RSA_key()
    const data = {
      name: name,
      username: username,
      password: passwd,
      public_key: rsa_key.publicKey,
      enc_private_key: AES_encrypt(rsa_key.privateKey, hash_passwd)
    }
    //console.log(data);
    axios.post(baseurl+'/register', data)
      .then(res => {
        if (res.data.status != 'bad') {
        save_s('token',res.data.token).then( () =>{
          console.log('saved token')
        })
        save_s('private_key', rsa_key.privateKey).then(() => {
          console.log('saved sec_key')
        })
        props.navigation.navigate('main',{
          data:
              { token: res.data.token, privatekey: rsa_key.private_key }
      })
      }else{
        setPassword('')
        console.log('status == bad');//
        setError('bad data')
      }
      })
      .catch(error => {
        setError('connection error')
        setPassword('')
      })
      .then(setIsLoading(false))
  }


  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { fontSize: 30 }, { color: "#ffdd88" }]}>LiteMessenger! </Text>

      <Text style={styles.logo}>Signup </Text>

      <View style={styles.inputView} >
        <TextInput

          style={styles.inputText}
          placeholder="Name ..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setName(text)} />
      </View>
      <View style={styles.inputView} >
        <TextInput
        value={username}
          style={styles.inputText}
          placeholder="Username ..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          value={password}
          secureTextEntry
          style={styles.inputText}
          placeholder="Password ..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)} />
      </View>




      <TouchableOpacity style={styles.loginBtn}
        onPress={ ()  => {
            setIsLoading(true)
         }}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Signupbtn}
        onPress={() => props.navigation.navigate('login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
          <ActivityIndicator animating={isLoading}  size="large" color="#d1ab1a" />
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
    marginBottom: 30
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
    marginBottom: 15
  },
  loginText: {
    color: "white",
    padding: 10
  }
});

export default Signup
