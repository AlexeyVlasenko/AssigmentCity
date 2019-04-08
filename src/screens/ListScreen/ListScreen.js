import React, { Component } from 'react';
import { FlatList, View } from "react-native";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { cities, likes } from '#store/actionCreators';

import SearchComponent from "./SearchComponent";
import CardComponent from "./CardComponent";

class ListScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    state = {
        searchQuery: '',
    };

    componentDidMount = () => {
        const { getCities } = this.props;
        getCities();
    }

    onSearch = (text) => {
        this.setState({ searchQuery: text });

        if (text.length > 3) {
            const { searchCities } = this.props;
            searchCities(text);
        }
    };

    handleLikeCity = (id) => {
        const { likeCity } = this.props;
        likeCity(id);
    }

    renderCard = ({ item }) => (
        <CardComponent
            city={item}
            onLike={this.handleLikeCity}
        />
    );

    render() {
        const { searchQuery } = this.state;
        const { searchResult, cities } = this.props;

        const displayCities = searchResult.length ? searchResult : cities;

        return (
            <View style={{ flex: 1 }}>
                <SearchComponent
                    value={searchQuery}
                    onChangeText={this.onSearch}
                />

                <FlatList
                    data={displayCities}
                    renderItem={this.renderCard}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }}
                />
            </View>
        );
    }
}

const mapState = ({ cities }) => ({
    cities: cities.cities,
    searchResult: cities.search,
});

const mapDispatch = dispatch => {
    const { getCities, searchCities, likeCity } = cities;

    return bindActionCreators({
        getCities,
        searchCities,
        likeCity,
    }, dispatch);
};

export default connect(mapState, mapDispatch)(ListScreen);
