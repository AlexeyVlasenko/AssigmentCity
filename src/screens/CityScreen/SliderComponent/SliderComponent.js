import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Linking, Platform, Text, View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { ParallaxImage } from 'react-native-snap-carousel';

import ReadMore from '#lib/components/ReadMore';
import { LocationContext } from '#lib/utils/location/locationContext';

import { Theme } from '#theme';
import styles from './SliderComponent.style';
import { composeBookUberURL } from '../../../lib/services/uber/uber';
import { composeGoogleMapsURL, composeAppleMapsURL } from '../../../lib/services/maps/maps';

export default class SliderComponent extends Component {
    static propTypes = {
      data: PropTypes.object.isRequired,
      even: PropTypes.bool,
      parallax: PropTypes.bool,
      parallaxProps: PropTypes.object,
    };

    get image() {
      const { data: { image }, parallaxProps } = this.props;

      return (
        <ParallaxImage
          source={{ uri: image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.35}
          showSpinner
          spinnerColor="rgba(0, 0, 0, 0.25)"
          {...parallaxProps}
        />
      );
    }

    proceedDirections = () => {
      const { data: { location } } = this.props;
      const isIOS = Platform.OS === 'ios';

      if (!isIOS) {
        Linking.openURL(composeGoogleMapsURL(location));
      } else {
        Linking.openURL(composeAppleMapsURL(location));
      }
    };


    renderUberButton = ({ location }) => (
      <Button
        disabled={!location}
        icon="local-taxi"
        mode="contained"
        onPress={() => this.proceedUber(location)}
      >
            Book Uber
      </Button>
    )

    proceedUber = ({ coords }) => {
      const { data: { location } } = this.props;
      const [destLat, destLon] = location;
      const pickLat = coords.latitude;
      const pickLon = coords.longitude;

      Linking.openURL(composeBookUberURL(pickLat, pickLon, destLat, destLon));
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
              numberOfLines={6}
            >
              <Text style={Theme.textStyles.cardSubtitle}>
                {description}
              </Text>
            </ReadMore>

          </View>

          <View style={styles.buttonsContainer}>
            <Button icon="directions" mode="contained" onPress={this.proceedDirections}>
                        Direction
            </Button>

            <LocationContext.Consumer>
              {this.renderUberButton}
            </LocationContext.Consumer>
          </View>


          <View style={styles.imageContainer}>
            {this.image}
          </View>

        </View>
      );
    }
}
