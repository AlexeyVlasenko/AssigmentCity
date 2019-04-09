import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Surface, TouchableRipple } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Theme } from '#theme'
import { withNavigation } from "react-navigation";
import { getWeather } from '../../lib/utils/weather';

class CardComponent extends Component {
    state = {
        weather: {
            temp: '',
            status: '',
        },
        weatherLoading: true,
    };

    componentDidMount = () => {
        this.getWeather();
    }

    getWeather = async () => {
        const { location } = this.props.city;
        const weather = await getWeather(location);

        const temp = (weather.main.temp - 273.15).toFixed(2);
        const status = weather.weather.pop()['main'];

        this.setState({ weather: { temp, status }, weatherLoading: false });
    }

    render() {
        // @TODO: Use isLiked
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
                        <ImageBackground resizeMode={'cover'} style={styles.imageInfoContainer} source={{ uri: image }}>

                            <View style={styles.likeContainer}>

                                <Icon name={isLiked ? 'favorite' : 'favorite-border'} size={32} onPress={() => onLike(id)} />

                            </View>

                            <View style={styles.locationContainer}>
                                <View style={styles.rowContainer}>

                                    <View style={styles.cityTextContainer}>
                                        <Text style={Theme.textStyles.heading}>{name}</Text>
                                    </View>

                                    <View style={styles.infoTextContainer}>
                                        {weatherLoading ? <View /> : <Text style={Theme.textStyles.temperature}>{`${weather.temp} ${weather.status}`}</Text>}

                                        <View style={styles.distanceContainer}>
                                            <Text style={Theme.textStyles.distance}>3 km</Text>
                                            <Icon name={'chevron-right'} size={24} style={{ width: 16 }} />
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
        elevation: 2,
        marginBottom: 8
    },
    touchableContainer: {
        width: '100%'
    },
    imageInfoContainer: {
        height: 150,
        paddingHorizontal: 8,
        paddingTop: 8
    },
    likeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    locationContainer: {
        flex: 1,
        justifyContent: 'flex-end'
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
