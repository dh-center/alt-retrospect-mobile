import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {light as lightTheme, mapping} from '@eva-design/eva';
import {default as appTheme} from './src/styles/theme.json';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './src/navigation/appNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store';

const theme = {...lightTheme, ...appTheme};

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider mapping={mapping} theme={theme}>
                        <AppNavigator />
                    </ApplicationProvider>
                </React.Fragment>
            </Provider>
        );
    }
}
