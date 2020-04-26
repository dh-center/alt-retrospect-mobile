import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../features/map/MapScreen';
import RouteNavigationScreen from '../features/map/RouteNavigationScreen';

const Stack = createStackNavigator();

export const MapNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Map" headerMode="none">
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen
                name="RouteNavigation"
                component={RouteNavigationScreen}
            />
        </Stack.Navigator>
    );
};
