import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaView,View, Header, Left, Button, Icon, Body, Title, Right, Text, StyleSheet } from 'react-native'

import {socket} from './../ws.js'


const Main = (props) => {
  const token = props.route.params.data.token
  const privatekey = props.route.params.data.privatekey
  socket.emit('msg', { msg: 'hi  hi', enc_key: '12121212',to:'ali' });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/1',
        }
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
<SafeAreaView style={styles.container}>
    <View style={styles.container}>

      <View style={styles.Header}>
        <View style={styles.Header_name}>
          <Text style={styles.txet_name}>hi</Text>
        </View>
      </View>

  <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
  />
    </View >
    </SafeAreaView>
  )

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:12,
    backgroundColor: '#141d26',
  },
  Header: {
    borderBottomWidth: 0.7,
    backgroundColor:'#243447'
  },
  Header_name: {
    padding:4,

    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',//'flex-start',
    //paddingLeft: 20
  },

  txet_name: {
    fontWeight: "bold",
    fontSize:20,
    color:'#fff'
  },

  a: {
    width: "100%",
    backgroundColor: "#7688b1",
    borderRadius: 25,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",

  },

})


export default Main