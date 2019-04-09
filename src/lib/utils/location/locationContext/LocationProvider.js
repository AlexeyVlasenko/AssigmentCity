import React, { Component } from "react";
import { PermissionsAndroid, Platform } from 'react-native';

import LocationContext from './LocationContext';

class LocationProvider extends Component {
    state = {
        location: null,
    };

    componentDidMount() {
        this.initObserver().catch(err => console.warn(err));
    };

    componentWillUnmount() {
        const { stopObserving } = navigator.geolocation;
        stopObserving();
    }

    initObserver = async () => {
        const { watchPosition } = navigator.geolocation;


        if (await this.requestLocPermission()) {
            const { getCurrentPosition } = navigator.geolocation;
            getCurrentPosition(this.handleLocationChange);
            watchPosition(this.handleLocationChange);
        }
    };

    requestLocPermission = async () => {
        const isIOS = Platform.OS === 'ios';

        if (isIOS) {
            return true
        }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            return false;
        }
    };

    handleLocationChange = (location) => {
        this.setState({ location });
    };

    render() {
        const { children } = this.props;

        return (
            <LocationContext.Provider
                value={this.state}
            >
                {children}
            </LocationContext.Provider>
        )
    }
};

export default LocationProvider;
