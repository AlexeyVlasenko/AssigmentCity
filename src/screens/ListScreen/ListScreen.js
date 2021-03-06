import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { citiesActions } from '#store/actionCreators';

import SearchComponent from './SearchComponent';
import CardComponent from './CardComponent';

class ListScreen extends Component {
    static navigationOptions = () => ({
      header: null,
    });

    state = {
      searchQuery: '',
      refreshing: false,
      searching: false,
    };

    componentDidMount = () => {
      const { getCities } = this.props;
      getCities();
    };

    handleSearchTextChange = (text) => {
      const { searchQuery } = this.state;

      if (text.length > 3) {
        this.search();
      } else if (text.length < searchQuery.length) {
        this.setState({ searching: false });
      }

      this.setState({ searchQuery: text });
    };

    search = () => {
      const { searchQuery } = this.state;
      const { searchCities } = this.props;

      this.setState({ searching: true });
      searchCities(searchQuery);
    };

    handleLikeCity = (id) => {
      const { likeCity } = this.props;
      likeCity(id);
    };

    handleRefresh = async () => {
      const { getCities } = this.props;
      this.setState({ refreshing: true });
      await getCities();
      this.setState({ refreshing: false });
    };

    renderCard = ({ item }) => {
      const { likes } = this.props;
      const isLiked = !!likes.find(like => like.id === item.id);

      return (
        <CardComponent
          city={item}
          isLiked={isLiked}
          onLike={this.handleLikeCity}
        />
      );
    };

    render() {
      const { searchQuery, searching, refreshing } = this.state;
      const {
        searchResult, cities, citiesLoading, searchLoading,
      } = this.props;
      const displayCities = searching ? searchResult : cities;
      const loading = searching ? searchLoading : citiesLoading;

      return (
        <View style={{ flex: 1 }}>
          <SearchComponent
            value={searchQuery}
            onChangeText={this.handleSearchTextChange}
          />

          {loading ? <View /> : (
            <FlatList
              data={displayCities}
              renderItem={this.renderCard}
              refreshControl={(
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.handleRefresh}
                />
)}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }}
            />
          )}
        </View>
      );
    }
}

const mapState = ({ cities }) => ({
  cities: cities.cities,
  likes: cities.likes,
  searchResult: cities.searchResult,
  citiesLoading: cities.citiesLoading,
  searchLoading: cities.searchLoading,
});

const mapDispatch = (dispatch) => {
  const { getCities, searchCities, likeCity } = citiesActions;

  return bindActionCreators({
    getCities,
    searchCities,
    likeCity,
  }, dispatch);
};

export default connect(mapState, mapDispatch)(ListScreen);
