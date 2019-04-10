import React, { Component } from 'react';
import { persistor, store } from '#store/configureStore';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Theme } from "#theme";
import MainNavigator from "#lib/navigators/MainNavigator";
import { LocationProvider } from '#lib/utils/location/locationContext';

class App extends Component {
    render() {
        return (
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <LocationProvider>
                        <PaperProvider theme={Theme.appTheme}>
                            <MainNavigator />
                        </PaperProvider>
                    </LocationProvider>
                </PersistGate>
            </ReduxProvider>
        );
    }
};

export default App;
