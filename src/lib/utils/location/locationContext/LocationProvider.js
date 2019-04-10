import React, { Component } from "react";
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import LocationContext from './LocationContext';

class LocationProvider extends Component {
    state = {
        location: null,
    };

    componentDidMount() {
        this.initObserver().catch(err => console.warn(err));
    };

    componentWillUnmount() {
        const { clearWatch, stopObserving } = Geolocation;
        const { watchId } = this.state;

        clearWatch(watchId);
        stopObserving();
    }

    initObserver = async () => {
        if (await this.requestLocPermission()) {
            const { watchPosition } = Geolocation;
            const watchId = watchPosition(this.handleLocationChange, ()=> this.handleError(watchId), {
                enableHighAccuracy: true,
                showLocationDialog: false
            });
            this.setState({ watchId })
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

    handleError = (watchId) => {
        console.warn(watchId)
        const { clearWatch } = Geolocation;
        setTimeout(()=> {
            clearWatch(watchId);
            this.initObserver().catch(err => console.warn(err));
        }, 4000)
    };

    handleLocationChange = (location) => {
        console.warn(location)
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
