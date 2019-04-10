import React, { Component } from 'react';
import { InteractionManager, ScrollView, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, IconButton } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { cityActions } from '#store/actionCreators';
import LikeButton from "./LikeButton";
import { itemWidth, SliderComponent, sliderWidth } from './SliderComponent';
import { Theme } from '#theme'

class CityScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('cityName'),
        headerLeft: <IconButton icon='chevron-left' size={32} style={{ width: 32 }}
                                onPress={() => navigation.goBack()}/>,
        headerRight: <LikeButton cityId={navigation.getParam('cityId')}/>
    });

    state = {
        slider1ActiveSlide: 0,
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(async () => {
            const { getCity, navigation } = this.props;

            await getCity(navigation.getParam('cityId'));

            navigation.setParams({ cityName: this.props.currentCity.name, onLike: this.handleLikeCity })
        });
    }

    componentWillUnmount() {
        const { resetCity } = this.props;
        resetCity();
    }


    async animateCamera(index) {
        const { currentCity: { sightSeeings } } = this.props;
        const camera = await this.map.getCamera();

        camera.center.latitude = sightSeeings[index].location[0];
        camera.center.longitude = sightSeeings[index].location[1];
        camera.pitch = 0;
        camera.heading = 90;
        camera.altitude = 1000;
        camera.zoom = 15;
        this.map.animateCamera(camera, { duration: 1000 });
    }

    renderMap() {
        const { currentCity: { sightSeeings } } = this.props;

        const [latitude, longitude] = sightSeeings[0].location;

        return (
            <MapView
                provider={'google'}
                initialCamera={{
                    center: {
                        latitude,
                        longitude,
                    },
                    pitch: 0,
                    heading: 90,
                    altitude: 1000,
                    zoom: 15,
                }}
                ref={ref => {
                    this.map = ref;
                }}
                style={{ height: 200, width: '100%' }}
            >
                {sightSeeings.map((sightSeeing, index) => {
                    const [latitude, longitude] = sightSeeing.location;

                    return (
                        <Marker
                            key={index.toString()}
                            coordinate={{ latitude, longitude }}
                        />
                    )
                })}
            </MapView>
        )
    }


    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderComponent
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    renderCarousel() {
        const { currentCity: { sightSeeings } } = this.props;
        const { slider1ActiveSlide } = this.state;

        return (
            <View>
                <Pagination
                    dotsLength={sightSeeings.length}
                    activeDotIndex={slider1ActiveSlide}
                    dotColor={Theme.DOT_COLOR}
                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                    }}
                    inactiveDotColor={Theme.DOT_COLOR}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={sightSeeings}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={true}
                    firstItem={this.state.slider1ActiveSlide}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    loop={false}
                    loopClonesPerSide={3}
                    onSnapToItem={(index) => {
                        this.setState({ slider1ActiveSlide: index });
                        this.animateCamera(index)
                    }}
                    removeClippedSubviews={false}
                />
            </View>
        );

    }


    render() {
        const { cityLoading } = this.props;

        if (!cityLoading) {

            return (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Theme.BG }}>
                    {this.renderMap()}
                    {this.renderCarousel()}
                </ScrollView>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator animating={true} size={'large'}/>
                </View>
            )
        }
    }
}

const mapState = ({ city }) => ({
    currentCity: city.city,
    cityLoading: city.cityLoading,
});

const mapDispatch = dispatch => {
    const { getCity, resetCity } = cityActions;

    return bindActionCreators({
        getCity,
        resetCity
    }, dispatch);
};

export default connect(mapState, mapDispatch)(CityScreen);
