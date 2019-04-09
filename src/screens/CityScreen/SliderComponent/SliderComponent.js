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
        const { data: { illustration }, parallaxProps } = this.props;

        return (
            <ParallaxImage
                source={{ uri: illustration }}
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
        const isIOS = Platform.OS === 'ios';

        if (!isIOS) {
            Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=50.894967,4.341626")
        } else {
            Linking.openURL("http://maps.apple.com/?daddr=50.894967,4.341626&dirflg=d&t=h")
        }
    };

    proceedUber = () => {
        Linking.openURL("https://m.uber.com/ul/?client_id=VDtTVW2mkxKS9ygc6RGCQ8jV_1PRwr5p&action=setPickup&pickup[latitude]=37.775818&pickup[longitude]=-122.418028&dropoff[latitude]=37.802374&dropoff[longitude]=-122.405818")
    };

    render() {
        const { data: { title, subtitle } } = this.props;

        return (
            <View style={styles.slideInnerContainer}>
                <View style={styles.textContainer}>

                    <View style={styles.infoContainer}>
                        <Text style={Theme.textStyles.cardTitle}>
                            Hawa Mahal
                        </Text>
                        <Text style={Theme.textStyles.cardDistance}>
                            1.2 KM
                        </Text>
                    </View>

                    <ReadMore
                        numberOfLines={6}>
                        <Text style={Theme.textStyles.cardSubtitle}>
                            жлывАЬЗЖЛЫВЬАЖЛЫВЬАЖДФЫВ АДФОТУКЖЛПДЫЬВ ЖАЛПТЦЭЖДАЭЙ ФЖЛА ЭЙЭЬДАВ ЙУД/ЬА ТЖЙДЭЬБ;kdm cfa;k
                            cv;kasd,v;'ad,f /.ad,'l fa,d';f /a
                            жлывАЬЗЖЛЫВЬАЖЛЫВЬАЖДФЫВ АДФОТУКЖЛПДЫЬВ ЖАЛПТЦЭЖДАЭЙ ФЖЛА ЭЙЭЬДАВ ЙУД/ЬА ТЖЙДЭЬБ;kdm cfa;k
                            cv;kasd,v;'ad,f /.ad,'l fa,d';f /a
                            жлывАЬЗЖЛЫВЬАЖЛЫВЬАЖДФЫВ АДФОТУКЖЛПДЫЬВ ЖАЛПТЦЭЖДАЭЙ ФЖЛА ЭЙЭЬДАВ ЙУД/ЬА ТЖЙДЭЬБ;kdm cfa;k
                            cv;kasd,v;'ad,f /.ad,'l fa,d';f /a
                            жлывАЬЗЖЛЫВЬАЖЛЫВЬАЖДФЫВ АДФОТУКЖЛПДЫЬВ ЖАЛПТЦЭЖДАЭЙ ФЖЛА ЭЙЭЬДАВ ЙУД/ЬА ТЖЙДЭЬБ;kdm cfa;k
                            cv;kasd,v;'ad,f /.ad,'l fa,d';f /a
                            жлывАЬЗЖЛЫВЬАЖЛЫВЬАЖДФЫВ АДФОТУКЖЛПДЫЬВ ЖАЛПТЦЭЖДАЭЙ ФЖЛА ЭЙЭЬДАВ ЙУД/ЬА ТЖЙДЭЬБ;kdm cfa;k
                            cv;kasd,v;'ad,f /.ad,'l fa,d';f /a
                            жлывАЬЗЖЛЫВЬАЖЛЫВЬАЖДФЫВ АДФОТУКЖЛПДЫЬВ ЖАЛПТЦЭЖДАЭЙ ФЖЛА ЭЙЭЬДАВ ЙУД/ЬА ТЖЙДЭЬБ;kdm cfa;k
                            cv;kasd,v;'ad,f /.ad,'l fa,d';f /a
                            жлывАЬЗЖЛЫВЬАЖЛЫВЬАЖДФЫВ АДФОТУКЖЛПДЫЬВ ЖАЛПТЦЭЖДАЭЙ ФЖЛА ЭЙЭЬДАВ ЙУД/ЬА ТЖЙДЭЬБ;kdm cfa;k
                            cv;kasd,v;'ad,f /.ad,'l fa,d';f /a
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
