import React, { Component } from 'react';
import { Platform, SafeAreaView, View } from "react-native";
import { Button, Searchbar } from "react-native-paper";
import { Theme } from "#theme";

class ListScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    state = {
        firstQuery: ''
    };

    render() {
        return (
            <View>
                <SafeAreaView style={{ backgroundColor: Theme.HEADER_BG }}>
                    <View style={{height: Platform.OS === 'ios' ? 44 : 56, justifyContent: 'center', alignSelf: 'center'}}>
                    <Searchbar
                        style={{height: '80%', width: '90%'}}
                        placeholder="Search"
                        onChangeText={query => {
                            ;
                        }}
                        value={'hey'}
                    />
                    </View>
                </SafeAreaView>
                <Button mode={'container'} onPress={() => this.props.navigation.navigate('City')}> go to</Button>
            </View>
        );
    }
}

export default ListScreen;
