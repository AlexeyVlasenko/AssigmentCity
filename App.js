import React, { Component } from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// @TODO: optimize import alias
import { store, persistor } from './src/lib/store';

class App extends Component {
	render() {
		return (
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{null}
				</PersistGate>
			</ReduxProvider>
		);
	}
}

export default App;
