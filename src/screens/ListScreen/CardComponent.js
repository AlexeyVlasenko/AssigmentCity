import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from "react-navigation";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { Surface, TouchableRipple } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Theme } from '#theme'
import { getWeather } from '#lib/utils/weather';
import { getDistance } from '#lib/utils/location/common';
import { LocationContext } from '#lib/utils/location/locationContext';

class CardComponent extends Component {
    state = {
        weather: {
            temp: '',
            condition: '',
        },
        weatherLoading: true,
    };

    componentDidMount() {
        this.getWeather();
    }

    getWeather = async () => {
        const { location } = this.props.city;
        const weather = await getWeather(location);

        const temp = `${parseInt(weather.main.temp - 273.15)}°`;
        const condition = weather.weather.pop()['main'];

        this.setState({ weather: { temp, condition }, weatherLoading: false });
    }

    _renderDistance = ({ location }) => {

        if (location) {
            const { location: cityLocation } = this.props.city;
            const { latitude, longitude } = location.coords;
            var distance = getDistance([latitude, longitude], cityLocation);
        }

        return (
            <View style={styles.distanceContainer}>
                <Text style={Theme.textStyles.distance}>{location ? `${parseInt(distance)} KM` : ''}</Text>
                <Icon name={'chevron-right'} size={24} style={{ width: 16 }} color={'white'}/>
            </View>
        );
    }

    render() {
        const { city, onLike, isLiked } = this.props;
        const { id, name, description, image } = city;
        const { weather, weatherLoading } = this.state;

        return (
            <Surface style={styles.surfaceContainer}>
                <TouchableRipple
                    onPress={() => this.props.navigation.navigate('City', { cityId: id })}
                    style={styles.touchableContainer}
                >
                    <View>
                        <ImageBackground resizeMode={'cover'} blurRadius={3} style={styles.imageInfoContainer}
                                         source={{ uri: image }}>

                            <View style={styles.overlayContainer}>

                                <View style={styles.likeContainer}>

                                    <Icon name={isLiked ? 'favorite' : 'favorite-border'} size={32}
                                          onPress={() => onLike(id)} color={Theme.LIKE_COLOR}/>

                                </View>

                                <View style={styles.locationContainer}>
                                    <View style={styles.rowContainer}>

                                        <View style={styles.cityTextContainer}>
                                            <Text style={Theme.textStyles.heading}>{name}</Text>
                                        </View>

                                        <View style={styles.infoTextContainer}>
                                            <Text
                                                style={Theme.textStyles.temperature}>{weatherLoading ? '' : `${weather.temp} ${weather.condition}`}</Text>
                                            <LocationContext.Consumer>
                                                {this._renderDistance}
                                            </LocationContext.Consumer>
                                        </View>
                                    </View>

                                </View>
                            </View>


                        </ImageBackground>

                        <View style={styles.descriptionContainer}>
                            <Text style={Theme.textStyles.description}>{description}</Text>
                        </View>
                    </View>
                </TouchableRipple>
            </Surface>
        );
    }
}


const styles = StyleSheet.create({
    surfaceContainer: {
        width: '95%',
        alignSelf: 'center',
        elevation: 4,
        marginBottom: 8
    },
    touchableContainer: {
        width: '100%'
    },
    imageInfoContainer: {
        height: 150,
    },
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingTop: 8
    },
    likeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    locationContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    descriptionContainer: {
        padding: 8
    },
    cityTextContainer: {
        justifyContent: 'center'
    },
    infoTextContainer: {
        justifyContent: 'flex-end'
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
});


CardComponent.propTypes = {
    city: PropTypes.object.isRequired,
    onLike: PropTypes.func.isRequired,
    isLiked: PropTypes.bool,
};

export default withNavigation(CardComponent);
