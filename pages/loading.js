import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { load_s } from './../utils/function'


const Loading = props => {



    return (


        <View style={
            {
                flex: 1,
                backgroundColor: '#183f5f',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }>
            <ActivityIndicator size="large" color="#fda" />
        </View>
    );
}

export default Loading
