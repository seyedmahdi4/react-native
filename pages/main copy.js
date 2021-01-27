import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { hash_function, make_RSA_key, SHA256, baseurl, AES_decrypt, save_s, load_s } from './../utils/function'
const axios = require('axios');



const theme = {
    primaryColor: '#fc7474',
    secondaryColor: '#ffce00',
    contrastColor: '#4bacc6',
    chatBackground: "#ffeea3"
};




const Main = props => {
    const [error, setError] = useState('')

    //   useEffect(() => {
    //     if (isLoading) {
    //     }
    //   }, [isLoading]);


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, backgroundColor: '#183f5f', }}>
                    <View style={styles.headerOuterBlock}>
                        <View style={styles.headerBlock}>
                            <View style={{ paddingLeft: 15 }}>
                                <Text style={styles.nameText}>mahdi</Text>
                                <Text style={styles.usernameText}>seyed1</Text>
                            </View>
                            <View style={styles.menuIconBlock}>
                                <TouchableOpacity >
                                    <Text style={styles.menuIcon}>...</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#204060',
        },
        headerOuterBlock: {
            alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#2090aaaa',
        },
        centerAlign: {
            alignItems: 'center',
            justifyContent: 'center'
        },

        headerBlock: {
            flexDirection: 'row', paddingTop: 15, paddingBottom: 10, width: '97%'
        },
        nameText: {
            marginBottom: 2, color: '#fff', fontSize: 16, fontWeight: 'bold'
        },
        usernameText: {
            fontStyle: 'italic', marginBottom: 2, color: '#f2f2f2', fontSize: 14, fontWeight: 'normal'
        },

        menuIconBlock: {
            flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 20
        },
        menuIcon: {
            marginBottom: 2, color: '#f2f2f2', fontSize: 25, fontWeight: 'bold'
        }

    }
);

export default Main
