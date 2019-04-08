import React, { Component } from 'react';
// @TODO: optimize import alias
import { persistor, store } from '#store/configureStore';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Theme } from "#theme";
import MainNavigator from "./src/lib/navigators/MainNavigator";

class App extends Component {
    render() {
        return (
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <PaperProvider theme={Theme.appTheme}>
                        <MainNavigator/>
                    </PaperProvider>
                </PersistGate>
            </ReduxProvider>
        );
    }
}

export default App;
