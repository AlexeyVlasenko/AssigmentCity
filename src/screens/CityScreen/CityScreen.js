import React, { Component } from 'react';
import { Text, View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles, { colors } from './index.style';
import { itemWidth, sliderWidth } from './SliderEntry.style';
import SliderEntry from "./SliderEntry";
import { ENTRIES1 } from "./entries";

class CityScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'City Name',
        headerLeft: <IconButton icon='chevron-left' size={32} style={{ width: 32 }}
                                onPress={() => navigation.goBack()}/>,
        headerRight: <IconButton icon='favorite-border' size={26}
                                 onPress={() => alert('like')}/>
    });


    state = {
        slider1ActiveSlide: 0
    };

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    mainExample(number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>{`Example ${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text>
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
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
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center' }}>
                {this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots')}
            </View>
        );
    }
}

export default CityScreen;
