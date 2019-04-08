import React, { Component } from 'react';
import { FlatList, View } from "react-native";

import SearchComponent from "./SearchComponent";
import CardComponent from "./CardComponent";

import cities from '../../res/apiMock/cities'

class ListScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    state = {
        searchQuery: ''
    };

    onSearch = (text) => {
        this.setState({ searchQuery: text })
    };


    renderCard = ({ item }) => {
        return (
            <CardComponent city={item}/>
        )
    };


    render() {
        const { searchQuery } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <SearchComponent value={searchQuery} onChangeText={this.onSearch}/>

                <FlatList data={cities}
                          renderItem={this.renderCard}
                          keyExtractor={(item) => item.id}
                          contentContainerStyle={{flexGrow: 1, paddingVertical: 16}}
                />
            </View>
        );
    }
}

export default ListScreen;
