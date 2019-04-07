import React, { Component } from 'react';
import { View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";

class CityScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'City Name',
        headerLeft: <IconButton icon='chevron-left' size={32} style={{ width: 32 }}
                                onPress={() => navigation.goBack()}/>
    });

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator animating={true} size={64} />
            </View>
        );
    }
}

export default CityScreen;
