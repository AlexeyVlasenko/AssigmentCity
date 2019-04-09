import React, { Component } from 'react';
import { Linking, Platform, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderComponent.style';
import ReadMore from "../../../lib/components/ReadMore";
import { Button } from "react-native-paper";
import { Theme } from '#theme';

export default class SliderComponent extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image() {
        const { data: { image }, parallaxProps } = this.props;

        return (
            <ParallaxImage
                source={{ uri: image }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        )
    }

    proceedDirections = () => {
        const { data: { location } } = this.props;
        const isIOS = Platform.OS === 'ios';

        if (!isIOS) {
            Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${location[0]},${location[1]}`)
        } else {
            Linking.openURL(`http://maps.apple.com/?daddr=${location[0]},${location[1]}&dirflg=d&t=h`)
        }
    };

    proceedUber = () => {
        const { data: { location } } = this.props;

        Linking.openURL(`https://m.uber.com/ul/?client_id=VDtTVW2mkxKS9ygc6RGCQ8jV_1PRwr5p&action=setPickup&pickup[latitude]=37.775818&pickup[longitude]=-122.418028&dropoff[latitude]=${location[0]}&dropoff[longitude]=${location[1]}`)
    };

    render() {
        const { data: { name, description } } = this.props;

        return (
            <View style={styles.slideInnerContainer}>
                <View style={styles.textContainer}>

                    <View style={styles.infoContainer}>
                        <Text style={Theme.textStyles.cardTitle}>
                            {name}
                        </Text>
                        <Text style={Theme.textStyles.cardDistance}>
                            1.2 KM
                        </Text>
                    </View>

                    <ReadMore
                        numberOfLines={6}>
                        <Text style={Theme.textStyles.cardSubtitle}>
                            {description}
                        </Text>
                    </ReadMore>

                </View>

                <View style={styles.buttonsContainer}>
                    <Button icon="directions" mode="contained" onPress={this.proceedDirections}>
                        Direction
                    </Button>
                    <Button icon="local-taxi" mode="contained" onPress={this.proceedUber}>
                        Book Uber
                    </Button>
                </View>


                <View style={styles.imageContainer}>
                    {this.image}
                </View>

            </View>
        );
    }
}
