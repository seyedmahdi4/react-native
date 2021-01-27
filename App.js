
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { load_s } from './utils/function'
//import io from "socket.io-client";
import {socket} from './ws.js'

//import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/login'
import Signup from './pages/signup'
import Main from './pages/main'
import Loading from './pages/loading'


const Stack = createStackNavigator();
// const Data = {
//   token: '',
//   privatekey: '',
// }

// load_s('token').then((token) => { Data.token = token })
// load_s('private_key').then((privatekey) => { Data.privatekey = privatekey })


const App = () => {

  const [token, setToken] = useState('')
  const [privatekey, setPrivatekey] = useState('')
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  const sss = async () => {
    const token = await load_s("token");
    const privatekey = await load_s("private_key");
    setLoading(false)
    if (token != null, privatekey != null) {
      setToken(token)
      setPrivatekey(privatekey)
      setAuthenticated(true)
    }
  }

  useEffect(() => {
    sss()
  }, [loading, authenticated])

  useEffect(() => {
    if (authenticated && !loading) {
      socket.on('msg', (data) => {
        console.log(data);
      });

      socket.emit('msg', { msg: 'hi  hi', enc_key: '12121212',to:'seyed' });
    }
  }, [loading, authenticated])


  return (
    <NavigationContainer>
      { loading &&
        <ActivityIndicator size='small' />}
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>


        {authenticated && !loading ? (

          <Stack.Screen name="main" component={Main}
            initialParams={{
              data:
                { token: token, privatekey: privatekey }
            }}
          />

        ) : (
            <>
              <Stack.Screen name="login" component={Login} />

              <Stack.Screen name="main" component={Main}
                initialParams={{
                  data:
                    { token: token, privatekey: privatekey }
                }} />

              <Stack.Screen name="signup" component={Signup} />
            </>

          )
        }




      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
