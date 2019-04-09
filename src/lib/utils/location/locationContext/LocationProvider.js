import React, { Component } from "react";

import LocationContext from './LocationContext';

class LocationProvider extends Component {
    state = {
        location: null,
    };

    componentDidMount = () => {
        const { watchPosition } = navigator.geolocation;
        watchPosition(this.handleLocationChange);
    };

    handleLocationChange = (location) => {
        console.log(location);
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
