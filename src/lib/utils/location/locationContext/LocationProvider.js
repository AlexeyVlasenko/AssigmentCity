import React, { Component } from "react";
import { PermissionsAndroid, Platform } from 'react-native';

import LocationContext from './LocationContext';

class LocationProvider extends Component {
    state = {
        location: null,
    };

    componentDidMount() {
        this.initObserver().catch(err => err);
    };

    componentWillUnmount() {
        const { stopObserving } = navigator.geolocation;
        stopObserving();
    }

    initObserver = async () => {
        if (await this.requestLocPermission()) {
            const { watchPosition } = navigator.geolocation;
            watchPosition(this.handleLocationChange, console.log, {
                enableHighAccuracy: true,
                maximumAge: 0,
                distanceFilter: 0
            });
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
                    title: 'AssigmentCity Location Permission',
                    message:
                        'With location enabled you can easily ' +
                        'book uber or check how sightseeing is far.',
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
