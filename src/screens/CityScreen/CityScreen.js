import React, { Component } from 'react';
import { InteractionManager, ScrollView, View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { itemWidth, SliderComponent, sliderWidth } from './SliderComponent';
import { ENTRIES1 } from "./entries";
import MapView, { Marker } from "react-native-maps";
import { Theme } from '#theme'

const regions = [
    {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    {
        latitude: 37.68825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    {
        latitude: 37.58825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
]

class CityScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'City Name',
        headerLeft: <IconButton icon='chevron-left' size={32} style={{ width: 32 }}
                                onPress={() => navigation.goBack()}/>,
        headerRight: <IconButton icon='favorite-border' size={26}
                                 onPress={() => alert('like')}/>
    });


    state = {
        slider1ActiveSlide: 0,
        dataFetched: false
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ dataFetched: true })
        });
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
        const { slider1ActiveSlide } = this.state;

        return (
            <View>
                <Pagination
                    dotsLength={ENTRIES1.length}
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
                    data={ENTRIES1}
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


    async animateCamera(index) {
        const camera = await this.map.getCamera();
        camera.center.latitude = regions[index].latitude;
        camera.center.longitude = regions[index].longitude;
        this.map.animateCamera(camera, { duration: 1000 });
    }

    render() {
        const { dataFetched } = this.state;

        if (dataFetched) {
            return (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: Theme.BG }}>

                    <MapView
                        provider={'google'}
                        initialCamera={{
                            center: {
                                latitude: 37.78825,
                                longitude: -122.4324,
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
                        {regions.map((region, index) => {
                            return (
                                <Marker
                                    key={index.toString()}
                                    coordinate={region}
                                />
                            )
                        })}
                    </MapView>


                    {this.renderCarousel()}
                </ScrollView>
            );
        }
        else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator animating={true} size={'large'}/>
                </View>
            )
        }
    }
}

export default CityScreen;
